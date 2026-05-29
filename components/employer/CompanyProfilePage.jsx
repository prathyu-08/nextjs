'use client';
import EmployerSidebar from "../layout/sidebars/EmployerSidebar";

export default function CompanyProfilePage() {
  return (
    <section style={{ background:"#f7f9fc",minHeight:"100vh",padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"0 24px",display:"flex",gap:24,alignItems:"flex-start" }}>
        <EmployerSidebar currentPath="/employer/company-profile"/>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:28,fontWeight:700,color:"#1f2937",marginBottom:4 }}>Company Profile</h1>
          <p style={{ color:"#6b7280",marginBottom:24 }}>Update your company information visible to candidates</p>
          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:20 }}>Company Logo</h3>
            <div style={{ display:"flex",alignItems:"center",gap:20 }}>
              <div style={{ width:120,height:120,borderRadius:12,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40 }}>🏢</div>
              <div>
                <button style={{ padding:"10px 20px",border:"1px solid #2563eb",color:"#2563eb",background:"transparent",borderRadius:8,cursor:"pointer",marginRight:12 }}>Upload Logo</button>
                <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",color:"#374151",background:"transparent",borderRadius:8,cursor:"pointer" }}>Remove</button>
                <p style={{ fontSize:13,color:"#9ca3af",marginTop:8 }}>PNG, JPG, GIF up to 10MB. Min 200x200px recommended.</p>
              </div>
            </div>
          </div>
          {[
            { title:"Basic Info", fields:[["Company Name","NMK Global Inc.",1],["Industry","Information Technology",1],["Company Type","Private",1],["Founded Year","2015",1],["Company Size","50-200 employees",1],["Website","https://nmkglobalinc.com",1],["Tagline","Empowering careers, connecting talent",2],["Description","",2,"textarea"]] },
            { title:"Contact & Location", fields:[["Email","info@nmkglobalinc.com",1],["Phone","+1 555 123 4567",1],["Address","123 Business Ave",1],["City","New York",1],["Country","United States",1],["Zip Code","10001",1]] },
          ].map((sec,si)=>(
            <div key={si} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
              <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:20 }}>{sec.title}</h3>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20 }}>
                {sec.fields.map(([label,placeholder,span,type],fi)=>(
                  <div key={fi} style={{ gridColumn:`span ${span}` }}>
                    <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>{label}</label>
                    {type==="textarea" ? <textarea placeholder={placeholder} rows={4} style={{ width:"100%",padding:"11px 14px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none",resize:"vertical" }}/> :
                      <input defaultValue={placeholder} style={{ width:"100%",padding:"11px 14px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none" }}/>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display:"flex",justifyContent:"flex-end",gap:12 }}>
            <button style={{ padding:"12px 24px",border:"1px solid #e5e7eb",background:"#f9fafb",color:"#374151",borderRadius:10,fontWeight:600,cursor:"pointer" }}>Cancel</button>
            <button style={{ padding:"12px 24px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer" }}>Save Changes</button>
          </div>
        </div>
      </div>
    </section>
  );
}
