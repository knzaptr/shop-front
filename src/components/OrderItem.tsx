import isAuthenticated from "@/middlewares/isAuthenticated";
import React from "react";
import { TOrder } from "@/types";

export default async function OrderItem({ order }: { order: TOrder }) {
  const admin = await isAuthenticated();

  if (!admin) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-600 text-center">
          ⛔ Accès refusé : connectez-vous
        </p>
      </div>
    );
  }

  return (
    <li className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Commande #{order._id.slice(-8)}
          </h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {order.price.toFixed(2)} €
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-slate-200 rounded-full flex-shrink-0 mt-1"></div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Adresse de livraison
              </p>
              <p className="text-slate-900">{order.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-slate-200 rounded-full flex-shrink-0 mt-1"></div>
            <div>
              <p className="text-sm font-medium text-slate-700">Client</p>
              <p className="text-slate-900">{order.owner.email}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
