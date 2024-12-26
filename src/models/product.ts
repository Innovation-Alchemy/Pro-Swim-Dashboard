// Define the ProductModel type
export type ProductModel = {
  id: number;
  title: string;
  description: string;
  brand: { id: number; title: string };
  sport: { id: number; title: string };
  stock: number;
  categories: { id: number; title: string }[];
  genders: { id: number; title: string }[];
  product_info: { title: string; description: string }[];
  sizes: string[]; // Array of available sizes
  images: {
    generic: string[]; // Array of generic images
    colored: { color: string; images: string[] }[]; // Array of colored images with color and images
  };
  price: { currency: string; value: string }[];
  created_at: string; // Creation date
  updated_at: string; // Last update date
};

// Function to convert JSON to ProductModel
export const fromJsonToProduct = (json: any): ProductModel => {
  return {
    id: json.id || 0,
    title: json.title || "Untitled Product",
    description: json.description || "No description available.",
    brand: {
      id: json.brand?.id || 0,
      title: json.brand?.title || "Unknown Brand",
    },
    sport: {
      id: json.sport?.id || 0,
      title: json.sport?.title || "Unknown Sport",
    },
    stock: json.stock || 0,
    categories: Array.isArray(json.categories)
      ? json.categories.map(
          (category: { id: number; title: string }) => ({
            id: category.id || 0,
            title: category.title || "Unknown Category",
          })
        )
      : [],
    genders: Array.isArray(json.genders)
      ? json.genders.map((gender: { id: number; title: string }) => ({
          id: gender.id || 0,
          title: gender.title || "Unknown Gender",
        }))
      : [],
    product_info: Array.isArray(json.product_info)
      ? json.product_info.map(
          (info: { title: string; description: string }) => ({
            title: info.title || "No Title",
            description: info.description || "No Description",
          })
        )
      : [],
    sizes: Array.isArray(json.sizes) ? json.sizes : [],
    images: {
      generic: Array.isArray(json.images?.generic) ? json.images.generic : [],
      colored: Array.isArray(json.images?.colored)
        ? json.images.colored.map(
            (colored: { color: string; images: string[] }) => ({
              color: colored.color || "Unknown Color",
              images: Array.isArray(colored.images) ? colored.images : [],
            })
          )
        : [],
    },
    price: Array.isArray(json.price)
      ? json.price.map((priceItem: { currency: string; value: string }) => ({
          currency: priceItem.currency || "Unknown Currency",
          value: priceItem.value || "0",
        }))
      : [],
    created_at: json.created_at || "Unknown Date",
    updated_at: json.updated_at || "Unknown Date",
  };
};
