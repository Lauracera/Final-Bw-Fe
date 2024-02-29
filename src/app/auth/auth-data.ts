export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    name: string;
    surname: string;
    username: string;
    password: string;
    email: string;
    avatar: string;
    role: string;
  };
}
