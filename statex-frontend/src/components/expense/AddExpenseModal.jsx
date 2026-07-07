import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import ExpenseForm from "./ExpenseForm";

export default function AddExpenseModal({
  open,
  onClose,
  onSuccess,
  expense,
}) {

  useEffect(() => {

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };

  }, [onClose]);

  return (
    <AnimatePresence>

      {open && (
        <>

          {/* Background */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2"
          >

            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
            >

              {/* Header */}

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {expense ? "Edit Expense" : "Add Expense"}
                  </h2>

                  <p className="mt-1 text-slate-400">
                    {expense
                      ? "Update your expense details."
                      : "Fill the details below."}
                  </p>

                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl bg-slate-800 p-2 transition hover:bg-red-600"
                >
                  <X size={20} />
                </button>

              </div>

              <ExpenseForm
                expense={expense}
                onClose={onClose}
                onSuccess={onSuccess}
              />

            </div>

          </motion.div>

        </>
      )}

    </AnimatePresence>
  );
}