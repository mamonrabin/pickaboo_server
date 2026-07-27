export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export type TCategory = {
  categoryName: string;
  title: string;
  slug: string;
  image: string;
  status: Status;
};
