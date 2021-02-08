import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EventsController extends Controller {
  @service
  apolloService;

  constructor() {
    super(...arguments);
  }

  /**
   * Create a new user
   */
  @action
  async createUser() {
    const name = prompt('New name:', 'Name');
    const color = prompt('New color:', '#FFDD11');
    if (name && color) {
      const user = {
        name,
        color,
      };
      await this.apolloService.createUser(user);
      // TODO ugly refresh the model
      // location.reload();
    }
  }
}
