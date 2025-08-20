import ProductItem from "@/components/ProductItem";
import getProducts from "@/queries/getProducts";

export const dynamic = "force-dynamic";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams?: { search?: string };
}) => {
  const params = await searchParams;
  const search = params?.search || "";
  const products = await getProducts({ search });

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

      {/* Barre de recherche */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6">
        <form
          action="/products"
          method="get"
          className="flex items-center gap-4"
        >
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              name="search"
              defaultValue={search}
              placeholder="Rechercher un produit..."
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-base text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Rechercher
          </button>
        </form>
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
