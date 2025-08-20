"use client";
import { useCartStore } from "../store/cartStore";
import Image from "next/image";
export default function CartDetails() {
  const { items, increaseQty, decreaseQty, removeFromCart, total } =
    useCartStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
          Votre Panier
        </h1>
        <p className="text-lg text-slate-600">
          Gérez vos articles et passez à la commande
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700">
              Votre panier est vide
            </h3>
            <p className="text-slate-500">
              Ajoutez des produits pour commencer vos achats
            </p>
            <a
              href="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Découvrir nos produits
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Liste des articles */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg flex items-center justify-center">
                      <Image
                        src={item.image ?? ""}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {item.price.toFixed(2)} €
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center text-slate-600 font-bold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center text-slate-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Résumé et paiement */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Total</h2>
              <p className="text-3xl font-bold text-blue-600">
                {total().toFixed(2)} €
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="/payment"
                className="w-full block text-center py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Passer au paiement
              </a>

              <a
                href="/products"
                className="w-full block text-center py-3 px-6 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                Continuer les achats
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
