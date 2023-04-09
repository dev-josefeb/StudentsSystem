import { Gender } from './gender';
import { Address } from './address';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: number;
  profileImageUrl: string;
  genderId: string;
  gender: Gender;
  address: Address;
}
