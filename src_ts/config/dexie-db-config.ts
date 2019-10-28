import Dexie from 'dexie';

window.EtoolsDashboard = window.EtoolsDashboard || {};

window.EtoolsDashboard.DexieDb = new Dexie('dashApp');
window.EtoolsDashboard.DexieDb.version(1).stores({
  ajaxDefaultDataTable: '&cacheKey, data, expire',
  listsExpireMapTable: '&name, expire',
});

window.EtoolsRequestCacheDb = window.EtoolsRequestCacheDb || window.EtoolsDashboard.DexieDb;
