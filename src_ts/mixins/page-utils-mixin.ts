import { Mixins as Mixins$0 } from './redux-store-mixin';
import isEmpty from 'lodash-es/isEmpty';
// export const EtoolsDashboard = EtoolsDashboard || {};
export const Mixins = Mixins$0 || {};

/**
* @polymer
* @mixinFunction
*/
Mixins$0.PageUtils = (superClass) => class extends superClass {
  constructor() {
    super()
  }

  static get properties() {
    return {
      queryParams: {
        type: Object,
        observer: '_handleQueryParams'
      }
    }
  }

  _handleQueryParams(params) {
    if (!isEmpty(params)) {
      this.set('listQueryParams', params);
    }
  }
};
