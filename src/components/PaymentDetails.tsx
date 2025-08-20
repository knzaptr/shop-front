"use client";
import { redirect } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
export default function PaymentDetails({ isAuth }: { isAuth: boolean }) {
  if (!isAuth) {
    redirect("/users/login");
  }

  const { items, total } = useCartStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
          Passez au paiement
        </h1>
      </div>

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
              </li>
            ))}
            <h2 className="text-2xl font-bold text-slate-900">Total</h2>
            <p className="text-3xl font-bold text-blue-600">
              {total().toFixed(2)} €
            </p>
          </ul>
        </div>
      </div>
      {/* Contenu de la page de paiement */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-8">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <div className="space-y-3"></div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/cart"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Modifier mon panier
            </a>
            <a
              href="/products"
              className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              Continuer les achats
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
