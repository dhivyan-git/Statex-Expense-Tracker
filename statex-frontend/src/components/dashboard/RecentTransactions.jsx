import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Tv,
  Receipt,
  HeartPulse,
  GraduationCap,
  CircleDollarSign,
} from "lucide-react";

const iconMap = {
  Food: UtensilsCrossed,
  Travel: Car,
  Shopping: ShoppingBag,
  Entertainment: Tv,
  Bills: Receipt,
  Health: HeartPulse,
  Education: GraduationCap,
  Others: CircleDollarSign,
};

const colorMap = {
  Food: "bg-orange-500",
  Travel: "bg-blue-500",
  Shopping: "bg-purple-500",
  Entertainment: "bg-red-500",
  Bills: "bg-green-500",
  Health: "bg-pink-500",
  Education: "bg-cyan-500",
  Others: "bg-slate-500",
};

export default function RecentTransactions({ expenses = [] }) {

  console.log("Expenses received:", expenses);

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
    .slice(0, 5);

  console.log("Recent Expenses:", recentExpenses);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Transactions
          </h2>

          <p className="text-slate-400">
            Your latest expenses
          </p>
        </div>

        <button className="text-blue-400 hover:text-blue-300 transition font-medium">
          View All →
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr className="text-left text-slate-300">
              <th className="px-6 py-4">Expense</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>

            {recentExpenses.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-400"
                >
                  No expenses found
                </td>
              </tr>

            ) : (

              recentExpenses.map((item) => {

                const Icon =
                  iconMap[item.category] || CircleDollarSign;

                const color =
                  colorMap[item.category] || "bg-slate-600";

                return (

                  <tr
                    key={item.id}
                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div
                          className={`h-11 w-11 rounded-xl ${color} flex items-center justify-center`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {item.title}
                          </p>

                          <p className="text-sm text-slate-400">
                            Personal Expense
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-bold text-emerald-400">
                      ₹{Number(item.amount).toLocaleString()}
                    </td>

                    <td className="px-6 py-5 text-slate-400">
                      {new Date(item.purchaseDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
                        Completed
                      </span>
                    </td>

                  </tr>

                );
              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}