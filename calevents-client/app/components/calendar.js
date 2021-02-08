import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class CalendarComponent extends Component {
  @tracked isShowingModal = false;
  @tracked infos = '';
  @tracked error = '';

  @tracked text = '';
  @tracked startDate = '';
  @tracked endDate = '';
  currentEvent;

  @service
  planner;

  @service
  apolloService;

  constructor() {
    super(...arguments);
    this.dp = null;

    this.planner.updateEvents(this.args.data);
  }

  @action
  closeModal() {
    this.isShowingModal = false;
  }

  /**
   * Register a listener on a div, use this method to get the dom element
   * @param {*} element
   */
  @action
  registerListener(element) {
    this.setupCalendar(element);
  }

  @action
  async refresh() {
    /*const data = await this.apolloService.fetchAll();
    console.log('refresh!');
    console.log(data);
    this.planner.updateEvents(data);
    this.dp.events.list = [...this.planner.events];
    this.dp.update();*/
  }

  setupCalendar(element) {
    this.element = element;
    // eslint-disable-next-line no-undef
    this.dp = new DayPilot.Calendar(element);
    this.dp.viewType = 'Week';
    this.dp.startDate = '2021-02-06';
    this.dp.init();

    // set the events
    this.dp.events.list = [...this.planner.events];
    this.dp.update();

    // add event listener when moving the event
    this.dp.onEventMoved = (args) => {
      this.checkClick(args, async (eventResized) => {
        const response = await this.apolloService.updateEvent(eventResized);
        if (response.status == 'error') {
          this.error = response.message; // display infos
          eventResized.start = args.e.part.start; // revert
          eventResized.end = args.e.part.end;
          this.dp.update();
        } else {
          this.infos = 'Event successfully moved.';
        }
      });
    };

    // Click Event
    this.dp.onEventClicked = (args) => {
      this.showEventInfo(args.e.data);
    };

    // when event duration is changed
    this.dp.onEventResized = (args) => {
      this.checkClick(args, async (eventResized) => {
        const response = await this.apolloService.updateEvent(eventResized);
        if (response.status == 'error') {
          this.error = response.message; // display infos
          eventResized.start = args.e.part.start; // revert
          eventResized.end = args.e.part.end;
          this.dp.update();
        } else {
          this.infos = 'Event successfully resized.';
        }
      });
    };

    // empty range selected
    this.dp.onTimeRangeSelected = (args) => {
      this.checkForUser(() => this.createEvent(args));
    };

    // delete event
    this.dp.eventDeleteHandling = 'Update';
    this.dp.onEventDeleted = async (args) => {
      const response = await this.apolloService.deleteEvent({
        id: args.e.id(),
      });
      if (response.status === 'error') {
        this.error = response.message;
      } else {
        this.infos = 'Event successfully deleted.';
      }
    };
  }

  /**
   * Check for a defined user.
   * @param {*} fn
   */
  checkForUser(fn) {
    if (!this.planner.hasUserId()) {
      this.error = 'Select a user to add events to his calendar.';
    } else {
      this.error = '';
      fn();
    }
  }

  /**
   * Create a new event in the calendar
   * @param {*} args
   */
  async createEvent(args) {
    const title = prompt('New event name:', 'Event');
    const description = prompt('New event description:', 'Description');
    if (!name && !description) {
      return;
    }
    this.dp.clearSelection();

    for (const userId of this.planner.userIds) {
      const variables = {
        userId: userId,
        title,
        description,
        start: new Date(args.start),
        end: new Date(args.end),
      };
      const response = await this.apolloService.createEvent(variables);
      if (response.status === 'error') {
        this.error = response.message;
      } else {
        this.infos = 'Successfully created event(s).';
        this.dp.events.list.pushObject(
          this.planner.setNewEvent(response.id, variables)
        );
        this.dp.update(); // refresh the calendar
      }
    }
  }

  /**
   * Check on click and if same info display info other perform function()
   * @param {*} args
   * @param {*} fn
   */
  checkClick(args, fn) {
    const eventResized = this.planner.getEvent(args.e.data.id);
    if (
      args.e.part.start === args.newStart &&
      args.e.part.end === args.newEnd
    ) {
      this.showEventInfo(args.e.data);
    } else {
      fn(eventResized);
    }
  }

  /**
   * Show the event information
   * @param {*} id
   */
  showEventInfo(data) {
    this.currentEvent = data;
    this.startDate = data.start;
    this.endDate = data.end;
    this.text = htmlSafe(data.text);
    this.isShowingModal = true;
  }

  /**
   * Delete current event in the popup
   */
  @action
  delete() {
    this.isShowingModal = false;

    const response = this.apolloService.deleteEvent({
      id: this.currentEvent.id,
    });
    if (response.status === 'error') {
      this.error = response.message;
    } else {
      this.infos = 'Event successfully deleted.';
      this.dp.events.list = this.dp.events.list.filter(
        (elemt) => elemt.id !== this.currentEvent.id
      );
      this.dp.update();
    }
  }

  /**
   * Edit Description
   */
  @action
  async editDescription() {
    // this.isShowingModal = false;
    const title = prompt('Updated event name:', 'Event');
    const description = prompt('Updated event description:', 'Description');
    if (!title && !description) {
      return;
    }
    const text = `<h3>${title}</h3><p>${description}</p>`;
    this.text = htmlSafe(text);
    const event = {
      userId: this.currentEvent.userId,
      id: this.currentEvent.id,
      description,
      title,
    };
    const response = await this.apolloService.updateEventDescription(event);
    if (response.status == 'error') {
      this.error = response.message;
    } else {
      this.infos = 'Event successfully updated.';
      this.dp.events.list.forEach((element) => {
        if (element.id === this.currentEvent.id) {
          element.text = text;
        }
      });
      this.dp.update();
    }
  }
}
