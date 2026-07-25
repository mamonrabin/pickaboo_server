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
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type TSocialIcon = {
  link: string;
  socialType: SocialType;
  type: Status;
};
