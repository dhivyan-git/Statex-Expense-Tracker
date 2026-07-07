import { useEffect, useState } from "react";
import {
  addExpense,
  updateExpense,
} from "../../services/expenseService";

function ExpenseForm({
  onClose,
  onSuccess,
  expense,
}) {

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    purchaseDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Others",
  ];

  useEffect(() => {

    if (expense) {

      setFormData({
        title: expense.title,
        category: expense.category,
        amount: expense.amount,
        purchaseDate: expense.purchaseDate,
        description: expense.description,
      });

    } else {

      setFormData({
        title: "",
        category: "",
        amount: "",
        purchaseDate: "",
        description: "",
      });

    }

  }, [expense]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        title: formData.title,
        category: formData.category,
        amount: Number(formData.amount),
        purchaseDate: formData.purchaseDate,
        description: formData.description,
      };

      if (expense) {

        await updateExpense(expense.id, payload);

        toast.success("Expense Updated Successfully");

      } else {

        await addExpense(payload);

        toast.success("Expense Added Successfully");

      }

      onSuccess();
      onClose();

    } catch (error) {

      console.error(error);

      alert("Operation Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>

        <label className="mb-2 block text-sm text-slate-400">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm text-slate-400">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        >

          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}

        </select>

      </div>

      <div>

        <label className="mb-2 block text-sm text-slate-400">
          Amount
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm text-slate-400">
          Purchase Date
        </label>

        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm text-slate-400">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
      >

        {loading
          ? "Saving..."
          : expense
          ? "Update Expense"
          : "Add Expense"}

      </button>

    </form>

  );
}

export default ExpenseForm;