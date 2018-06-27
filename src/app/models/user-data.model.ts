export interface User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  LastName: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: number;
  phone: number;
  rank: string;
}
