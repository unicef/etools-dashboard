import Dexie from 'dexie';

window.EtoolsDashboard = window.EtoolsDashboard || {};

window.EtoolsDashboard.DexieDb = new Dexie('dashApp');
window.EtoolsDashboard.DexieDb.version(1).stores({
  
   // etools-ajax v2.0.0 requirements
  listsExpireMapTable: '&name, expire',
  ajaxDefaultDataTable: '&cacheKey, data, expire'
});

window.EtoolsRequestCacheDb = window.EtoolsRequestCacheDb || window.EtoolsDashboard.DexieDb
