import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CalendarComponent extends Component {
  @tracked isShowingModal = false;
  @tracked infos = '';

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
      this.checkClick(args, (eventResized) =>
        this.apolloService.updateEvent(eventResized)
      );
    };

    // when event duration is changed
    this.dp.onEventResized = (args) => {
      this.checkClick(args, (eventResized) =>
        this.apolloService.updateEvent(eventResized)
      );
    };

    // empty range selected
    this.dp.onTimeRangeSelected = (args) => {
      this.checkForUser(() => this.createEvent(args));
    };

    // delete event
    this.dp.eventDeleteHandling = 'Update';
    this.dp.onEventDeleted = (args) => {
      this.checkForUser(() =>
        this.apolloService.deleteEvent({ id: args.e.id() })
      );
    };
  }

  /**
   * Check for a defined user.
   * @param {*} fn
   */
  checkForUser(fn) {
    if (!this.planner.hasUserId()) {
      this.infos = 'Select a user to add events to his calendar.';
    } else {
      this.infos = '';
      fn();
    }
  }

  /**
   * Create a new event in the calendar
   * @param {*} args
   */
  createEvent(args) {
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
      this.apolloService.createEvent(variables);
    }
  }

  /**
   * Check on click and if same info display info other perform function()
   * @param {*} args
   * @param {*} fn
   */
  checkClick(args, fn) {
    const eventResized = this.planner.getEvent(args.e.data.id);
    if (args.e.start === args.newStart && args.e.end === args.newEnd) {
      this.showEventInfo(args.e.data.id);
    } else {
      fn(eventResized);
    }
  }

  /**
   * Show the event information
   * @param {*} id
   */
  showEventInfo(id) {
    this.isShowingModal = true;
  }
}
