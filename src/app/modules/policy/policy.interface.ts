

export type TPolicyType = 'privacy' | 'condition' | 'return' | 'order' | 'shipping';

export type TPolicy = {
  title: string;
  description: string;
  type: TPolicyType;
};
