import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TopCategoryChartOnly({ data = [] }) {
  const chartData = [...data].sort((a, b) => b.total - a.total);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        layout="vertical"
        data={chartData}
      >
        <XAxis type="number" />

        <YAxis
          type="category"
          dataKey="category"
          width={90}
        />

        <Tooltip />

        <Bar
          dataKey="total"
          fill="#f59e0b"
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}