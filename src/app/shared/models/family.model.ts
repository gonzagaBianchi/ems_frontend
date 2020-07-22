import { IPerson } from '../../shared/models/person.model';

export interface IFamily {
  id: string;
  name: string;
  max_persons: number;
  persons: [IPerson];
};