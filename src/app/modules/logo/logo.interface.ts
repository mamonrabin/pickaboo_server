export type TLogoType =  'active' | 'inactive';

export type TLogo = {
  headerLogo: string;
  footerLogo?: string;
  description?: string;
  address?:string
  phone?:string
  whatsapp?:string
  email?:string
  type?:TLogoType
};
