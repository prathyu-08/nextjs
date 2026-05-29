'use client';
import { Shell } from "./_shared";

export default function PaymentHistoryPage() {
  const payments = [
    { id:"PAY-001", desc:"Basic Jobs View", period:"Nov 2025", date:"Nov 1, 2025", amount:"$10.00", method:"Visa •••• 4242", status:"paid" },
    { id:"PAY-002", desc:"Basic Jobs View", period:"Oct 2025", date:"Oct 1, 2025", amount:"$10.00", method:"Visa •••• 4242", status:"paid" },
    { id:"PAY-003", desc:"Pro Plan (1 month)", period:"Sep 2025", date:"Sep 1, 2025", amount:"$29.00", method:"Visa •••• 4242", status:"paid" },
    { id:"PAY-004", desc:"Basic Jobs View", period:"Aug 2025", date:"Aug 1, 2025", amount:"$10.00", method:"PayPal", status:"paid" },
  ];
  return (
    <Shell path="/candidate/payment-history" title="Payment History" subtitle="View all your subscription payments">
      {/* Summary cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {[["Total Spent","$59.00","#eff6ff","#2563eb"],["Active Plan","Basic Jobs View","#dcfce7","#16a34a"],["Renews On","Dec 31, 2025","#fef3c7","#d97706"]].map(([label,val,bg,color],i) => (
          <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:20 }}>
            <div style={{ fontSize:12, color:"#6b7280", marginBottom:6 }}>{label}</div>
            <div style={{ fontSize:i===0?28:18, fontWeight:700, color }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
        <div style={{ padding:"16px 20px", borderBottom:"1px solid #e5e7eb", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:0 }}>Transaction History</h3>
          <button style={{ padding:"8px 16px", border:"1px solid #e5e7eb", borderRadius:8, background:"#f9fafb", cursor:"pointer", fontSize:13 }}>
            <i className="fa-solid fa-download" style={{ marginRight:6 }} />Export
          </button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"#f9fafb" }}>
              {["ID","Description","Period","Date","Amount","Method","Status",""].map(th => (
                <th key={th} style={{ textAlign:"left", padding:"12px 16px", fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", borderBottom:"1px solid #e5e7eb" }}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p,i) => (
              <tr key={i} style={{ borderBottom:"1px solid #f3f4f6" }}>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.id}</td>
                <td style={{ padding:"14px 16px", fontSize:14, fontWeight:500, color:"#1f2937" }}>{p.desc}</td>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.period}</td>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.date}</td>
                <td style={{ padding:"14px 16px", fontSize:14, fontWeight:700, color:"#1f2937" }}>{p.amount}</td>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.method}</td>
                <td style={{ padding:"14px 16px" }}><span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:"#dcfce7", color:"#166534", textTransform:"capitalize" }}>{p.status}</span></td>
                <td style={{ padding:"14px 16px" }}><button style={{ padding:"5px 12px", border:"1px solid #e5e7eb", borderRadius:6, background:"#f9fafb", cursor:"pointer", fontSize:12 }}>Receipt</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
