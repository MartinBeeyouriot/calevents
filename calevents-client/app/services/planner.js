import Service from '@ember/service';
import { A } from '@ember/array';

/**
 * Emberjs planner service
 */
export default class PlannerService extends Service {
  /**
   * User Id selected to create event.
   */
  userId = -1;
  /**
   * List of Events
   */
  events = A([]);

  /**
   * Get the userId
   */
  get userId() {
    return this.userId;
  }

  /**
   * The set userId
   */
  set userId(userId) {
    this.userId = userId;
  }

  /**
   * Get the userId
   */
  get events() {
    return this.events;
  }

  /**
   * Add a new event
   * @param {the event} event
   */
  addEvent(event) {
    this.events.pushObject(event);
  }

  /**
   * Remove an event
   * @param {the event} event
   */
  removeEvent(event) {
    this.events.removeObject(event);
  }

  /**
   * Find the event matching id
   * @param {*} id
   */
  getEvent(id) {
    return this.events.find((x) => x.id === id);
  }

  /**
   * Empty the event
   */
  emptyEvents() {
    this.events.clear();
  }

  /**
   * Update Events from data receive from call graphql users
   * @param {*} data
   */
  updateEvents(data) {
    this.events.clear();
    for (const user of data) {
      for (const event of user.events) {
        const newEvent = {
          backColor: user.color,
        };
        newEvent.id = event.id;
        console.log(event.start);
        console.log(event.end);
        newEvent.start = event.start;
        newEvent.end = event.end;
        newEvent.text = `<h3>${event.title}</h3><p>${event.description}</p>`;
        this.addEvent(newEvent);
      }
    }
    console.log(this.events);
  }
}
