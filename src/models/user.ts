export type UserModel = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export const fromJsonToUser = (json: any): UserModel => {
  return {
    id: json.id,
    name: json.name,
    email: json.email,
    phone: json.phone,
    role: json.role,
  };
};
