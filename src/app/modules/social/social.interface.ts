export type TSocialType = ' ' | 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'likie';

export enum SocialType {
  "facebook"="facebook",
  "instagram"="instagram",
  "twitter"="twitter",
  "youtube"="youtube",
  "linkedin"="linkedin",
  "tiktok"="tiktok",
  "likie"="likie",
  

}

export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export type TSocialIcon = {
  link: string;
  socialType: SocialType;
  status: Status;
};
