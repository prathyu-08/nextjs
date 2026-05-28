export function Field({ label, error, children }) {
  return (
    <label style={{ display: "block", width: "100%" }}>
      <span
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#334155",
        }}
      >
        {label}
      </span>

      {children}

      {error && (
        <span
          style={{
            display: "block",
            marginTop: "6px",
            fontSize: "12px",
            color: "#dc2626",
          }}
        >
          {error}
        </span>
      )}
    </label>
  );
}

export function TextInput(props) {
  return (
    <input
      {...props}
      style={{
        height: "42px",
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
        background: "#fff",
        padding: "0 12px",
        fontSize: "14px",
        color: "#0f172a",
        outline: "none",
      }}
    />
  );
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      style={{
        minHeight: "120px",
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
        background: "#fff",
        padding: "12px",
        fontSize: "14px",
        color: "#0f172a",
        outline: "none",
      }}
    />
  );
}

export function SelectInput({ children, ...props }) {
  return (
    <select
      {...props}
      style={{
        height: "42px",
        width: "100%",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
        background: "#fff",
        padding: "0 12px",
        fontSize: "14px",
        color: "#0f172a",
        outline: "none",
      }}
    >
      {children}
    </select>
  );
}

export function SubmitButton({ children, ...props }) {
  return (
    <button
      type="submit"
      {...props}
      style={{
        border: "none",
        borderRadius: "10px",
        background: "#2563eb",
        padding: "10px 20px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export function CancelButton({ children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      style={{
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        background: "#fff",
        padding: "10px 20px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#334155",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}