import Dexie from 'dexie';

export const DexieDb = new Dexie('dashApp');
DexieDb.version(1).stores({
  collectionsList: 'name, expire',
  partners: 'id, name',
  csoDashboard: 'intervention_id, partner_name',
  trips: 'id, supervisor_name, purpose_of_travel, traveler, created_date',
  partnerships: 'id',
  listsExpireMapTable: '&name, expire',
  ajaxDefaultDataTable: '&cacheKey, data, expire',
  attachments: 'id, partner, created, file_type, partner_type, agreement_reference_number, pd_ssfa_number',
  partnershipsOverview: 'id, name, total_ct_cp, total_ct_ytd, action_points, days_last_pv'
});

// let etoolsAjaxDefaultDexieDbPrefix = 'dashboard';

window.EtoolsRequestCacheDb = window.EtoolsRequestCacheDb || DexieDb;
