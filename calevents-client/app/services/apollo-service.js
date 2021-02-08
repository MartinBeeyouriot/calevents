import Service from '@ember/service';
import { queryManager } from 'ember-apollo-client';
import deleteEvent from 'calevents-client/gql/queries/delete-event.graphql';
import createEvent from 'calevents-client/gql/queries/create-event.graphql';
import updateEvent from 'calevents-client/gql/queries/update-event.graphql';
import updateUser from 'calevents-client/gql/queries/update-user.graphql';
import deleteUser from 'calevents-client/gql/queries/delete-user.graphql';
import createUser from 'calevents-client/gql/queries/create-user.graphql';
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
    console.log('update event');
    variables.start = new Date(variables.start);
    variables.end = new Date(variables.end);
    console.log(variables);
    const response = await this.apollo.mutate(
      { mutation: updateEvent, variables },
      'updateEvent'
    );
    console.log(response);
  }

  /**
   * Create Event
   * @param {*} variables
   */
  async createEvent(variables) {
    const response = await this.apollo.mutate(
      { mutation: createEvent, variables },
      'createEvent'
    );
    console.log(response);
  }

  /**
   * Fetch all data with our main query
   */
  async fetchAll() {
    return await this.apollo.query({ query }, 'users');
  }

  /**
   * Update Event
   * @param {*} variables
   */
  async updateUser(variables) {
    console.log(variables);
    const response = await this.apollo.mutate(
      { mutation: updateUser, variables },
      'updateUser'
    );
    console.log(response);
  }

  /**
   * Delete User
   * @param {*} variables
   */
  async deleteUser(id) {
    const response = await this.apollo.mutate(
      { mutation: deleteUser, variables: { id } },
      'deleteUser'
    );
    console.log(response);
  }

  /**
   * Create a new user
   * @param {*} user
   */
  async createUser(user) {
    const response = await this.apollo.mutate(
      { mutation: createUser, variables: user },
      'createUser'
    );
    console.log(response);
  }
}
