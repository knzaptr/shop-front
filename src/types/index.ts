export type TUserPublic = {
  _id: string;
  email: string;
  username: string;
  token: string;
  admin: boolean;
};

export type TUserPrivate = TUserPublic & {
  hash: string;
  salt: string;
};

export type TProductReview = {
  rating: number;
  comment: string;
  date: string | Date;
  reviewerName: string;
  reviewerEmail: string;
};

export type TProduct = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews?: TProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
};

export type TOrder = {
  _id: string;
  owner: TUserPublic;
  products: {
    product: TProduct;
    quantity: number;
  }[];
  price: number;
  delivered: boolean;
  address: string;
};
