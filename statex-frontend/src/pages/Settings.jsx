import {
  User,
  Lock,
  Moon,
  Save,
  LogOut,
} from "lucide-react";

import { changePassword } from "../services/changePasswordService";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import { getProfile, updateProfile } from "../services/profileService";
import toast from "react-hot-toast";

export default function Settings() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [summary, setSummary] = useState(null);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
    loadSummary();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    }
  };

  const loadSummary = async () => {
    try {
      const res = await getDashboardSummary();
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveProfile = async () => {
  try {

    const res = await updateProfile(profile);

    setProfile(res.data);

    // Update local storage
    localStorage.setItem("name", res.data.name);
    localStorage.setItem("email", res.data.email);

    // Notify Header to refresh
    window.dispatchEvent(new Event("profileUpdated"));

    toast.success("Profile updated successfully");

  } catch (err) {

    console.error(err);

    toast.error("Failed to update profile");

  }
};

const handleChangePassword = async () => {

  if (
    !password.currentPassword ||
    !password.newPassword ||
    !password.confirmPassword
  ) {

    toast.error("Please fill all fields");
    return;
  }

  if (password.newPassword !== password.confirmPassword) {

    toast.error("Passwords do not match");
    return;
  }

  try {

    await changePassword(password);

    toast.success("Password changed successfully");

    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (err) {

    console.log(err);

    toast.error(
      err.response?.data || "Failed to change password"
    );

  }

};

  return (

    <div className="space-y-8">

      {/* Heading */}

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

        <div className="mb-6 flex items-center gap-3">

          <User className="text-blue-400" />

          <h2 className="text-2xl font-bold">

            Profile

          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="text-sm text-slate-400">

              Name

            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="text-sm text-slate-400">

              Email

            </label>

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
            />

          </div>

        </div>

        <button
          onClick={saveProfile}
          className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
        >

          <Save size={18} />

          Save Profile

        </button>

      </div>

      {/* Statistics */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">

          Account Statistics

        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <p className="text-slate-400">

              Total Expenses

            </p>

            <p className="text-3xl font-bold text-blue-400">

              ₹{summary?.totalExpenses?.toLocaleString() ?? 0}

            </p>

          </div>

          <div>

            <p className="text-slate-400">

              Transactions

            </p>

            <p className="text-3xl font-bold text-green-400">

              {summary?.totalTransactions ?? 0}

            </p>

          </div>

          <div>

            <p className="text-slate-400">

              Average Expense

            </p>

            <p className="text-3xl font-bold text-orange-400">

              ₹{Math.round(summary?.averageExpense ?? 0)}

            </p>

          </div>

        </div>

      </div>

      {/* Change Password */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-6 flex items-center gap-3">

          <Lock className="text-purple-400" />

          <h2 className="text-2xl font-bold">

            Change Password

          </h2>

        </div>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            value={password.currentPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                currentPassword: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 p-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                newPassword: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 p-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                confirmPassword: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 p-3"
          />

         <button
onClick={handleChangePassword}
className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold hover:opacity-90"
>

            <Save size={18} />

            Change Password

          </button>

        </div>

      </div>

      {/* Appearance */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-4 flex items-center gap-3">

          <Moon className="text-orange-400" />

          <h2 className="text-2xl font-bold">

            Appearance

          </h2>

        </div>

        <div className="flex items-center justify-between">

          <span>

            Dark Theme

          </span>

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
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 hover:bg-red-700"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </div>

  );

}