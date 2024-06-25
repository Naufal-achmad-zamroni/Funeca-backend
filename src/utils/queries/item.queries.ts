//fungsi yang digunakan untuk berinteraksi dengan tabel item dalam database 
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const findAllItem = () => {
  return prisma.item.findMany();
};

export const findItem = (where: Prisma.ItemWhereInput) => {
  return prisma.item.findMany({ where });
};

export const findItemById = (where: Prisma.ItemWhereInput) => {
  return prisma.item.findFirst({ where });
};

export const updateItemById = (
  user_id: number,
  data: Prisma.ItemUpdateInput
) => {
  return prisma.item.update({ where: { id: user_id }, data });
};

export const deleteItemById = (user_id: number) => {
  return prisma.item.delete({ where: { id: user_id } });
};

export const createItem = (data: Prisma.ItemCreateInput) => {
  return prisma.item.create({ data });
};
