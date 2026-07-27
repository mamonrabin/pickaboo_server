export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export type TLogo = {
  headerLogo: string;
  footerLogo?: string;
  description?: string;
  address?:string
  phone?:string
  whatsapp?:string
  email?:string
   status: Status;
};
