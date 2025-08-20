import Order from "@/models/Order";
import { TOrder } from "@/types";
import serialize from "@/utils/serialize";

const getOrders = async (filter: Partial<TOrder> = {}) => {
  const order: TOrder[] = await Order.find(filter);
  return serialize(order);
};

export default getOrders;
