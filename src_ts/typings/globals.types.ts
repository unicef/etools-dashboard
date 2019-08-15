import {PolymerElement} from '@polymer/polymer';

/*
* The type Constructor<T> is an alias for the construct signature
* that describes a type which can construct objects of the generic type T
* and whose constructor function accepts an arbitrary number of parameters of any type
* On the type level, a class can be represented as a newable function
*/
export type Constructor<T> = new(...args: any[]) => T;

export type MixinFunction = <T extends Constructor<PolymerElement>>(baseClass: T) => T & {
  new (...args: any[]): any;
};

export interface GenericObject {
  [key: string]: any;
}

// export interface Permission<T> {
//   edit: T;
//   required: T;
// }

// export interface UserPermissions {
//   ICT: boolean;
//   PME: boolean;
//   editAgreementDetails: boolean;
//   editInterventionDetails: boolean;
//   editPartnerDetails: boolean;
//   loggedInDefault: boolean;
//   partnershipManager: boolean;
//   userInfoMenu: boolean;
//   viewAgreementDetails: boolean;
//   viewInterventionDetails: boolean;
//   viewPartnerDetails: boolean;
// }

// export class MinimalUser {
//   first_name!: string;
//   last_name!: string;
//   middle_name!: string;
//   name!: string;
//   email!: string;
// }

// export class User extends MinimalUser {
//   country!: MinimalCountry;
//   country_override!: number;
//   countries_available!: MinimalCountry[];
//   groups!: UserGroup[];
// }


// export interface UserGroup {
//   id: number;
//   name: string;
//   permissions: any[];
// }

// export interface EtoolsTab {
//   tab: string;
//   tabLabel: string;
//   hidden?: boolean;
//   showTabCounter?: boolean;
//   counter?: number;
// }

export interface DomRepeatEvent extends CustomEvent {// TODO- should be in polymer declarations
  model: any;
}

// export class Paginator {
//   page: number = 1;
//   page_size: number = 10;
//   count: number | null = null;
//   visible_range: string[] | number[] = [];
// }

// export interface CpStructure {
//   id: string;
//   name: string;
//   expired: boolean;
//   future: boolean;
//   active: boolean;
//   special: boolean;
//   invalid: boolean;
//   from_date: string;
//   to_date: string;
//   wbs: string;
// }

// export interface MinimalCountry {
//   id: number;
//   name: string;
//   business_area_code: string;
// }

// export interface Country extends MinimalCountry {

//   country_short_code: string;
//   initial_zoom: number;
//   latitude: string;
//   local_currency: string;
//   local_currency_code: string;
//   local_currency_id: number;
//   longitude: string;
// }

// export interface LabelAndValue {
//   label: string;
//   value: string;
// }

// export interface IdAndName {
//   id: string;
//   name: string;
// }

// export interface EnvFlags {
//   prp_mode_off: boolean;
//   prp_server_on: boolean;
//   active_flags?: string[];
// }

export interface Office {
  id: number;
  name: string;
  email: string;
  username: string;
}

// export interface ValidatableField extends PolymerElement {
//   invalid: boolean;
//   validate: () => any; // validate method for polymer form input elements
// }
