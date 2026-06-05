'use client';
import { Shell } from "../_shared";
import styles from "./PaymentHistoryPage.module.css";

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
      <div className={styles.summaryGrid}>
        {[["Total Spent","$59.00","#2563eb"],["Active Plan","Basic Jobs View","#16a34a"],["Renews On","Dec 31, 2025","#d97706"]].map(([label,val,color],i) => (
          <div key={i} className={styles.summaryCard}>
            <div className={styles.summaryLabel}>{label}</div>
            <div className={`${styles.summaryValue} ${i === 0 ? styles.summaryValueLarge : styles.summaryValueSmall}`} style={{ color }}>{val}</div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHead}>
          <h3 className={styles.tableHeadTitle}>Transaction History</h3>
          <button className={styles.exportBtn}>
            <i className={`fa-solid fa-download ${styles.exportIcon}`} />Export
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tHeadRow}>
              {["ID","Description","Period","Date","Amount","Method","Status",""].map(th => (
                <th key={th} className={styles.th}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p,i) => (
              <tr key={i} className={styles.tr}>
                <td className={styles.td}>{p.id}</td>
                <td className={styles.tdDesc}>{p.desc}</td>
                <td className={styles.td}>{p.period}</td>
                <td className={styles.td}>{p.date}</td>
                <td className={styles.tdAmount}>{p.amount}</td>
                <td className={styles.td}>{p.method}</td>
                <td className={styles.tdCell}><span className={styles.statusBadge}>{p.status}</span></td>
                <td className={styles.tdCell}><button className={styles.receiptBtn}>Receipt</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
