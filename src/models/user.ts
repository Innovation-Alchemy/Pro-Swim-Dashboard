export type UserModel = {
  id: number;
  email: string;
  role: string;
};

export const fromJsonToUser = (json: any): UserModel => {
  return {
    id: json.id,
    email: json.email,
    role: json.role,
  };
};
