import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CalendarComponent extends Component {
  @service
  planner;

  @service
  apolloService;

  constructor() {
    super(...arguments);

    // this.planner.updateEvents(this.args.data);
  }

  @action
  closeModal() {}
}
