export type TLandingpage =
  | 'Categories'
  | 'Best Selling'
  | 'Flash Sale'
  | 'Featured Products'
  | 'New Arrivals'
  | 'About'
  | 'Brands'
  | 'Testimonials'
  | 'FAQ'
  | 'Newsletter';
export type TOrder =
  | 'first'
  | 'second'
  | 'third'
  | 'fourth'
  | 'fifth'
  | 'sixth'
  | 'seventh'
  | 'eighth'
  | 'ninth'
  | 'tenth'


export type THome = {
  title?: string;
  enabled: 'Active' | 'In Active';
  order: TOrder;
  landing: TLandingpage;
};
