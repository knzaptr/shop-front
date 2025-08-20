"use client";
import { TProduct } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

const ProductById = ({ product }: { product: TProduct }) => {
  const [qty, setQty] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.images[0],
    });

    // Si la quantité est > 1, on incrémente directement
    if (qty > 1) {
      for (let i = 1; i < qty; i++) {
        addToCart({
          id: product._id,
          name: product.title,
          price: product.price,
          image: product.images[0],
        });
      }
    }

    // Afficher le message de confirmation
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const reviews = product.reviews || [];
  const reviewsCount = reviews.length;
  const averageRating =
    reviewsCount > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewsCount
      : product.rating || 0;

  const formatDate = (d: string | Date) => {
    try {
      return new Date(d).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const renderStars = (value: number) => {
    const rounded = Math.round(value);
    return (
      <div className="flex items-center gap-1" aria-label={`${rounded}/5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`${
              i < rounded ? "text-yellow-400" : "text-slate-300"
            } w-5 h-5`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.95 13.98a1 1 0 00-1.175 0l-2.335 1.694c-.784.57-1.838-.197-1.539-1.118l1.07-3.293a1 1 0 00-.364-1.117L3.806 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-6">
            <div className="aspect-square relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden border border-slate-200/60">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-contain p-8"
              />
            </div>
          </div>

          {/* Infos produit */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                {product.brand}
              </p>
              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                {product.title}
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-bold text-blue-600">
                  {product.price.toFixed(2)} €
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={`text-sm font-semibold ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.availabilityStatus} : {product.stock} en stock
                </p>
              </div>
            </div>

            {/* Sélecteur quantité */}
            <div className="flex items-center gap-6">
              <label className="text-sm font-medium text-slate-700">
                Quantité :
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 border border-slate-200 rounded-xl text-xl font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-slate-900 min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 border border-slate-200 rounded-xl text-xl font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={qty >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Ajouter au panier */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
            </button>

            {/* Message de confirmation */}
            {showAddedMessage && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">
                    {qty > 1
                      ? `${qty} produits ajoutés au panier !`
                      : "Produit ajouté au panier !"}
                  </span>
                </div>
                <a
                  href="/cart"
                  className="text-sm text-green-600 hover:text-green-700 underline mt-2 inline-block"
                >
                  Voir mon panier
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Avis clients */}
      {reviewsCount > 0 && (
        <div className="mt-8 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Avis clients</h2>
            <div className="flex items-center gap-3">
              {renderStars(averageRating)}
              <span className="text-slate-600 text-sm">
                {averageRating.toFixed(1)} / 5
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 text-sm">
                {reviewsCount} avis
              </span>
            </div>
          </div>

          <ul className="space-y-6">
            {reviews.map((r, idx) => (
              <li
                key={idx}
                className="p-6 bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-slate-900">
                    {r.reviewerName || "Utilisateur"}
                  </div>
                  <div className="flex items-center gap-3">
                    {renderStars(r.rating)}
                    <span className="text-slate-500 text-sm">
                      {formatDate(r.date)}
                    </span>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{r.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductById;
