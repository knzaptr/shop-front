import ProductItem from "@/components/ProductItem";
import getProducts from "@/queries/getProducts";

export const dynamic = "force-dynamic";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      {/* Header de la page */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
          Nos Produits
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explorez notre collection de produits soigneusement sélectionnés
        </p>
      </div>

      {/* Grille des produits */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </ul>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Aucun produit trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
