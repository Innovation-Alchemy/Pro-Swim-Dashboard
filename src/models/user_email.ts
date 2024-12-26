export type UserEmailModel = {
  id: number;
  name: string;
  subject: string;
  body: string;
  email: string;
  category: string;
  created_at: string; // Creation date as a string
};

export const fromJsonToUserEmail = (json: any): UserEmailModel => {
  console.log(json);

  return {
    id: json.id,
    name: json.name,
    subject: json.subject,
    body: json.body,
    email: json.email,
    category: json.category,
    created_at: json.created_at,
  };
};
