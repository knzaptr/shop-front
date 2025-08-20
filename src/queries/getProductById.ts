import Product from "@/models/Product";
import { TProduct } from "@/types";
import serialize from "@/utils/serialize";

const getProductById = async (id: string): Promise<TProduct | null> => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return null;
    }
    return serialize(product);
  } catch (error) {
    console.error("Erreur getProductById:", error);
    return null;
  }
};

export default getProductById;
