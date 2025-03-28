import { SchemaDefinitionProperty } from 'mongoose';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: SchemaDefinitionProperty<string>;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
