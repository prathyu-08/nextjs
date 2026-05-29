'use client';
import { Shell } from "./_shared";
import styles from "./PackagesPage.module.css";

export default function PackagesPage() {
  const plans = [
    { name:"Free", price:0, desc:"Get started with basic job searching.", features:["5 job applications/month","Basic profile","Job search access","Email alerts"], popular:false, current:false },
    { name:"Basic", price:10, desc:"Perfect for active job seekers.", features:["20 job applications/month","Full profile","Priority in search","Job alerts","Resume download"], popular:false, current:true },
    { name:"Pro", price:29, desc:"Unlock everything for serious seekers.", features:["Unlimited applications","Featured profile","Top search placement","AI job matching","Interview prep tools","Dedicated support"], popular:true, current:false },
  ];
  return (
    <Shell path="/candidate/packages" title="Packages" subtitle="Choose the plan that fits your job search">
      {/* Current plan */}
      <div className={styles.currentPlan}>
        <div className={styles.activeChip}>Active</div>
        <h3 className={styles.currentTitle}>Basic Jobs View</h3>
        <p className={styles.currentSub}>Your current plan — renews Dec 31, 2025</p>
        <div className={styles.currentGrid}>
          {[["Package","Basic Jobs View"],["Price","USD 10"],["Applications","02 / 20"],["Started","N/A"],["Expires","31 Dec, 2025"]].map(([label,val],i) => (
            <div key={i} className={styles.currentCell}>
              <div className={styles.currentCellLabel}>{label}</div>
              <div className={styles.currentCellValue}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan grid */}
      <div className={styles.plansGrid}>
        {plans.map((plan,i) => (
          <div key={i} className={`${styles.plan} ${plan.popular ? styles.planPopular : ""} ${plan.current ? styles.planCurrent : ""}`}>
            {plan.popular && <div className={`${styles.ribbon} ${styles.ribbonPopular}`}>Most Popular</div>}
            {plan.current && <div className={`${styles.ribbon} ${styles.ribbonCurrent}`}>Current Plan</div>}
            <h3 className={styles.planName}>{plan.name}</h3>
            <div className={styles.priceRow}>
              <span className={styles.priceCurrency}>$</span>
              <span className={styles.priceValue}>{plan.price}</span>
              <span className={styles.pricePer}>/month</span>
            </div>
            <p className={styles.planDesc}>{plan.desc}</p>
            <ul className={styles.features}>
              {plan.features.map((f,j) => (
                <li key={j} className={styles.feature}>
                  <i className={`fa-solid fa-check ${styles.featureIcon}`} />{f}
                </li>
              ))}
            </ul>
            <button className={`${styles.planBtn} ${plan.popular ? styles.planBtnPopular : plan.current ? styles.planBtnCurrent : ""}`}>
              {plan.current ? "Current Plan" : plan.popular ? "Upgrade Now" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </Shell>
  );
}
