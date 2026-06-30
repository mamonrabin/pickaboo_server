

export type TBlog = {
  title: string;
  slug: string;
  shortDescription?: string;
  content: string;
  image: string;
  tags?: string[];
  status: "draft" | "published";
};