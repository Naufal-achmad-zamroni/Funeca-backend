//fungsi yang digunakan untuk berinteraksi dengan tabel order dalam database 
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export const findAllOrder = (where?: Prisma.Order_listWhereInput) => {
  return prisma.order_list.findMany({
    where,
    include: {
      order_detail: { include: { item: { select: { name: true, price: true } } } },
    },
  });
};

export const createOrder = (data: Prisma.Order_listCreateInput) => {
  return prisma.order_list.create({ data });
};
