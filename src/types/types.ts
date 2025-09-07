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


// WooCommerce product image
export interface WCProductImage {
  id: number;
  src: string;
  alt: string;
}

// WooCommerce product category
export interface WCProductCategory {
  id: number;
  name: string;
  slug: string;
}

// WooCommerce product type
export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  categories: WCProductCategory[];
 
  images: Array<{ src: string }>;
  price_html: string;
}
