import { IPerson } from '../../shared/models/person.model';

export interface IFamily {
  id: string;
  name: string;
  max_person: number;
  persons: [IPerson];
};