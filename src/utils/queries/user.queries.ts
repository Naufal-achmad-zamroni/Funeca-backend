//fungsi yang digunakan untuk berinteraksi dengan tabel user dalam database 
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const findAllUser = (where?: Prisma.UserWhereInput) => {
  return prisma.user.findMany({ where });
};

export const findUser = (where: Prisma.UserWhereInput) => {
  return prisma.user.findFirst({ where });
};

export const updateUserById = (
  user_id: number,
  data: Prisma.UserUpdateInput
) => {
  return prisma.user.update({ where: { id: user_id }, data });
};

export const deleteUserById = (user_id: number) => {
  return prisma.user.delete({ where: { id: user_id } });
};

export const createUser = (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};
