'use client';
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ title, children, open, onClose, onSubmit }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(15,23,42,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "24px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.form
            onSubmit={onSubmit}
            onMouseDown={(event) => event.stopPropagation()}
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "1000px",
              maxHeight: "92vh",
              overflowY: "auto",
              borderRadius: "16px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              padding: "32px",
            }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Resume Builder</p>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
