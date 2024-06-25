//queries:interaksi dengan tabel
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const findAllContact = () => {
  return prisma.contact.findMany();
};

export const createContact = (data: Prisma.ContactCreateInput) => {
  return prisma.contact.create({ data });
};
