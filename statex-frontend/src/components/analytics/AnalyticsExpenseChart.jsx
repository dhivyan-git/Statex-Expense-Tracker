import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsExpenseChart({ data = [] }) {
  const chartData = data.map((item) => ({
    month: item.month,
    expense: item.total,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid
          stroke="#26324a"
          strokeDasharray="5 5"
        />

        <XAxis
          dataKey="month"
          stroke="#94a3b8"
        />

        <YAxis
          stroke="#94a3b8"
        />

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
        />
      </LineChart>
    </ResponsiveContainer>
  );
}