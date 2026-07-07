import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TopCategoryChart({ data }) {

  const chartData = [...data]
    .sort((a, b) => b.total - a.total);

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold">

        Top Spending Categories

      </h2>

      <p className="text-slate-400 mb-6">

        Highest amount spent by category

      </p>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart
          layout="vertical"
          data={chartData}
        >

          <XAxis
            type="number"
          />

          <YAxis
            type="category"
            dataKey="category"
            width={100}
          />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#e39f0b"
            radius={[0,10,10,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}