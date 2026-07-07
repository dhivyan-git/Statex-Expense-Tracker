import { useEffect, useState } from "react";
import { Plus, Wallet, Trophy, Receipt, IndianRupee } from "lucide-react";

import AddExpenseModal from "../components/expense/AddExpenseModal";

import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import {
  getDashboardSummary,
  getMonthlyExpense,
  getCategorySummary,
} from "../services/dashboardService";

import { getAllExpenses } from "../services/expenseService";

function Dashboard() {

  const [openModal, setOpenModal] = useState(false);

  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const loadDashboard = async () => {

    try {

      const [
        dashboardRes,
        monthlyRes,
        categoryRes,
        expensesRes,
      ] = await Promise.all([
        getDashboardSummary(),
        getMonthlyExpense(),
        getCategorySummary(),
        getAllExpenses(),
      ]);

      setSummary(dashboardRes.data);
      setMonthlyData(monthlyRes.data);
      setCategoryData(categoryRes.data);
      setExpenses(expensesRes.data);
    console.log(expensesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Expense Overview
          </h2>

          <p className="mt-2 text-slate-400">
            Here's a quick summary of your expenses.
          </p>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold transition hover:scale-105"
        >
          <Plus size={20} />
          Add Expense
        </button>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Expenses"
          value={`₹${summary?.totalExpenses?.toLocaleString() ?? 0}`}
          subtitle="Overall Expenses"
          icon={Wallet}
          color="blue"
          trend="up"
        />

        <SummaryCard
          title="Highest Expense"
          value={`₹${summary?.highestExpense?.toLocaleString() ?? 0}`}
          subtitle="Largest Transaction"
          icon={Trophy}
          color="purple"
          trend="up"
        />

        <SummaryCard
          title="Transactions"
          value={summary?.totalTransactions ?? 0}
          subtitle="Expense Records"
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

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <ExpenseChart data={monthlyData} />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h3 className="mb-1 text-2xl font-bold text-white">
            Category Distribution
          </h3>

          <p className="mb-6 text-slate-400">
            Spending by category
          </p>

          <CategoryChart data={categoryData} />

        </div>

      </div>

      <RecentTransactions expenses={expenses} />

      <AddExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={loadDashboard}
      />

    </div>
  );
}

export default Dashboard;