"use client";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product }: { product: TProduct }) => {
  return (
    <li className="group">
      <Link
        href={`/products/${product._id}`}
        className="block bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/60 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-slate-300"
      >
        <div className="aspect-square relative bg-gradient-to-br from-slate-50 to-blue-50 p-4">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {product.title}
          </h3>
          {product.price && (
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                {product.price.toFixed(2)} €
              </span>
              <div className="text-slate-500 text-sm">
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
