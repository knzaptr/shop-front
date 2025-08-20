"use client";

import logout from "@/actions/logout";

const LogoutButton = () => {
  return (
    <button
      className="px-4 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-medium hover:from-slate-700 hover:to-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
      onClick={logout}
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
