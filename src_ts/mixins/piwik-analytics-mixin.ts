import {Constructor, GenericObject} from '../typings/globals.types';
import {PolymerElement} from '@polymer/polymer';
import {property} from '@polymer/decorators';

declare global {
  interface Window {_paq: any}
}

window._paq = window._paq || [];

if (!('_paq' in window)) {
  window._paq = [];
}

function PiwikAnalyticsMixin<T extends Constructor<PolymerElement>>(baseClass: T) {

  class PiwikAnalyticsClass extends baseClass {
    @property({type: String})
    siteIdent: string = this.setSiteId();

    setSiteId() {
      switch (window.location.host) {
        case 'etools.unicef.org':
          return '1';
        case 'etools-dev.unicef.org':
          return '2';
        case 'etools-staging.unicef.org':
          return '4';
        case 'etools-demo.unicef.org':
          return '5';
        default:
          return '6';
      }
    }

    trackAnalytics(event: GenericObject) {
      const trackingObj: any = {};
      trackingObj.event = event.currentTarget.getAttribute('tracker');
      trackingObj.page = window.location.href;

      this.trackEvent(trackingObj);
    }

    trackEvent(trackingObject: GenericObject) {
      window._paq.push(['trackEvent', trackingObject.event, trackingObject.page]);
    }
  }
  return PiwikAnalyticsClass;
}

export default PiwikAnalyticsMixin;
