// types.ts
export interface WPTitle {
  rendered: string;
}

export interface WPExcerpt {
  rendered: string;
}

export interface WPContent {
  rendered: string;
}

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
}

export interface WPEmbedded {
  "wp:featuredmedia"?: WPFeaturedMedia[];
}

export interface WPPost {
  id: number;
  date: string;
  title: WPTitle;
  excerpt: WPExcerpt;
  content?: WPContent;
  _embedded?: WPEmbedded;
}
