import Service from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import deleteEvent from 'calevents-client/gql/queries/delete-event.graphql';
import createEvent from 'calevents-client/gql/queries/create-event.graphql';
import updateEvent from 'calevents-client/gql/queries/create-event.graphql';
import query from 'calevents-client/gql/queries/users.graphql';

/**
 * Emberjs planner service
 */
export default class ApolloService extends Service {
  @queryManager
  apollo;

  /**
   * Delete Event
   * @param {*} variables
   */
  async deleteEvent(variables) {
    const response = await this.apollo.mutate(
      { mutation: deleteEvent, variables },
      'deleteEvent'
    );
    console.log(response);
  }

  /**
   * Update Event
   * @param {*} variables
   */
  async updateEvent(variables) {
    const response = await this.apollo.mutate(
      { mutation: createEvent, variables },
      'createEvent'
    );
    console.log(response);
  }

  /**
   * Create Event
   * @param {*} variables
   */
  async createEvent(variables) {
    const response = await this.apollo.mutate(
      { mutation: updateEvent, variables },
      'updateEvent'
    );
    console.log(response);
  }

  fetchAll() {
    return this.apollo.watchQuery({ query }, 'users');
  }
}
