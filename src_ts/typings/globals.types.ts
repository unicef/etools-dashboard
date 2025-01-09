export interface GenericObject {
  [key: string]: any;
}

export interface DomRepeatEvent extends CustomEvent {
  // TODO- should be in polymer declarations
  model: any;
}

export interface Office {
  id: number;
  name: string;
  email: string;
  username: string;
}
