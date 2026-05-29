'use client';
import { useState } from "react";
import { Shell, IMG } from "./_shared";
import styles from "./MyMessagesPage.module.css";

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
      <div className={styles.shell}>
        {/* Conversation list */}
        <div className={styles.convList}>
          <div className={styles.searchBar}>
            <i className={`fa-solid fa-search ${styles.searchIcon}`} />
            <input placeholder="Search messages..." className={styles.searchInput} />
          </div>
          {convs.map((c,i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={`${styles.convItem} ${selected === i ? styles.convItemActive : ""}`}
            >
              <img src={c.logo} alt={c.name} className={styles.convLogo} />
              <div className={styles.convBody}>
                <div className={styles.convHead}>
                  <span className={styles.convName}>{c.name}</span>
                  <span className={styles.convTime}>{c.time}</span>
                </div>
                <div className={styles.convSubject}>{c.subject}</div>
                <div className={styles.convPreview}>{c.preview}</div>
              </div>
              {c.unread > 0 && <span className={styles.unreadBadge}>{c.unread}</span>}
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div className={styles.chatPane}>
          <div className={styles.chatHeader}>
            <img src={convs[selected].logo} alt="" className={styles.chatAvatar} />
            <div>
              <div className={styles.chatName}>{convs[selected].name}</div>
              <div className={styles.chatSubject}>{convs[selected].subject}</div>
            </div>
          </div>
          <div className={styles.messages}>
            {messages.map((m,i) => {
              const isMe = m.from === "me";
              return (
                <div key={i} className={`${styles.msgRow} ${isMe ? styles.msgRowMe : styles.msgRowCompany}`}>
                  <div className={styles.msgWrap}>
                    <div className={`${styles.msgBubble} ${isMe ? styles.msgBubbleMe : styles.msgBubbleCompany}`}>{m.text}</div>
                    <span className={`${styles.msgTime} ${isMe ? styles.msgTimeMe : styles.msgTimeCompany}`}>{m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.composer}>
            <textarea placeholder="Type your message..." rows={2} className={styles.composerInput} />
            <button className={styles.sendBtn}>
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
