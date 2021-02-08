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
   * Build an error status with proper message.
   * @param {*} e
   */
  returnErrorStatus(e) {
    const message = e.errors.map((item) => item.message).join(',');
    return { status: 'error', message };
  }

  /**
   * Delete Event
   * @param {*} variables
   */
  async deleteEvent(variables) {
    try {
      const response = await this.apollo.mutate(
        { mutation: deleteEvent, variables },
        'deleteEvent'
      );
      return { status: 'ok', id: response.id };
    } catch (e) {
      return this.returnErrorStatus(e);
    }
  }

  /**
   * Update Event
   * @param {*} variables
   */
  async updateEvent(variables) {
    variables.start = new Date(variables.start);
    variables.end = new Date(variables.end);
    try {
      const response = await this.apollo.mutate(
        { mutation: updateEvent, variables },
        'updateEvent'
      );
      return { status: 'ok', id: response.id };
    } catch (e) {
      return this.returnErrorStatus(e);
    }
  }

  /**
   * Create Event
   * @param {*} variables
   */
  async createEvent(variables) {
    try {
      const response = await this.apollo.mutate(
        { mutation: createEvent, variables },
        'createEvent'
      );
      return { status: 'ok', id: response.id };
    } catch (e) {
      return this.returnErrorStatus(e);
    }
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
    try {
      const response = await this.apollo.mutate(
        { mutation: updateUser, variables },
        'updateUser'
      );
      return { status: 'ok', id: response.id };
    } catch (e) {
      return this.returnErrorStatus(e);
    }
  }

  /**
   * Delete User
   * @param {*} variables
   */
  async deleteUser(id) {
    try {
      const response = await this.apollo.mutate(
        { mutation: deleteUser, variables: { id } },
        'deleteUser'
      );
      return { status: 'ok', id: response.id };
    } catch (e) {
      return this.returnErrorStatus(e);
    }
  }

  /**
   * Create a new user
   * @param {*} user
   */
  async createUser(user) {
    try {
      const response = await this.apollo.mutate(
        { mutation: createUser, variables: user },
        'createUser'
      );
      return { status: 'ok', id: response.id };
    } catch (e) {
      return this.returnErrorStatus(e);
    }
  }
}
