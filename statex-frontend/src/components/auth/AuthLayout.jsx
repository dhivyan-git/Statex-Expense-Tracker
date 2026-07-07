import Logo from "../../assets/statex-logo.png";
function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_1px,transparent_1px)] [background-size:35px_35px] opacity-20"></div>

      {/* Blue Glow */}
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />

      {/* Purple Glow */}
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

      {/* Pink Glow */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative flex min-h-screen items-center justify-center p-8">

        <div className="grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-[36px] border border-slate-800 bg-slate-900/40 shadow-2xl backdrop-blur-3xl lg:grid-cols-2">

          {/* Left Side */}

          {/* Left Side */}

<div className="hidden flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50 p-16 lg:flex">

  <h1 className="text-7xl font-black tracking-tight text-slate-900">
    STATEX
  </h1>

  <p className="mt-4 text-center text-lg text-slate-600">
    Smart Expense Tracker
  </p>

  <img
    src={Logo}
    alt="Statex Logo"
    className="mt-10 w-96 object-contain drop-shadow-2xl"
  />

  <div className="mt-10 flex gap-6 text-blue-100 text-sm font-semibold tracking-widest">

    

  </div>

</div>
          {/* Right Side */}

          <div className="flex items-center justify-center p-12">

            <div className="w-full max-w-md">

              <h2 className="text-4xl font-bold">

                {title}

              </h2>

              <p className="mt-3 text-slate-400">

                {subtitle}

              </p>

              <div className="mt-10">

                {children}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;