import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonimComponent extends Component {
  @action
  click(event) {
    event.stopPropagation();
    if (this.args.clicked) this.args.clicked(event);
  }
}
