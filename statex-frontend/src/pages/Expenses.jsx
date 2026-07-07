import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  getAllExpenses,
  deleteExpense,
} from "../services/expenseService";

import AddExpenseModal from "../components/expense/AddExpenseModal";
import toast from "react-hot-toast";

export default function Expenses() {
  const [openModal, setOpenModal] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Newest First");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Load expenses
  const loadExpenses = async () => {
    try {
      const response = await getAllExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmDelete) return;

  try {

    await deleteExpense(id);

    toast.success("Expense Deleted Successfully");

    loadExpenses();

  } catch (error) {

    console.error(error);

    toast.error("Failed to Delete Expense");

  }

};

  useEffect(() => {
    loadExpenses();
  }, []);
   
  let filteredExpenses = [...expenses];

// Search
filteredExpenses = filteredExpenses.filter((expense) =>
  expense.title.toLowerCase().includes(search.toLowerCase())
);

// Category
if (category !== "All Categories") {
  filteredExpenses = filteredExpenses.filter(
    (expense) => expense.category === category
  );
}

// Sort
switch (sort) {
  case "Newest First":
    filteredExpenses.sort(
      (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
    );
    break;

  case "Oldest First":
    filteredExpenses.sort(
      (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate)
    );
    break;

  case "Highest Amount":
    filteredExpenses.sort((a, b) => b.amount - a.amount);
    break;

  case "Lowest Amount":
    filteredExpenses.sort((a, b) => a.amount - b.amount);
    break;

  case "Title A-Z":
    filteredExpenses.sort((a, b) => a.title.localeCompare(b.title));
    break;

  default:
    break;
}
  return (
    <div className="space-y-6">

      {/* Header */}
      
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Expenses
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your expenses
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold hover:scale-105 transition"
        >
          <Plus size={20} />
          Add Expense
        </button>

      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-3 text-white outline-none focus:border-blue-500"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          <option>All Categories</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Education</option>
          <option>Travel</option>
          <option>Others</option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Highest Amount</option>
          <option>Lowest Amount</option>
          <option>Title A-Z</option>
        </select>

        {/* Clear */}

        <button
  onClick={() => {
    setSearch("");
    setCategory("All Categories");
    setSort("Newest First");
  }}
  className="rounded-xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
>
  Clear Filters
</button>

      </div>

      {/* Expense Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>
            
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-400"
                >
                  Loading...
                </td>
              </tr>

            ) : expenses.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-400"
                >
                  No Expenses Found
                </td>
              </tr>

            ) : (

              filteredExpenses.map((expense) => (
<tr
    key={expense.id}
    className="border-t border-slate-800 hover:bg-slate-800/30"
>

<td className="px-6 py-5 font-semibold">
    {expense.title}
</td>

<td className="px-6 py-5">
    <span className="rounded-full bg-slate-800 px-3 py-1">
        {expense.category}
    </span>
</td>

<td className="px-6 py-5 font-bold text-emerald-400">
    ₹{expense.amount.toLocaleString()}
</td>

<td className="px-6 py-5">
    {new Date(expense.purchaseDate).toLocaleDateString("en-IN")}
</td>

<td className="px-6 py-5 text-slate-400">
    {expense.description}
</td>

<td className="px-6 py-5">

<div className="flex justify-center gap-3">

<button
    onClick={()=>{
        setSelectedExpense(expense);
        setOpenModal(true);
    }}
    className="rounded-lg bg-blue-600 p-2 hover:bg-blue-700 transition"
>
    <Pencil size={18}/>
</button>

<button
  onClick={() => handleDelete(expense.id)}
  className="rounded-lg bg-red-600 p-2 hover:bg-red-700 transition"
>
  <Trash2 size={18}/>
</button>

</div>

</td>

</tr>
))
            )}

          </tbody>

        </table>

      </div>

      <AddExpenseModal
    open={openModal}
    expense={selectedExpense}
    onClose={()=>{
        setOpenModal(false);
        setSelectedExpense(null);
    }}
    onSuccess={()=>{
        loadExpenses();
        setOpenModal(false);
        setSelectedExpense(null);
    }}
/>

    </div>
  );
}