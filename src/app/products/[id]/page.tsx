import ProductById from "@/components/ProductById";
import getProductById from "@/queries/getProductById";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ id: string }> };

const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return <div>Produit introuvable</div>; // ou un notFound()
  }

  return <ProductById product={product} />;
};

export default ProductDetails;
