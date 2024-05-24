import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const orderCreateIntoDb = async (order: TOrder) => {
  const data = await OrderModel.create(order);
  return data;
};

const fetchOrdersFromDb = async (query: { email: object }) => {
  const data = await OrderModel.find(query);
  return data;
};

export const orderServices = {
  fetchOrdersFromDb,
  orderCreateIntoDb,
};
