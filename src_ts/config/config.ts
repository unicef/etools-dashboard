import {GenericObject} from '../typings/globals.types';

declare global {
  interface Window {
    EtoolsLogsLevel: string;
    devToolsExtension: GenericObject;
    EtoolsDashboard: GenericObject;
    EtoolsRequestCacheDb: any;
  }
}

window.EtoolsLogsLevel = 'INFO';
