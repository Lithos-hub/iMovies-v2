export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  avatar: string | any;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignup {
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
}
