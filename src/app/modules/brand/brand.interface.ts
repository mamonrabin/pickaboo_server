export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export type TBrand = {
  title: string;
  slug: string;
  image: string;
  status: Status;
};
