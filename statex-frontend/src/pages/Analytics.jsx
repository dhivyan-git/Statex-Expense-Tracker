import { useEffect, useState } from "react";

import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import TopCategoryChartOnly from "../components/analytics/TopCategoryChartOnly";
import CategoryProgress from "../components/analytics/CategoryProgress";
import AnalyticsExpenseChart from "../components/analytics/AnalyticsExpenseChart";
import {
  Wallet,
  Trophy,
  Receipt,
  IndianRupee,
} from "lucide-react";

import {
  getDashboardSummary,
  getMonthlyExpense,
  getCategorySummary,
} from "../services/dashboardService";

export default function Analytics() {

  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const loadAnalytics = async () => {

    try {

      const [
        dashboardRes,
        monthlyRes,
        categoryRes,
      ] = await Promise.all([
        getDashboardSummary(),
        getMonthlyExpense(),
        getCategorySummary(),
      ]);

      setSummary(dashboardRes.data);
      setMonthlyData(monthlyRes.data);
      setCategoryData(categoryRes.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadAnalytics();

  }, []);

  const topCategory =
    categoryData.length > 0
      ? [...categoryData].sort((a, b) => b.total - a.total)[0]
      : null;

  const highestMonth =
    monthlyData.length > 0
      ? [...monthlyData].sort((a, b) => b.total - a.total)[0]
      : null;

  return (

    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-3xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-2 text-slate-400">
          Detailed insights of your expenses
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Expenses"
          value={`₹${summary?.totalExpenses?.toLocaleString() ?? 0}`}
          subtitle="Overall Spending"
          icon={Wallet}
          color="blue"
          trend="up"
        />

        <SummaryCard
          title="Highest Expense"
          value={`₹${summary?.highestExpense?.toLocaleString() ?? 0}`}
          subtitle="Largest Expense"
          icon={Trophy}
          color="purple"
          trend="up"
        />

        <SummaryCard
          title="Transactions"
          value={summary?.totalTransactions ?? 0}
          subtitle="Total Records"
          icon={Receipt}
          color="green"
          trend="up"
        />

        <SummaryCard
          title="Average Expense"
          value={`₹${Math.round(summary?.averageExpense ?? 0).toLocaleString()}`}
          subtitle="Average Spending"
          icon={IndianRupee}
          color="orange"
          trend="down"
        />

      </div>

      {/* Charts */}

      <div className="grid xl:grid-cols-3 gap-6">

        {/* Monthly Trend */}

        <div className="xl:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-2xl font-bold text-white">
            Expense Trend
          </h2>

          <p className="mb-6 text-slate-400">
            Monthly spending overview
          </p>

          <AnalyticsExpenseChart
            data={monthlyData}
          />

        </div>

        {/* Top Categories */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="text-2xl font-bold text-white">
            Top Spending Categories
          </h2>

          <p className="mb-6 text-slate-400">
            Highest amount spent by category
          </p>

          <TopCategoryChartOnly
            data={categoryData}
          />

        </div>

      </div>

      {/* Progress Bars */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <h2 className="text-2xl font-bold text-white mb-2">
          Spending Distribution
        </h2>

        <p className="text-slate-400 mb-8">
          Category wise expense breakdown
        </p>

        <CategoryProgress
          data={categoryData}
        />

      </div>

      {/* Insights */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            Top Category
          </h2>

          <p className="text-5xl font-black text-blue-500">
            {topCategory?.category ?? "-"}
          </p>

          <p className="mt-4 text-2xl font-bold text-emerald-400">
            ₹{topCategory?.total?.toLocaleString() ?? 0}
          </p>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold text-white mb-5">
            Highest Spending Month
          </h2>

          <p className="text-5xl font-black text-purple-500">
            {highestMonth?.month ?? "-"}
          </p>

          <p className="mt-4 text-2xl font-bold text-emerald-400">
            ₹{highestMonth?.total?.toLocaleString() ?? 0}
          </p>

        </div>

      </div>

    </div>

  );

}