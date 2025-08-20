import isAuthenticated from "@/middlewares/isAuthenticated";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import CartIndicator from "./CartIndicator";

const Header = async () => {
  const authenticated = await isAuthenticated();

  return (
    <header className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="group">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
              Ma Boutique
            </h1>
          </Link>

          <Link href="/cart" className="relative group">
            <div className="p-2 rounded-xl hover:bg-slate-50 transition-colors duration-200">
              <svg
                className="w-6 h-6 text-slate-600 group-hover:text-blue-600"
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
              <CartIndicator />
            </div>
          </Link>
        </div>

        {authenticated ? (
          <LogoutButton />
        ) : (
          <nav className="flex items-center gap-6">
            <Link
              className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105"
              href="/users/signup"
            >
              S&apos;inscrire
            </Link>
            <Link
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              href="/users/login"
            >
              Se connecter
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
