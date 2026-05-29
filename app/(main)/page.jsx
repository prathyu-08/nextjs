'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

const companies = [
  { name:"Multimedia Design", location:"United States of America", openJobs:5, logo:`${IMG}/employers/emplogo1.jpg` },
  { name:"Power Wave", location:"United States of America", openJobs:2, logo:`${IMG}/employers/emplogo2.jpg` },
  { name:"Travel Advisor", location:"United States of America", openJobs:0, logo:`${IMG}/employers/emplogo3.jpg` },
  { name:"New Design Studio", location:"United States of America", openJobs:1, logo:`${IMG}/employers/emplogo4.jpg` },
  { name:"Net Design", location:"United States of America", openJobs:1, logo:`${IMG}/employers/emplogo5.jpg` },
  { name:"Power Color", location:"United States of America", openJobs:2, logo:`${IMG}/employers/emplogo6.jpg` },
  { name:"Connect People", location:"United States of America", openJobs:2, logo:`${IMG}/employers/emplogo7.jpg` },
  { name:"Surf Wave", location:"United States of America", openJobs:1, logo:`${IMG}/employers/emplogo8.jpg` },
];

const categories = [
  { name:"Business Management", jobs:2, image:`${IMG}/categories/business-management.png` },
  { name:"Information Technology", jobs:1, image:`${IMG}/categories/it.png` },
  { name:"Software & Web Development", jobs:1, image:`${IMG}/categories/developer.png` },
  { name:"Electronics Technician", jobs:1, image:`${IMG}/categories/electrician.png` },
];

const industries = [
  { name:"Manufacturing (5)", icon:"fa-industry" },
  { name:"Fashion (2)", icon:"fa-female" },
  { name:"Electronics (2)", icon:"fa-plug" },
  { name:"Advertising/PR (2)", icon:"fa-bullhorn" },
  { name:"Information Technology (2)", icon:"fa-desktop" },
  { name:"Courier/Logistics (1)", icon:"fa-truck" },
  { name:"Automobile (1)", icon:"fa-car" },
  { name:"Education/Training (1)", icon:"fa-graduation-cap" },
  { name:"Banking/Financial Services (1)", icon:"fa-university" },
  { name:"Health & Fitness (1)", icon:"fa-heartbeat" },
];

const featuredJobs = [
  { type:"Full Time/Permanent", title:"Full Stack Designer", company:"Connect People", location:"Barrington", posted:"Mar 07, 2025", logo:`${IMG}/employers/emplogo7.jpg` },
  { type:"Part Time", title:"Marketing Specialist", company:"Power Wave", location:"New York", posted:"Mar 10, 2025", logo:`${IMG}/employers/emplogo2.jpg` },
  { type:"Freelance", title:"UI Engineer", company:"Design Studio", location:"Los Angeles", posted:"Mar 12, 2025", logo:`${IMG}/employers/emplogo4.jpg` },
  { type:"Contract", title:"Data Analyst", company:"Sphere Tech", location:"Chicago", posted:"Mar 15, 2025", logo:`${IMG}/employers/emplogo9.jpg` },
];

const latestJobs = [
  { type:"Full Time", title:"Technical Database Engineer", company:"Datebase Mgmt Co", location:"New York", posted:"Mar 07, 2025", logo:`${IMG}/employers/emplogo1.jpg` },
  { type:"Freelance", title:"Front-end Developer", company:"Creative Studio", location:"Boston", posted:"Mar 05, 2025", logo:`${IMG}/employers/emplogo11.jpg` },
  { type:"Part Time", title:"Product Designer", company:"Bright Agency", location:"Chicago", posted:"Mar 04, 2025", logo:`${IMG}/employers/emplogo12.jpg` },
  { type:"Freelance", title:"Mobile Developer", company:"Appify Labs", location:"Remote", posted:"Mar 02, 2025", logo:`${IMG}/employers/emplogo13.jpg` },
  { type:"Full Time", title:"Senior UX Researcher", company:"Insights Co.", location:"San Francisco", posted:"Feb 28, 2025", logo:`${IMG}/employers/emplogo14.jpg` },
  { type:"Full Time", title:"Systems Administrator", company:"Sphere Networks", location:"Austin", posted:"Feb 26, 2025", logo:`${IMG}/employers/emplogo15.jpg` },
];

const cities = [
  { name:"Atlanta", jobs:18, image:`${IMG}/cities/atlanta.jpg` },
  { name:"Barrington", jobs:9, image:`${IMG}/cities/barrington.jpg` },
  { name:"Durant", jobs:12, image:`${IMG}/cities/durant.jpg` },
  { name:"Bessemer", jobs:6, image:`${IMG}/cities/bessemer.jpg` },
];

const testimonials = [
  { name:"Samantha Lee", role:"Product Designer, Bright Labs", text:"JobsPortal helped me land my dream role within weeks. The process was seamless.", avatar:`${IMG}/testimonials/user1.jpg` },
  { name:"Michael Robinson", role:"HR Manager, SphereTech", text:"We found top talent faster than ever before. The platform makes managing applicants incredibly simple.", avatar:`${IMG}/testimonials/user2.jpg` },
  { name:"Priya Patel", role:"Software Engineer, Connect People", text:"I appreciate the curated job recommendations and the ability to connect directly with companies.", avatar:`${IMG}/testimonials/user3.jpg` },
  { name:"Liam Carter", role:"Founder, Appify Labs", text:"We scaled our hiring pipeline dramatically thanks to JobsPortal's reach and user-friendly tools.", avatar:`${IMG}/testimonials/user4.jpg` },
];

const blogs = [
  { title:"How to design a candidate experience that actually converts", category:"Hiring", date:"17 Sep", author:"Samira Hodge", excerpt:"From first touch to offer, here's the messaging stack we use to keep talent engaged.", image:`${IMG}/blog/1.jpg` },
  { title:"7 rituals our leadership team uses to stay aligned remotely", category:"Leadership", date:"15 Sep", author:"Devon Marks", excerpt:"Weekly dashboards, async standups, and lightweight rituals that keep strategic bets on track.", image:`${IMG}/blog/2.jpg` },
  { title:"Inside the onboarding sprint that ramps new hires in 10 days", category:"Culture", date:"12 Sep", author:"Lily Ortega", excerpt:"A look at how we bundle product education, values training, and buddy systems into a journey.", image:`${IMG}/blog/3.jpg` },
];

const badgeColors = { "Full Time":"#dcfce7|#166534", "Freelance":"#fef3c7|#92400e", "Part Time":"#dbeafe|#1e40af", "Contract":"#e0e7ff|#3730a3", "Internship":"#fce7f3|#9d174d", "Remote":"#ede9fe|#5b21b6", "Full Time/Permanent":"#dcfce7|#166534" };

function JobBadge({ type }) {
  const [bg, color] = (badgeColors[type]||"#f3f4f6|#374151").split("|");
  return <span className={styles.jobBadge} style={{ background: bg, color }}>{type}</span>;
}

export default function HomePage() {
  const router = useRouter();
  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.heroEyebrow}>Ready to Find Your Dream Job?</span>
              <h1 className={styles.heroTitle}>Take the next step in your career journey.</h1>
              <p className={styles.heroSubtitle}>Explore opportunities that match your skills and passions, and land the job you've always wanted with JobsPortal.</p>
              <div className={styles.searchBox}>
                <div className={styles.searchRow}>
                  <label className={styles.searchField}>
                    <i className={`fa fa-search ${styles.searchIcon}`}/>
                    <input type="text" placeholder="Enter skills or job title" className={styles.searchInput}/>
                  </label>
                  <label className={styles.searchField}>
                    <i className={`fa fa-map-marker ${styles.searchIcon}`}/>
                    <select className={styles.searchInput}>
                      <option>Select Category</option>
                      <option>Marketing</option>
                      <option>Design</option>
                      <option>Development</option>
                    </select>
                  </label>
                  <button className={styles.searchBtn}>
                    <i className="fa fa-search"/>
                  </button>
                </div>
              </div>
              <div className={styles.heroActions}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>50k+</span>
                  <span className={styles.heroStatLabel}>Active Jobs</span>
                </div>
                <div className={styles.heroLinks}>
                  <a onClick={()=>router.push("/employer/post-job")} className={styles.heroLink}>
                    <i className={`fa fa-briefcase ${styles.heroLinkIcon}`}/> Post Your Job
                  </a>
                  <a onClick={()=>router.push("/jobs")} className={styles.heroLink}>
                    <i className={`fa fa-user-o ${styles.heroLinkIcon}`}/> Search Jobs
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.heroImageWrap}>
              <img src={`${IMG}/hero-image.png`} alt="Find a perfect job" className={styles.heroImage}/>
              <div className={styles.heroFloatCard}>
                <span className={styles.heroFloatLabel}>Find a Perfect Job</span>
                <button className={styles.heroFloatBtn}>Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <div className={styles.infoWrap}>
        <div className="container">
          <div className={styles.infoGrid}>
            <a onClick={()=>router.push("/jobs")} className={`${styles.infoCard} ${styles.infoCardBlue}`}>
              <h3 className={styles.infoTitle}>Search your desired Job</h3>
              <p className={styles.infoText}>Discover a career you are passionate about</p>
              <img src={`${IMG}/icons/search-job-icon.png`} alt="" className={styles.infoIcon}/>
            </a>
            <a onClick={()=>router.push("/employer/post-job")} className={`${styles.infoCard} ${styles.infoCardGreen}`}>
              <h3 className={styles.infoTitle}>Post a Job Today</h3>
              <p className={styles.infoText}>Discover the ideal candidate for your team</p>
              <img src={`${IMG}/icons/postjob.png`} alt="" className={styles.infoIcon}/>
            </a>
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Here You Can See</div>
            <h3 className={styles.sectionTitle}>Top Companies are Hiring</h3>
          </div>
          <div className={styles.companiesGrid}>
            {companies.map((c, i) => (
              <a key={i} onClick={()=>router.push("/employer/single")} className={styles.companyCard}>
                <div className={styles.companyLogo}>
                  <img src={c.logo} alt={c.name} className={styles.companyLogoImg}/>
                </div>
                <h5 className={styles.companyName}>{c.name}</h5>
                <div className={styles.companyLoc}><i className={`fa fa-map-marker ${styles.companyLocIcon}`}/>{c.location}</div>
                <div className={styles.companyJobs}>
                  <i className={`fa fa-briefcase ${styles.companyJobsIcon}`}/>{c.openJobs} Open Jobs
                </div>
              </a>
            ))}
          </div>
          <div className={styles.viewAllWrap}>
            <button onClick={()=>router.push("/employer/list")} className={`${styles.pillBtn} ${styles.pillBtnShadow}`}>View All Featured Companies</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`section ${styles.bgGray}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Find Your Path</div>
            <h3 className={styles.sectionTitle}>Browse Jobs By Categories</h3>
          </div>
          <div className={styles.catGrid}>
            {categories.map((cat, i) => (
              <a key={i} className={styles.catCard}>
                <div className={styles.catIconWrap}>
                  <img src={cat.image} alt={cat.name} className={styles.catIconImg}/>
                </div>
                <h5 className={styles.catName}>{cat.name}</h5>
                <div className={styles.catCount}><i className={`fa fa-briefcase ${styles.latestMetaIcon}`}/>({cat.jobs}) Jobs</div>
              </a>
            ))}
          </div>
          <div className={styles.viewAllWrap}>
            <button className={styles.pillBtn}>View All Categories</button>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className={`section ${styles.bgWhite}`}>
        <div className="container">
          <div className={styles.industriesHead}>
            <div className={styles.eyebrow}>Explore Sectors</div>
            <h3 className={styles.sectionTitle}>Popular Industries</h3>
          </div>
          <div className={styles.industryList}>
            {industries.map((ind, i) => (
              <a key={i} className={styles.industryPill}>
                <span className={styles.industryPillIcon}>
                  <i className={`fa ${ind.icon}`}/>
                </span>
                {ind.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`section ${styles.bgGray}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Simple Steps</div>
            <h3 className={styles.sectionTitle}>How It Works</h3>
          </div>
          <div className={styles.howGrid}>
            {[
              { icon:"fa-user-plus", title:"Create An Account", desc:"It's very easy to open an account and start your journey." },
              { icon:"fa-file", title:"Complete your profile", desc:"Share all the key details so employers can get to know you." },
              { icon:"fa-paper-plane", title:"Apply job or hire", desc:"Apply to your preferred jobs or hire top talent effortlessly." },
            ].map((step, i) => (
              <div key={i} className={styles.howCard}>
                <div className={styles.howIcon}>
                  <i className={`fa-solid ${step.icon}`}/>
                </div>
                <h4 className={styles.howTitle}>{step.title}</h4>
                <p className={styles.howDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeadLeft}>
            <div className={styles.eyebrow}>Here You Can See</div>
            <h3 className={styles.sectionTitle}>Featured <span className={styles.titleAccent}>Jobs</span></h3>
          </div>
          <div className={styles.featuredGrid}>
            {featuredJobs.map((job, i) => (
              <div key={i} className={styles.featuredCard}>
                <div className={styles.featuredTypeWrap}>
                  <span className={styles.featuredType}>
                    <i className="fa fa-briefcase"/>
                    {job.type}
                  </span>
                </div>
                <h4 className={styles.featuredTitle}>
                  <a onClick={()=>router.push("/jobs")} className={styles.featuredLink}>{job.title}</a>
                </h4>
                <div className={styles.featuredLoc}><i className={`fa fa-map-marker ${styles.featuredLocIcon}`}/>{job.location}</div>
                <div className={styles.featuredFoot}>
                  <div>
                    <div className={styles.featuredDate}>{job.posted}</div>
                    <div className={styles.featuredCompany}>{job.company}</div>
                  </div>
                  <img src={job.logo} alt={job.company} className={styles.featuredLogo}/>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.viewAllWrap}>
            <button onClick={()=>router.push("/jobs")} className={styles.pillBtn}>View All Featured Jobs</button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.videoGrid}>
            <div>
              <span className={styles.videoBadge}>Here You Can See</span>
              <h2 className={styles.videoHeading}>Watch Our <span className={styles.videoHeadingAccent}>Video</span></h2>
              <p className={styles.videoText}>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.</p>
              <ul className={styles.videoList}>
                {["Learn about our platform","Discover success stories","See how it works"].map((item, i) => (
                  <li key={i} className={styles.videoListItem}>
                    <i className={`fa fa-check-circle ${styles.videoCheck}`}/>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.videoMedia}>
              <img src={`${IMG}/video-thumbnail.jpg`} alt="Video" className={styles.videoImg}/>
              <div className={styles.videoOverlay}/>
              <button className={styles.videoPlayBtn}>
                <span className={styles.videoPlayInner}>
                  <i className={`fa fa-play ${styles.videoPlayIcon}`}/>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className={`section ${styles.bgGray}`}>
        <div className="container">
          <div className={styles.sectionHeadLeft}>
            <div className={styles.eyebrow}>Here You Can See</div>
            <h3 className={styles.sectionTitle}>Latest <span className={styles.titleAccent}>Jobs</span></h3>
          </div>
          <div className={styles.latestGrid}>
            {latestJobs.map((job, i) => (
              <div key={i} className={styles.latestCard}>
                <div className={styles.latestHead}>
                  <JobBadge type={job.type}/>
                  <a className={styles.latestFav}>♡</a>
                </div>
                <h4 className={styles.latestTitle}>
                  <a onClick={()=>router.push("/jobs")} className={styles.latestTitleLink}>{job.title}</a>
                </h4>
                <div className={styles.latestMeta}>
                  <span><i className={`fa fa-building ${styles.latestMetaIcon}`}/>{job.company}</span>
                  <span><i className={`fa fa-map-marker ${styles.latestMetaIcon}`}/>{job.location}</span>
                </div>
                <div className={styles.latestFoot}>
                  <div className={styles.latestFootLeft}>
                    <img src={job.logo} alt="" className={styles.latestLogo}/>
                    <div>
                      <div className={styles.latestPosted}>Posted on</div>
                      <div className={styles.latestPostedDate}>{job.posted}</div>
                    </div>
                  </div>
                  <button onClick={()=>router.push("/jobs")} className={styles.latestApplyBtn}>Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Choose Your Location</div>
            <h3 className={styles.sectionTitle}>Jobs by Cities</h3>
          </div>
          <div className={styles.citiesGrid}>
            {cities.map((city, i) => (
              <a key={i} className={styles.cityCard}>
                <img src={city.image} alt={city.name} className={styles.cityImg}/>
                <div className={styles.cityOverlay}>
                  <span className={styles.cityName}>{city.name}</span>
                  <span className={styles.cityJobs}>{city.jobs} Jobs</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.bgGray}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Stories from our community</div>
            <h3 className={styles.sectionTitle}>Success Stories</h3>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <img src={t.avatar} alt={t.name} className={styles.testimonialAvatar}/>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className={styles.appSection}>
        <div className="container">
          <div className={styles.appGrid}>
            <div>
              <h2 className={styles.appTitle}>The JobsPortal APP</h2>
              <p className={styles.appSubtitle}>A world of opportunity in your hand</p>
              <p className={styles.appText}>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.</p>
              <div className={styles.appBtns}>
                <img src={`${IMG}/apple-btn.png`} alt="Apple Store" className={styles.appBtn}/>
                <img src={`${IMG}/andriod-btn.png`} alt="Google Play" className={styles.appBtn}/>
              </div>
            </div>
            <div><img src={`${IMG}/app-screens.png`} alt="App Screens" className={styles.appScreens}/></div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className={`section ${styles.bgWhite}`}>
        <div className={`container ${styles.subscribeWrap}`}>
          <div className={styles.eyebrow}>Stay in the loop</div>
          <h3 className={styles.subscribeHeading}>Subscribe To Our Newsletter</h3>
          <p className={styles.subscribeText}>Get the latest jobs, hiring trends, and tips delivered directly to your inbox.</p>
          <div className={styles.subscribeBox}>
            <div className={styles.subscribeRow}>
              <input type="email" placeholder="Enter your email" className={styles.subscribeInput}/>
              <button className={styles.subscribeBtn}>Subscribe</button>
            </div>
            <p className={styles.subscribeNote}>We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className={`section ${styles.bgGray}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.eyebrow}>Our Blog</div>
            <h3 className={styles.sectionTitle}>Latest <span className={styles.titleAccent}>Blog Posts</span></h3>
          </div>
          <div className={styles.blogGrid}>
            {blogs.map((blog, i) => (
              <div key={i} className={styles.blogCard}>
                <div className={styles.blogMedia}>
                  <img src={blog.image} alt={blog.title} className={styles.blogImg}/>
                  <span className={styles.blogCategory}>{blog.category}</span>
                </div>
                <div className={styles.blogBody}>
                  <div className={styles.blogMeta}>
                    <span className={styles.blogMetaDate}><i className={`fa fa-calendar ${styles.blogMetaIcon}`}/>{blog.date}</span>
                    <span><i className={`fa fa-user ${styles.blogMetaIcon}`}/>{blog.author}</span>
                  </div>
                  <h5 className={styles.blogTitle}><a href="#" className={styles.blogTitleLink}>{blog.title}</a></h5>
                  <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                  <button className={styles.blogBtn}>Read article</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
