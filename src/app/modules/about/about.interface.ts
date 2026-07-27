
export enum AboutType {
  Active = 'Active',
  InActive = 'InActive',
}
export type TAbout = {
  description: string;
  type: AboutType;
  video?: string;
};
