'use client';
import { useState } from "react";
import { Shell, IMG } from "./_shared";

export default function MyMessagesPage() {
  const [selected, setSelected] = useState(0);
  const convs = [
    { name:"Multimedia Design", logo:`${IMG}/employers/emplogo1.jpg`, subject:"Re: UI/UX Designer Position", preview:"Thank you for your application...", time:"2h ago", unread:2 },
    { name:"Connect People", logo:`${IMG}/employers/emplogo7.jpg`, subject:"Interview Invitation", preview:"We'd like to invite you for...", time:"5h ago", unread:0 },
    { name:"Power Wave", logo:`${IMG}/employers/emplogo2.jpg`, subject:"Application Update", preview:"Your application is under review...", time:"1d ago", unread:1 },
  ];
  const messages = [
    { from:"company", text:"Hi! Thank you for applying for our UI/UX Designer position. We were impressed by your portfolio.", time:"10:00 AM" },
    { from:"me", text:"Thank you so much! I'm very excited about this opportunity and would love to learn more about the role.", time:"10:15 AM" },
    { from:"company", text:"Great! We'd like to schedule a 30-minute call this week. Are you available Thursday or Friday afternoon?", time:"10:30 AM" },
    { from:"me", text:"I'm available both days! Thursday 2-5 PM or Friday anytime works for me.", time:"10:35 AM" },
  ];
  return (
    <Shell path="/candidate/my-messages" title="My Messages">
      <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden", minHeight:600 }}>
        {/* Conversation list */}
        <div style={{ borderRight:"1px solid #e5e7eb" }}>
          <div style={{ padding:16, borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", gap:8 }}>
            <i className="fa-solid fa-search" style={{ color:"#9ca3af" }} />
            <input placeholder="Search messages..." style={{ border:"none", background:"transparent", outline:"none", fontSize:14, flex:1 }} />
          </div>
          {convs.map((c,i) => (
            <div key={i} onClick={() => setSelected(i)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:16, borderBottom:"1px solid #f3f4f6", cursor:"pointer", background:selected===i?"#eff6ff":"transparent" }}>
              <img src={c.logo} alt={c.name} style={{ width:42, height:42, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:14, fontWeight:600, color:"#1f2937" }}>{c.name}</span>
                  <span style={{ fontSize:11, color:"#9ca3af" }}>{c.time}</span>
                </div>
                <div style={{ fontSize:12, color:"#4b5563", marginBottom:2 }}>{c.subject}</div>
                <div style={{ fontSize:11, color:"#9ca3af", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.preview}</div>
              </div>
              {c.unread > 0 && <span style={{ width:20, height:20, borderRadius:"50%", background:"#2563eb", color:"#fff", fontSize:11, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{c.unread}</span>}
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, padding:16, borderBottom:"1px solid #e5e7eb" }}>
            <img src={convs[selected].logo} alt="" style={{ width:40, height:40, borderRadius:8, objectFit:"cover" }} />
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:"#1f2937" }}>{convs[selected].name}</div>
              <div style={{ fontSize:12, color:"#6b7280" }}>{convs[selected].subject}</div>
            </div>
          </div>
          <div style={{ flex:1, padding:16, display:"flex", flexDirection:"column", gap:14 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ display:"flex", justifyContent:m.from==="me"?"flex-end":"flex-start" }}>
                <div style={{ maxWidth:"70%" }}>
                  <div style={{ padding:"12px 16px", borderRadius:12, fontSize:14, background:m.from==="me"?"#2563eb":"#f3f4f6", color:m.from==="me"?"#fff":"#1f2937" }}>{m.text}</div>
                  <span style={{ fontSize:11, color:"#9ca3af", marginTop:4, display:"block", textAlign:m.from==="me"?"right":"left" }}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding:16, borderTop:"1px solid #e5e7eb", display:"flex", gap:12 }}>
            <textarea placeholder="Type your message..." rows={2} style={{ flex:1, padding:"10px 14px", border:"1px solid #e5e7eb", borderRadius:8, fontSize:14, resize:"none", outline:"none" }} />
            <button style={{ padding:"12px 20px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:14, alignSelf:"flex-end" }}>
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
