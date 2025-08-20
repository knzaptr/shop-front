import Product from "@/models/Product";
import { TProduct } from "@/types";
import serialize from "@/utils/serialize";
import { FilterQuery } from "mongoose";

// On ajoute 'search' comme propriété optionnelle au type du filtre
type TProductFilter = Partial<TProduct> & { search?: string };

const getProducts = async (params: TProductFilter = {}) => {
  // 1. On sépare le mot-clé 'search' du reste du filtre
  const { search, ...filter } = params;

  // 2. Le reste du filtre est la base de notre requête
  const query: FilterQuery<TProduct> = { ...filter };

  // 3. Si un terme de recherche est présent, on ajoute la logique de recherche
  if (search) {
    const searchRegex = new RegExp(search, "i"); // 'i' pour insensible à la casse
    query.$or = [
      { title: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { category: { $regex: searchRegex } },
      { brand: { $regex: searchRegex } },
      { tags: { $in: [searchRegex] } }, // si tags est un tableau
    ];
  }

  const products: TProduct[] = await Product.find(query);
  return serialize(products);
};

export default getProducts;
