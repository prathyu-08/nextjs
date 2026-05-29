'use client';
import { Shell } from "./_shared";

export default function PackagesPage() {
  const plans = [
    { name:"Free", price:0, desc:"Get started with basic job searching.", features:["5 job applications/month","Basic profile","Job search access","Email alerts"], popular:false, current:false },
    { name:"Basic", price:10, desc:"Perfect for active job seekers.", features:["20 job applications/month","Full profile","Priority in search","Job alerts","Resume download"], popular:false, current:true },
    { name:"Pro", price:29, desc:"Unlock everything for serious seekers.", features:["Unlimited applications","Featured profile","Top search placement","AI job matching","Interview prep tools","Dedicated support"], popular:true, current:false },
  ];
  return (
    <Shell path="/candidate/packages" title="Packages" subtitle="Choose the plan that fits your job search">
      {/* Current plan */}
      <div style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", borderRadius:12, padding:24, color:"#fff", marginBottom:28, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:16, right:16, background:"rgba(255,255,255,.2)", padding:"4px 14px", borderRadius:20, fontSize:12, fontWeight:500 }}>Active</div>
        <h3 style={{ fontSize:24, fontWeight:700, margin:"0 0 6px" }}>Basic Jobs View</h3>
        <p style={{ opacity:0.9, margin:"0 0 16px" }}>Your current plan — renews Dec 31, 2025</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12 }}>
          {[["Package","Basic Jobs View"],["Price","USD 10"],["Applications","02 / 20"],["Started","N/A"],["Expires","31 Dec, 2025"]].map(([label,val],i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.15)", borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
              <div style={{ fontSize:11, opacity:.8, marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:14, fontWeight:700 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {plans.map((plan,i) => (
          <div key={i} style={{ background:"#fff", borderRadius:16, border:`2px solid ${plan.popular?"#2563eb":plan.current?"#22c55e":"#e5e7eb"}`, padding:28, position:"relative" }}>
            {plan.popular && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"#2563eb", color:"#fff", padding:"4px 18px", borderRadius:20, fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>Most Popular</div>}
            {plan.current && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"#22c55e", color:"#fff", padding:"4px 18px", borderRadius:20, fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>Current Plan</div>}
            <h3 style={{ fontSize:20, fontWeight:700, color:"#1f2937", marginBottom:14 }}>{plan.name}</h3>
            <div style={{ marginBottom:12 }}>
              <span style={{ fontSize:22, color:"#2563eb" }}>$</span>
              <span style={{ fontSize:44, fontWeight:700, color:"#1f2937" }}>{plan.price}</span>
              <span style={{ fontSize:14, color:"#6b7280" }}>/month</span>
            </div>
            <p style={{ fontSize:14, color:"#6b7280", marginBottom:20 }}>{plan.desc}</p>
            <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px" }}>
              {plan.features.map((f,j) => (
                <li key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:"#4b5563", marginBottom:10 }}>
                  <i className="fa-solid fa-check" style={{ color:"#16a34a", fontSize:12 }} />{f}
                </li>
              ))}
            </ul>
            <button style={{ width:"100%", padding:"12px", background:plan.popular?"#2563eb":plan.current?"#f9fafb":"#f9fafb", color:plan.popular?"#fff":plan.current?"#6b7280":"#374151", border:`1px solid ${plan.popular?"#2563eb":"#e5e7eb"}`, borderRadius:10, fontWeight:600, cursor:"pointer", fontSize:14 }}>
              {plan.current ? "Current Plan" : plan.popular ? "Upgrade Now" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </Shell>
  );
}
