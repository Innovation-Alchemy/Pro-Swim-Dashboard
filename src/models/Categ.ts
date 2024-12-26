// Define the CategModel type
export type CategModel = {
  id: number;
  title: string;
  created_at: string; // Creation date
  updated_at: string; // Last update date
};

// Function to convert JSON to CategModel
export const fromJsonToCategory = (json: any): CategModel => {
  return {
    id: json.id || 0,
    title: json.title || "Untitled Category",
    created_at: json.created_at || "Unknown Date",
    updated_at: json.updated_at || "Unknown Date",
  };
};
