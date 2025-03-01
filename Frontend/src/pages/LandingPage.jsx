import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <img src="/src/assets/sparkicon.png" alt="Spark Marketplace" />
            <p>SPARKTM | Marketplace</p>
          </div>
        </div>
        <div className="navbtn">
          <button className="sign-up-btn" onClick={() => navigate('/signup')}>
            Sign up free
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>The easiest place to update and share your Connection</h1>
            <p>
              Help your followers discover everything you're sharing all over
              the internet, in one simple place. They'll thank you for it.
            </p>
            <button className="cta-button" onClick={() => navigate('/signup')}>
              Get your free Spark
            </button>
          </div>
          <div className="hero-image">
            <img
              src="/src/assets/Analytics.png"
              alt="Dashboard"
              className="dashboard-img"
            />
          </div>
        </section>

        <section className="features">
          <div className="feature-card monetization">
            <div className="pricing-tiers">
              <img src="/src/assets/pic1.png" alt="Pricing Tiers" className="pricing-img" />
            </div>
            <h2>Sell products and collect payments. It's monetization made simple.</h2>
          </div>

          <div className="feature-card analytics">
            <div className="analytics-content">
              <h2>Analyze your audience and keep your followers engaged</h2>
              <p>Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.</p>
            </div>
          </div>

          <div className="feature-card sharing">
            <div className="sharing-content">
              <h2>Share limitless content in limitless ways</h2>
              <p>Connect your content in all its forms and help followers find more of what they're looking for. Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts, and more, it all comes together in one powerful place.</p>
            </div>
            <div className="sharing-demo">
              <div className="demo-grid">
                <img src="/src/assets/pic2.png" alt="Content Sharing" className="sharing-img" />
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>Here's what our <span className="highlight">customer</span> has to say</h2>
          <button className="testimonial-btn">Read customer stories</button>
          <div className="testimonial-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="testimonial-card">
                <h3>Amazing tool! Saved me months</h3>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <p>John Master</p>
                    <p>Director, Spark.com</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="integrations">
          <h2>All Link Apps and Integrations</h2>
          <div className="integration-grid">
            {[
              { src: "icon2.png", title: "Audiomack", desc: "Add an Audiomack player to your Linktree" },
              { src: "icon3.png", title: "Bandsintown", desc: "Drive ticket sales by listing your events" },
              { src: "icon4.png", title: "Bonfire", desc: "Display and sell your custom merch" },
              { src: "icon5.png", title: "Books", desc: "Feature books on your Linktree" },
              { src: "icon6.png", title: "Buy Me A Gift", desc: "Let supporters support you with a small gift" },
              { src: "icon7.png", title: "Cameo", desc: "Make impossible fan connections possible" },
              { src: "icon8.png", title: "Clubhouse", desc: "Let your community in on the conversation" },
              { src: "icon9.png", title: "Community", desc: "Build an SMS subscriber list" },
              { src: "icon10.png", title: "Contact Details", desc: "Easily share downloadable contact details" },
            ].map((item, index) => (
              <div key={index} className="integration-item">
                <img src={`/src/assets/${item.src}`} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-cta">
            <button className="login-btn" onClick={() => navigate('/login')}>
              Log in
            </button>
            <button className="signup-btn" onClick={() => navigate('/signup')}>
              Sign up free
            </button>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>About Spark</h4>
              <a href="#">Blog</a>
              <a href="#">Press</a>
              <a href="#">Social Good</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href="#">Getting Started</a>
              <a href="#">Features</a>
              <a href="#">FAQs</a>
              <a href="#">Help</a>
            </div>
            <div className="footer-column">
              <h4>Terms and Conditions</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Notice</a>
              <a href="#">Trust Center</a>
            </div>
          </div>
          <div className="footer-social">
            {["f1.png", "f2.png", "f3.png", "f4.png", "f5.png"].map((img, i) => (
              <a key={i} href="#"><img src={`/src/assets/${img}`} alt={`Social ${i}`} /></a>
            ))}
          </div>
          <p className="footer-disclaimer">
            We acknowledge the Traditional Custodians of the land on which our office stands, the Wurundjeri people of the Kulin Nation, and pay our respects to their past, present, and emerging.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
