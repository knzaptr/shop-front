"use client";
import { useCartStore } from "@/store/cartStore";

const CartIndicator = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  );
};

export default CartIndicator;
