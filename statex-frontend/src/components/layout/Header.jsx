import { Bell, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

function Header() {

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {

    setUser({
      name: localStorage.getItem("name") || "User",
      email: localStorage.getItem("email") || "",
    });

    // Listen for profile updates
    const handleProfileUpdate = () => {
      setUser({
        name: localStorage.getItem("name") || "User",
        email: localStorage.getItem("email") || "",
      });
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () =>
      window.removeEventListener("profileUpdated", handleProfileUpdate);

  }, []);

  return (

    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl">

      <div className="flex h-24 items-center justify-between px-10">

        {/* Left */}

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-400">
            Welcome back, {user.name}
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          <button className="relative rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700">

            <Bell size={22} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">

            <UserCircle2 size={40} />

            <div>

              <p className="font-semibold">
                {user.name}
              </p>

              <p className="text-sm text-slate-400">
                {user.email}
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>

  );
}

export default Header;