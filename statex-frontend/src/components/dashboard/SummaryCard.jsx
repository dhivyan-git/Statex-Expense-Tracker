import { TrendingUp, TrendingDown } from "lucide-react";

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  trend = "up",
}) {
  const gradients = {
    blue: "from-blue-600 to-blue-500",
    purple: "from-purple-600 to-fuchsia-500",
    green: "from-emerald-600 to-green-500",
    orange: "from-orange-500 to-amber-500",
    red: "from-red-500 to-rose-500",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10">

      {/* Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[color]} opacity-0 transition duration-300 group-hover:opacity-10`}
      />

      {/* Top Row */}
      <div className="relative flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl bg-gradient-to-br ${gradients[color]} p-4 shadow-lg`}
        >
          {Icon && <Icon size={24} className="text-white" />}
        </div>

      </div>

      {/* Bottom Row */}
      <div className="relative mt-6 flex items-center gap-2">

        {trend === "up" ? (
          <TrendingUp size={18} className="text-emerald-400" />
        ) : (
          <TrendingDown size={18} className="text-red-400" />
        )}

        <span
          className={`text-sm font-medium ${
            trend === "up"
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {subtitle}
        </span>

      </div>

    </div>
  );
}

export default SummaryCard;