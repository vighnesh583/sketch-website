
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredWorks = [
    {
      id: 1,
      title: "Portrait Sketch",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      category: "Portrait"
    },
    {
      id: 2,
      title: "Wedding Moment",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "Wedding"
    },
    {
      id: 3,
      title: "Family Portrait",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      category: "Family"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The portrait sketch of my daughter was absolutely beautiful. Every detail was perfect!",
      rating: 5
    },
    {
      name: "Mike Chen",
      text: "Amazing work on our wedding sketch. It captured the emotion of our special day perfectly.",
      rating: 5
    },
    {
      name: "Emily Davis",
      text: "Professional service and incredible artistry. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-text fade-in-up">
                <h1>Transform Your Memories Into Beautiful Sketches</h1>
                <p>
                  Professional sketch artist creating personalized portraits, wedding moments, 
                  and family memories with exceptional detail and artistic flair.
                </p>
                <div className="hero-buttons">
                  <Link to="/gallery" className="btn btn-primary">View Gallery</Link>
                  <Link to="/commission" className="btn btn-secondary">Commission Now</Link>
                </div>
              </div>
              <div className="hero-image slide-in-right">
                <div className="image-slider">
                  {heroImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Featured artwork ${index + 1}`}
                      className={index === currentImageIndex ? "active" : ""}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="section">
        <div className="container">
          <div className="text-center fade-in-up">
            <h2>Featured Works</h2>
            <p>Discover some of our most beloved creations</p>
          </div>
          <div className="grid grid-3">
            {featuredWorks.map((work, index) => (
              <div 
                key={work.id} 
                className="featured-work scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="image-container">
                  <img src={work.image} alt={work.title} />
                  <div className="overlay">
                    <h3>{work.title}</h3>
                    <p>{work.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/gallery" className="btn btn-primary">View All Works</Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section services-preview">
        <div className="container">
          <div className="services-grid">
            <div className="services-text slide-in-left">
              <h2>Our Services</h2>
              <p>
                From intimate portraits to grand wedding celebrations, we capture 
                your most precious moments with artistic precision and emotional depth.
              </p>
              <ul className="services-list">
                <li>✨ Single & Double Portraits</li>
                <li>💑 Wedding & Couple Sketches</li>
                <li>👨‍👩‍👧‍👦 Family Portraits</li>
                <li>🎨 Custom Commissions</li>
              </ul>
              <Link to="/services" className="btn btn-primary">Learn More</Link>
            </div>
            <div className="services-image slide-in-right">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=500&fit=crop" 
                alt="Artist at work"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="container">
          <div className="text-center fade-in-up">
            <h2>What Our Clients Say</h2>
            <p>Don't just take our word for it</p>
          </div>
          <div className="grid grid-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p>"{testimonial.text}"</p>
                <h4>- {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text h1 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-text p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #5a6c7d;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .image-slider {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          height: 500px;
        }

        .image-slider img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .image-slider img.active {
          opacity: 1;
        }

        .featured-work {
          position: relative;
        }

        .featured-work .image-container {
          position: relative;
          height: 300px;
          border-radius: 15px;
          overflow: hidden;
        }

        .featured-work .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 2rem;
          transform: translateY(50%);
          transition: transform 0.3s ease;
        }

        .featured-work:hover .overlay {
          transform: translateY(0);
        }

        .featured-work .overlay h3 {
          margin: 0 0 0.5rem 0;
          color: white;
        }

        .featured-work .overlay p {
          margin: 0;
          color: #ecf0f1;
        }

        .services-preview {
          background: white;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .services-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
        }

        .services-list li {
          padding: 0.75rem 0;
          font-size: 1.1rem;
          color: #5a6c7d;
        }

        .services-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .testimonials {
          background: #f8f9fa;
        }

        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
        }

        .stars {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .testimonial-card p {
          font-style: italic;
          margin-bottom: 1rem;
          color: #5a6c7d;
        }

        .testimonial-card h4 {
          margin: 0;
          color: #34495e;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .hero-grid,
          .services-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-text h1 {
            font-size: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .image-slider {
            height: 300px;
          }

          .services-image {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;
