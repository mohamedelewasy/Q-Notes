export interface User {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  token: string;
  createdAt: Date;
}

export interface Doc {
  id: string;
  pdf: string;
  description: string;
  educationLevel: string;
  class: string;
  semester: string;
  title: string;
  price: number;
}

export interface JWT {
  userId: string;
}
