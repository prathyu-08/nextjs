'use client';
import EmployerSidebar from "../layout/sidebars/EmployerSidebar";

export default function CompanySettingsPage() {
  return (
    <section style={{ background:"#f7f9fc",minHeight:"100vh",padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"0 24px",display:"flex",gap:24,alignItems:"flex-start" }}>
        <EmployerSidebar currentPath="/employer/company-settings"/>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:28,fontWeight:700,color:"#1f2937",marginBottom:4 }}>Company Settings</h1>
          <p style={{ color:"#6b7280",marginBottom:24 }}>Manage account settings and preferences</p>
          {[
            { title:"Notification Preferences", options:[["New application received","Get notified when candidates apply to your jobs"],["Application status updates","Updates when candidates respond or withdraw"],["Profile views","Know when candidates view your company profile"],["Weekly digest","Get a weekly summary of your hiring activity"]] },
            { title:"Privacy Settings", options:[["Make company profile public","Allow all candidates to view your company profile"],["Show open positions","Display your job listings on the public company page"],["Allow candidate messages","Enable candidates to message you directly"]] },
          ].map((card,ci)=>(
            <div key={ci} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
              <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:20 }}>{card.title}</h3>
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                {card.options.map(([title,desc],i)=>(
                  <label key={i} style={{ display:"flex",alignItems:"center",gap:16,cursor:"pointer" }}>
                    <input type="checkbox" defaultChecked style={{ width:18,height:18,accentColor:"#2563eb" }}/>
                    <div>
                      <div style={{ fontSize:14,fontWeight:500,color:"#1f2937" }}>{title}</div>
                      <div style={{ fontSize:13,color:"#6b7280" }}>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:16 }}>Security</h3>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",borderRadius:10,cursor:"pointer",fontSize:14 }}>Change Password</button>
              <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",borderRadius:10,cursor:"pointer",fontSize:14 }}>Enable 2FA</button>
              <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",borderRadius:10,cursor:"pointer",fontSize:14 }}>Active Sessions</button>
            </div>
          </div>
          <div style={{ background:"#fff",borderRadius:16,border:"2px solid #fecaca",padding:28 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#dc2626",marginBottom:8 }}>Danger Zone</h3>
            <p style={{ fontSize:14,color:"#6b7280",marginBottom:16 }}>Once you delete your account, there is no going back. Please be certain.</p>
            <div style={{ display:"flex",gap:12 }}>
              <button style={{ padding:"10px 20px",border:"1px solid #dc2626",color:"#dc2626",background:"transparent",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600 }}>Deactivate Account</button>
              <button style={{ padding:"10px 20px",background:"#dc2626",color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600 }}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
