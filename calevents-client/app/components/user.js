import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class CalendarComponent extends Component {
  @service
  planner;

  @tracked
  selectedClassname = 'article-no-bg';
  isSelected = false;

  @tracked selectButton = 'Select';

  @tracked name;
  @tracked nbEvents;
  @tracked color;

  @service
  apolloService;

  constructor() {
    super(...arguments);
    this.user = { ...this.args.user };
    this.name = this.user.name;
    this.color = htmlSafe(`background-color: ${this.user.color}`);
    this.nbEvents = this.user.events.length;
  }

  @action
  selected(event) {
    event.stopPropagation();
    if (this.isSelected) {
      this.selectedClassname = 'article-no-bg';
      this.planner.removeUserId(this.user.id);
      this.isSelected = false;
      this.selectButton = 'Select';
    } else {
      this.planner.addUserId(this.user.id);
      this.isSelected = true;
      this.selectedClassname = 'article-bg';
      this.selectButton = 'Un-Select';
    }
  }

  /**
   * Update user name
   */
  @action
  async updateName() {
    const name = prompt('New name:', this.user.name);
    if (name) {
      this.user.name = name;
      this.name = name;
      await this.apolloService.updateUser(this.user);
    }
  }

  /**
   * Update user color
   */
  @action
  async updateColor() {
    const color = prompt('New color:', this.user.color);
    if (color) {
      this.user.color = color;
      this.color = htmlSafe(`background-color: ${this.user.color}`);
      await this.apolloService.updateUser(this.user);
    }
  }

  /**
   * Delete user
   */
  @action
  async delete() {
    const response = confirm(`Are you sure to want to delete: ${this.name}?`);
    if (response) {
      await this.apolloService.deleteUser(this.user.id);
      // TODO refresh the model this is ugly.
      location.reload();
    }
  }
}
