import { PrismaClient } from "@prisma/client/extension";



export class UserModel extends PrismaClient.user  {
  id: number;
  email: string;
  name: string;
  password: string;   


  constructor(id: number, email: string, name: string, password: string) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
  }
}