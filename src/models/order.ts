export type ProductInformationModel = {
  id: number;
  title: string;
  description: string;
  brand: string;
  sport: string;
  images: {
    generic: string[]; // Array of generic images
    colored: { color: string; images: string[] }[]; // Array of colored images with color and images
  };
  sizes: string[]; // Array of available sizes
  stock: number; // Available stock quantity
  created_at: string; // Creation date
  updated_at: string; // Last update date
  barcode: string;
  brand_id: number;
  sport_id: number;
  product_info: { title: string; description: string }[]; // Array of product information
  categories: { id: number; title: string }[]; // Array of categories
  genders: { id: number; title: string }[]; // Array of genders
  price: { currency: string; value: string }[]; // Array of price with currency and value
};

// Define the order product model
export type OrderProductModel = {
  id: number;
  order_id: number;
  product_id: string;
  product_price: string;
  product_color: string;
  product_gender: string;
  product_quantity: number;
  product_size: string;
  product_information: ProductInformationModel; // Link to product information
};

// Define the order model
export type OrderModel = {
  id: number;
  user_id: string;
  status: string;
  address: string;
  total_price: string;
  currency: string;
  type: string; // e.g. COD (Cash on Delivery)
  created_at: string; // Order creation date
  user_email: string;
  products: OrderProductModel[]; // Array of ordered products
};

export const fromJsonToOrder = (json: any): OrderModel => {
    return {
      id: json.order_id,
      user_id: json.user_id,
      status: json.status,
      address: json.address,
      total_price: json.total_price,
      currency: json.currency,
      type: json.type,
      created_at: json.created_at,
      user_email: json.user_email,
      products: json.products.map((product: any): OrderProductModel => ({
        id: product.id,
        order_id: product.order_id,
        product_id: product.product_id,
        product_price: product.product_price,
        product_color: product.product_color,
        product_gender: product.product_gender,
        product_quantity: product.product_quantity,
        product_size: product.product_size,
        product_information: {
          id: product.product_information.id,
          title: product.product_information.title,
          description: product.product_information.description,
          brand: product.product_information.brand,
          sport: product.product_information.sport,
          barcode: product.product_information.barcode,
          images: {
            generic: product.product_information?.images?.generic,
            colored: product.product_information?.images?.colored.map(
              (image: any) => ({
                color: image.color,
                images: image.images,
              })
            ),
          },
          sizes: product.product_information?.sizes.flat(),
          stock: product.product_information.stock,
          created_at: product.product_information.created_at,
          updated_at: product.product_information.updated_at,
          brand_id: product.product_information.brand_id,
          sport_id: product.product_information.sport_id,
          product_info: product.product_information.product_info.flat(),
          categories: product.product_information.categories.flat(),
          genders: product.product_information.genders.flat(),
          price: product.product_information.price,
        },
      })),
    };
  };
  
