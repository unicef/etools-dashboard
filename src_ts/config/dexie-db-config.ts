import Dexie from 'dexie';

export class DashAppDatabase extends Dexie {
  collectionsList: Dexie.Table<collectionsList, string>
  partners: Dexie.Table<partners, number>
  csoDashboard: Dexie.Table<csoDashboard, number>
  trips: Dexie.Table<trips, number>
  partnerships: Dexie.Table<partnerships, number>
  listsExpireMapTable: Dexie.Table<listsExpireMapTable, string>
  ajaxDefaultDataTable: Dexie.Table<ajaxDefaultDataTable, string>
  attachments: Dexie.Table<attachments, number>
  partnershipsOverview: Dexie.Table<partnershipsOverview, number>

  constructor () {
    super('DashAppDatabase');
    this.version(1).stores({
      collectionsList: 'name, expire',
      partners: 'id, name, vendor_number',
      csoDashboard: 'intervention_id, partner_name, unicef_focal_points',
      trips: 'id, supervisor_name, purpose_of_travel, traveler, created_date',
      partnerships: 'id',
      listsExpireMapTable: '&name, expire',
      ajaxDefaultDataTable: '&cacheKey, data, expire',
      attachments: 'id, partner, created, file_type, partner_type, agreement_reference_number, pd_ssfa_number',
      partnershipsOverview: 'id, name, total_ct_cp, total_ct_ytd, action_points, days_last_pv'
    });

    this.collectionsList = this.table('collectionsList');
    this.partners = this.table('partners');
    this.csoDashboard = this.table('csoDashboard');
    this.trips = this.table('trips');
    this.partnerships = this.table('partnerships');
    this.listsExpireMapTable = this.table('listsExpireMapTable');
    this.ajaxDefaultDataTable = this.table('ajaxDefaultDataTable');
    this.attachments = this.table('attachments');
    this.partnershipsOverview = this.table('partnershipsOverview');
  }
}

export interface collectionsList {
  name: string;
  expire: string;
}

export interface partners {
  id: number;
  name: string;
  vendor_number: string
}

export interface csoDashboard {
  intervention_id: number;
  partner_name: string;
  unicef_focal_points: string[];
}

export interface trips {
  id: number;
  supervisor_name: string;
  purpose_of_travel: string;
  traveler: string;
  created_date: string;
}

export interface partnerships {
  id: number;
}

export interface listsExpireMapTable {
  name: string;
  expire: string;
}

export interface ajaxDefaultDataTable {
  cacheKey: string;
  data: object;
  expire: string;
}

export interface attachments {
  id: number;
  partner: string;
  created: string;
  file_type: string;
  partner_type: string;
  agreement_reference_number: string;
  pd_ssfa_number: string;
  file_link: string;
  filename: string;
  vendor_number: string
}

export interface partnershipsOverview {
  id: number;
  name: string;
  total_ct_cp: string;
  total_ct_ytd: string;
  action_points: string[];
  days_last_pv: string;
}

// window.EtoolsRequestCacheDb = window.EtoolsRequestCacheDb || 
export var db = new DashAppDatabase;

// window.EtoolsRequestCacheDb = window.EtoolsRequestCacheDb || DexieDb;
