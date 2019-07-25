import { Prisma } from "../../../prisma/generated/prisma-client/index";

export interface Context {
  db: Prisma;
  request: any;
}
