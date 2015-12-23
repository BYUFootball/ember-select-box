import Mixin from 'ember-metal/mixin';
import Ember from 'ember';
import { scheduleOnce } from 'ember-runloop';
const { K } = Ember;

export default Mixin.create({
  _overrideTabIndex() {
    this.set('tabIndex', -1);
  },

  actions: {
    inputText: K,

    registerInput(...args) {
      this._super(...args);
      scheduleOnce('afterRender', this, '_overrideTabIndex');
    }
  }
});