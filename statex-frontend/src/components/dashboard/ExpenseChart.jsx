import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ExpenseChart({ data = [] }) {
  const chartData = data.map((item) => ({
    month: item.month,
    expense: item.total,
  }));

  return (
    <div className="h-[420px] rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-1 text-2xl font-bold text-white">
        Expense Trend
      </h2>

      <p className="mb-6 text-slate-400">
        Monthly spending overview
      </p>

      <ResponsiveContainer width="100%" height="82%">

        <LineChart data={chartData}>

          <CartesianGrid
            stroke="#26324a"
            strokeDasharray="5 5"
          />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Expense"]}
            contentStyle={{
              background: "#111827",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "white",
            }}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#3b82f6",
            }}
            activeDot={{
              r: 8,
            }}
            animationDuration={1200}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}