
const About = () => {
  const skills = [
    { name: "Charcoal Drawing", level: 95 },
    { name: "Pencil Sketching", level: 90 },
    { name: "Portrait Art", level: 98 },
    { name: "Digital Art", level: 85 }
  ];

  const tools = [
    { name: "Graphite Pencils", icon: "✏️" },
    { name: "Charcoal Sticks", icon: "🖌️" },
    { name: "Blending Stumps", icon: "🎨" },
    { name: "Quality Paper", icon: "📄" },
    { name: "Digital Tablet", icon: "💻" },
    { name: "Professional Scanner", icon: "🖨️" }
  ];

  const achievements = [
    { number: "500+", label: "Happy Clients" },
    { number: "1000+", label: "Sketches Created" },
    { number: "5+", label: "Years Experience" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-grid">
            <div className="hero-text fade-in-up">
              <h1>About the Artist</h1>
              <p className="lead">
                Hello! I'm a passionate sketch artist dedicated to capturing the essence 
                of life's most precious moments through the timeless art of drawing.
              </p>
              <p>
                With over 5 years of experience in portrait art, I specialize in creating 
                personalized sketches that tell your unique story. Each piece is crafted 
                with meticulous attention to detail, ensuring that every emotion and 
                memory is preserved forever.
              </p>
            </div>
            <div className="hero-image slide-in-right">
              <img 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop" 
                alt="Artist at work"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section section">
          <div className="text-center fade-in-up">
            <h2>My Skills</h2>
            <p>Mastery through years of dedication and continuous learning</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-item scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools & Materials */}
        <section className="tools-section section">
          <div className="text-center fade-in-up">
            <h2>Tools & Materials</h2>
            <p>Professional grade materials for exceptional results</p>
          </div>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div 
                key={tool.name} 
                className="tool-card hover-lift scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tool-icon">{tool.icon}</div>
                <h3>{tool.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="achievements-section section">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.label} 
                className="achievement-card text-center scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section section">
          <div className="text-center fade-in-up">
            <h2>My Creative Process</h2>
            <p>From concept to completion, every step is carefully crafted</p>
          </div>
          <div className="process-steps">
            <div className="step slide-in-left">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Consultation</h3>
                <p>We discuss your vision, preferences, and requirements to ensure the perfect outcome.</p>
              </div>
            </div>
            <div className="step slide-in-right">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Sketching</h3>
                <p>Initial rough sketches are created to establish composition and proportions.</p>
              </div>
            </div>
            <div className="step slide-in-left">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Refinement</h3>
                <p>Details are added, shading is perfected, and the artwork comes to life.</p>
              </div>
            </div>
            <div className="step slide-in-right">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Delivery</h3>
                <p>Your completed artwork is carefully packaged and delivered to your doorstep.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content fade-in-up">
            <h2>Ready to Create Something Beautiful?</h2>
            <p>Let's bring your vision to life with a personalized sketch</p>
            <a href="/commission" className="btn btn-primary">Start Your Commission</a>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          padding-top: 100px;
          min-height: 100vh;
        }

        .about-hero {
          margin-bottom: 4rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .lead {
          font-size: 1.3rem;
          font-weight: 600;
          color: #34495e;
          margin-bottom: 1.5rem;
        }

        .hero-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .hero-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .skills-section {
          background: #f8f9fa;
          border-radius: 20px;
          padding: 4rem 2rem;
        }

        .skills-grid {
          max-width: 600px;
          margin: 0 auto;
        }

        .skill-item {
          margin-bottom: 2rem;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .skill-name {
          font-weight: 600;
          color: #34495e;
        }

        .skill-percentage {
          font-weight: 600;
          color: #667eea;
        }

        .skill-bar {
          height: 8px;
          background: #e1e8ed;
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          transition: width 2s ease-in-out;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .tool-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .tool-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .tool-card h3 {
          margin: 0;
          color: #34495e;
          font-size: 1.1rem;
        }

        .achievements-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 4rem 2rem;
          color: white;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .achievement-card {
          padding: 2rem;
        }

        .achievement-number {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .achievement-label {
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0.9;
        }

        .process-steps {
          max-width: 800px;
          margin: 0 auto;
        }

        .step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
          align-items: center;
        }

        .step-number {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
        }

        .step-content h3 {
          margin-bottom: 0.5rem;
          color: #34495e;
        }

        .step-content p {
          margin: 0;
          color: #5a6c7d;
        }

        .cta-section {
          text-align: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 20px;
          margin: 2rem 0;
        }

        .cta-content h2 {
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .cta-content p {
          font-size: 1.1rem;
          color: #5a6c7d;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .about-page {
            padding-top: 80px;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-text h1 {
            font-size: 2.5rem;
          }

          .hero-image {
            order: -1;
          }

          .hero-image img {
            height: 300px;
          }

          .skills-section,
          .achievements-section {
            padding: 3rem 1rem;
          }

          .step {
            grid-template-columns: 60px 1fr;
            gap: 1rem;
          }

          .step-number {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }

          .achievement-number {
            font-size: 2rem;
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
