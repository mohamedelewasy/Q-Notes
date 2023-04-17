export interface User {
  id: string;
  email: string;
  facebookId: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  token: string;
  createdAt: Date;
}

export interface Doc {
  id: string;
  pdf: string;
  thumbnail: string;
  description: string;
  educationLevel: string;
  className: string;
  semester: string;
  title: string;
  price: number;
  updatedAt: Date;
}

export interface JWT {
  userId: string;
}
