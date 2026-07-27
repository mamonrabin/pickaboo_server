

export type TPolicyType = 'privacy' | 'condition' | 'return' | 'order' | 'shipping';

export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export type TPolicy = {
  title: string;
  description: string;
  type: TPolicyType;
  status: Status;
};
