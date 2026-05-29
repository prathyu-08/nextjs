'use client';
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function SectionCard({ title, layout, columns, addLabel, items, emptyText, renderItem, onAdd, onEdit, onDelete }) {
  return (
    <div className="dashboard-panel mt-4">
      <div className="panel-header d-flex justify-content-between align-items-center">
        <h3 className="mb-0">{title}</h3>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onAdd}
          title={`Add ${title}`}
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="panel-content">
        {layout === "table" && (
          <div className="table-responsive">
            <table className="table resume-table">
              <thead>
                <tr>
                  {columns.map((col, i) => (
                    <th key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center text-slate-500 py-4">
                      No {title.toLowerCase()} added yet. Click the + button to add.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>{renderItem(item)}</tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {layout === "timeline" && (
          <div className="experience-timeline">
            {items.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No {title.toLowerCase()} added yet. Click the + button to add.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="experience-item">
                  {renderItem(item)}
                </div>
              ))
            )}
          </div>
        )}
        {layout === "grid" && (
          <div className="projects-grid">
            {items.length === 0 ? (
              <p className="text-slate-500 text-center py-4 col-span-full">No {title.toLowerCase()} added yet. Click the + button to add.</p>
            ) : (
              items.map((item) => (
                <div key={item.id}>
                  {renderItem(item)}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
