import {
  User,
  Lock,
  Moon,
  Save,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";

export default function Settings() {

  const email = localStorage.getItem("email");

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [summary, setSummary] = useState(null);

useEffect(() => {
  loadSummary();
}, []);

const loadSummary = async () => {
  try {
    const res = await getDashboardSummary();
    setSummary(res.data);
  } catch (err) {
    console.error(err);
  }
};
  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account preferences
        </p>

      </div>

      {/* Profile */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex items-center gap-3 mb-6">

          <User className="text-blue-400"/>

          <h2 className="text-2xl font-bold">
            Profile
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="text-slate-400 text-sm">
              Username
            </label>

            <input
              value="Expense User"
              readOnly
              className="mt-2 w-full rounded-xl bg-slate-800 p-3"
            />

          </div>

          <div>

            <label className="text-slate-400 text-sm">
              Email
            </label>

            <input
              value={email || ""}
              readOnly
              className="mt-2 w-full rounded-xl bg-slate-800 p-3"
            />

          </div>

        </div>

      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

<h2 className="text-2xl font-bold mb-6">
Account Statistics
</h2>

<div className="grid grid-cols-3 gap-6">

<div>
<p className="text-slate-400">Total Expenses</p>
<p className="text-2xl font-bold text-blue-400">
₹{summary?.totalExpenses?.toLocaleString()}
</p>
</div>

<div>
<p className="text-slate-400">Transactions</p>
<p className="text-2xl font-bold text-green-400">
{summary?.totalTransactions}
</p>
</div>

<div>
<p className="text-slate-400">Average Expense</p>
<p className="text-2xl font-bold text-orange-400">
₹{Math.round(summary?.averageExpense ?? 0)}
</p>
</div>

</div>

</div>

      {/* Change Password */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex items-center gap-3 mb-6">

          <Lock className="text-purple-400"/>

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

        </div>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            value={password.currentPassword}
            onChange={(e)=>
              setPassword({
                ...password,
                currentPassword:e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-800 p-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password.newPassword}
            onChange={(e)=>
              setPassword({
                ...password,
                newPassword:e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-800 p-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={password.confirmPassword}
            onChange={(e)=>
              setPassword({
                ...password,
                confirmPassword:e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-800 p-3"
          />

          <button
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold"
          >

            <Save size={18}/>

            Change Password

          </button>

        </div>

      </div>

      {/* Appearance */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex items-center gap-3 mb-4">

          <Moon className="text-orange-400"/>

          <h2 className="text-2xl font-bold">
            Appearance
          </h2>

        </div>

        <div className="flex justify-between items-center">

          <span>Dark Theme</span>

          <input
            checked
            readOnly
            type="checkbox"
            className="h-5 w-5"
          />

        </div>

      </div>

      {/* Logout */}

      <div className="rounded-3xl border border-red-700 bg-slate-900 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Logout
            </h2>

            <p className="text-slate-400">
              Sign out from your account
            </p>

          </div>

          <button
            onClick={()=>{
              localStorage.clear();
              window.location.href="/login";
            }}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 hover:bg-red-700"
          >

            <LogOut size={18}/>

            Logout

          </button>

        </div>

      </div>

    </div>

  );
}