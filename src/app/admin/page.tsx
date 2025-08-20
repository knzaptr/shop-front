// app/admin/page.tsx

import OrderItem from "@/components/OrderItem";
import getOrders from "@/queries/getOrders";

const AdminPage = async () => {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
          Administration
        </h1>
        <p className="text-lg text-slate-600">
          Gérez les commandes et surveillez l&apos;activité de votre boutique
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {orders.length}
          </div>
          <div className="text-slate-600">Commandes totales</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {orders.reduce((sum, order) => sum + order.price, 0).toFixed(2)} €
          </div>
          <div className="text-slate-600">Chiffre d&apos;affaires</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {orders.length > 0
              ? (
                  orders.reduce((sum, order) => sum + order.price, 0) /
                  orders.length
                ).toFixed(2)
              : 0}{" "}
            €
          </div>
          <div className="text-slate-600">Panier moyen</div>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Commandes récentes
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-slate-500 text-lg">
              Aucune commande pour le moment
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map(async (order) => {
              return <OrderItem key={order._id} order={order} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
