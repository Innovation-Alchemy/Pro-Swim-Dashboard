// Define the BrandModel type
export type BrandModel = {
  id: number;
  title: string;
  created_at: string; // Creation date
  updated_at: string; // Last update date
};

// Function to convert JSON to BrandModel
export const fromJsonToBrand = (json: any): BrandModel => {
  return {
    id: json.id || 0,
    title: json.title || "Untitled Brand",
    created_at: json.created_at || "Unknown Date",
    updated_at: json.updated_at || "Unknown Date",
  };
};
