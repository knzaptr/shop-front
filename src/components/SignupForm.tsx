"use client";

import signup from "@/actions/signup";
import { useActionState } from "react";

const SignupForm = () => {
  const [error, formAction, isPending] = useActionState(signup, null);

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Inscription
        </h1>
        <p className="text-slate-600">Créez votre compte gratuitement</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-8">
        <form className="space-y-6" action={formAction}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Nom d&apos;utilisateur
            </label>
            <input
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              type="text"
              name="username"
              placeholder="Votre nom d'utilisateur"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              type="email"
              name="email"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <input
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Création..." : "S&apos;inscrire"}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
