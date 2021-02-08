import Service from '@ember/service';
import { A } from '@ember/array';
import { convertUTCDateToLocalDate } from '../utils/date';
/**
 * Emberjs planner service
 */
export default class PlannerService extends Service {
  /**
   * User Id selected to create event.
   */
  userIds = A([]);
  /**
   * List of Events
   */
  events = A([]);

  /**
   * Add a new userId
   * @param {*} userId
   */
  addUserId(userId) {
    const result = this.userIds.find((x) => x === userId);
    if (!result) this.userIds.push(userId);
  }

  /**
   * Remove a userId
   */
  removeUserId(userId) {
    this.userIds.removeObject(userId);
  }

  /**
   * Has any user defined
   */
  hasUserId() {
    return this.userIds.length !== 0;
  }

  /**
   * Get User Ids
   */
  get userIds() {
    return this.userIds;
  }

  /**
   * Get the userId
   */
  get events() {
    return this.events;
  }

  get data() {
    return this.data;
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

  setNewEvent(id, event) {
    event.id = id; // set the event id
    event.text = `<h3>${event.title}</h3><p>${event.description}</p>`;
    event.start = convertUTCDateToLocalDate(event.start);
    event.end = convertUTCDateToLocalDate(event.end);
    // this.events.pushObject(event); // add directly into the calendar
    return event;
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
        newEvent.userId = user.id;
        newEvent.start = convertUTCDateToLocalDate(event.start);
        newEvent.end = convertUTCDateToLocalDate(event.end);
        newEvent.text = `<h3>${event.title}</h3><p>${event.description}</p>`;
        this.addEvent(newEvent);
      }
    }
  }
}
