import Route from '@ember/routing/route';
import { queryManager } from 'ember-apollo-client';
import query from 'calevents-client/gql/queries/users.graphql';

// eslint-disable-next-line ember/no-classic-classes
export default Route.extend({
  apollo: queryManager(),

  model(params) {
    const variables = { id: params.id };
    return this.apollo.watchQuery({ query, variables }, 'users');
  },
});
