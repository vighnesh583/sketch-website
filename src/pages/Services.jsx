import { Link } from 'react-router-dom';
const Services = () => {
  const services = [
    {
      id: 1,
      title: "Single Portrait",
      description: "Beautiful individual portraits capturing personality and character",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      basePrice: "₹800",
      features: [
        "High-quality charcoal or pencil sketch",
        "Multiple size options available",
        "Digital copy included",
        "Express delivery available"
      ],
      popular: false
    },
    {
      id: 2,
      title: "Double Portrait",
      description: "Perfect for couples, siblings, or best friends",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=300&fit=crop",
      basePrice: "₹1,500",
      features: [
        "Two subjects in one composition",
        "Custom background options",
        "Premium paper quality",
        "Revision included"
      ],
      popular: true
    },
    {
      id: 3,
      title: "Wedding Sketch",
      description: "Romantic wedding moments preserved in artistic detail",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      basePrice: "₹2,000(per-person)",
      features: [
        
        "Intricate wedding scene details",
        "Multiple subjects",
        "Elegant composition",
        "Gift packaging included"
      ],
      popular: false
    },
    {
      id: 4,
      title: "Family Portrait",
      description: "Capture the bond of your entire family in one beautiful sketch",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      basePrice: "₹2,500",
      features: [
        "3-4 family members",
        "Custom arrangement",
        "Large format options",
        "Heirloom quality"
      ],
      popular: false
    },
    {
      id: 5,
      title: "Pet Portrait",
      description: "Beloved pets deserving of artistic tribute",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      basePrice: "₹1,200",
      features: [
        "Detailed fur textures",
        "Personality capture",
        "Various poses available",
        "Memorial options"
      ],
      popular: false
    },
    {
      id: 6,
      title: "Custom Commission",
      description: "Special requests and unique artistic visions",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      basePrice: "Contact for quote",
      features: [
        "Completely personalized",
        "Any subject matter",
        "Consultation included",
        "Unique artistic style"
      ],
      popular: false
    }
  ];

  const addOns = [
    {
      name: "Professional Framing",
      price: "₹400",
      description: "High-quality wooden frame with glass protection"
    },
    {
      name: "Express Delivery",
      price: "₹200",
      description: "Rush delivery within 3-5 days"
    },
    {
      name: "Gift Packaging",
      price: "₹150",
      description: "Beautiful presentation box with ribbon"
    },
    {
      name: "Additional Revisions",
      price: "₹300",
      description: "Extra revision beyond the included one"
    }
  ];

  const sizeOptions = [
    { size: "A4 (8.3 x 11.7 inches)", multiplier: "Base Price" },
    { size: "A3 (11.7 x 16.5 inches)", multiplier: "+50%" },
    { size: "Custom Size", multiplier: "Quote on request" }
  ];

  return (
    <div className="services-page">
      <div className="container">
        {/* Header */}
        <section className="services-header">
          <div className="fade-in-up">
            <h1>Our Services</h1>
            <p>Professional sketch artistry tailored to capture your most precious moments</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`service-card ${service.popular ? 'popular' : ''} scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && <div className="popular-badge">Most Popular</div>}
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.basePrice}</div>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <Link to="/commission" className="btn btn-primary">Order Now</Link>
              </div>
            </div>
          ))}
        </section>

        {/* Size Options */}
        <section className="size-section section">
          <div className="text-center fade-in-up">
            <h2 style={{ fontSize: '40px', color: ' #764ba2' }}>Size Options</h2>
            <p>Choose the perfect size for your artwork</p>
          </div>
          <div className="size-options">
            {sizeOptions.map((option, index) => (
              <div 
                key={index} 
                className="size-card hover-lift scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h4>{option.size}</h4>
                <div className="size-multiplier">{option.multiplier}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section className="addons-section section">
          <div className="text-center fade-in-up">
            <h1 style={{ fontSize: '40px', color: '#FF0000' }}>Additional Services</h1>
            <p>Enhance your artwork with our premium add-ons</p>
          </div>
          <div className="addons-grid">
            {addOns.map((addon, index) => (
              <div 
                key={index} 
                className="addon-card hover-lift scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="addon-header">
                  <h4>{addon.name}</h4>
                  <div className="addon-price">{addon.price}</div>
                </div>
                <p>{addon.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Timeline */}
        <section className="timeline-section section">
          <div className="text-center fade-in-up">
            <h2>Our Process</h2>
            <p>From order to delivery, here's what you can expect</p>
          </div>
          <div className="timeline">
            <div className="timeline-item slide-in-left">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <h4>Order Placement</h4>
                <p>Submit your commission form with photos and preferences</p>
                <span className="timeline-duration">Day 1</span>
              </div>
            </div>
            <div className="timeline-item slide-in-right">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <h4>Initial Sketch</h4>
                <p>Rough sketch sent for your approval and feedback</p>
                <span className="timeline-duration">Day 2-3</span>
              </div>
            </div>
            <div className="timeline-item slide-in-left">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <h4>Final Artwork</h4>
                <p>Detailed completion of your personalized sketch</p>
                <span className="timeline-duration">Day 4-7</span>
              </div>
            </div>
            <div className="timeline-item slide-in-right">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <h4>Delivery</h4>
                <p>Secure packaging and shipment to your address</p>
                <span className="timeline-duration">Day 8-10</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content fade-in-up">
            <h2>Ready to Get Started?</h2>
            <p style={{color: 'white'}}>Commission your personalized sketch today and create lasting memories</p>
            <Link to="/commission" className="btn btn-primary">Start Order Now</Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .services-page {
          padding-top: 100px;
          min-height: 100vh;
        }

        .services-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .services-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .services-header p {
          font-size: 1.2rem;
          color: #5a6c7d;
          max-width: 600px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .service-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .service-card.popular {
          border: 2px solid #667eea;
          transform: scale(1.05);
        }

        .popular-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 2;
        }

        .service-image {
          height: 200px;
          overflow: hidden;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .service-card:hover .service-image img {
          transform: scale(1.1);
        }

        .service-content {
          padding: 2rem;
        }

        .service-content h3 {
          margin-bottom: 1rem;
          color: #34495e;
          font-size: 1.5rem;
        }

        .service-description {
          color: #5a6c7d;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .service-price {
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 1.5rem;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .service-features li {
          padding: 0.5rem 0;
          color: #5a6c7d;
          border-bottom: 1px solid #f1f3f4;
        }

        .service-features li:last-child {
          border-bottom: none;
        }

        .size-section {
          background: #f8f9fa;
          border-radius: 20px;
          padding: 4rem 2rem;
        }

        .size-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .size-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .size-card h4 {
          margin-bottom: 1rem;
          color: #34495e;
        }

        .size-multiplier {
          font-size: 1.3rem;
          font-weight: 700;
          color: #667eea;
        }

        .addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .addon-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .addon-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .addon-header h4 {
          margin: 0;
          color: #34495e;
        }

        .addon-price {
          font-weight: 700;
          color: #667eea;
          font-size: 1.2rem;
        }

        .addon-card p {
          margin: 0;
          color: #5a6c7d;
          line-height: 1.6;
        }

        .timeline-section {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 20px;
          padding: 4rem 2rem;
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #667eea;
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-marker {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          position: relative;
          z-index: 2;
          margin: 0 2rem;
        }

        .timeline-content {
          flex: 1;
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .timeline-content h4 {
          margin-bottom: 0.5rem;
          color: #34495e;
        }

        .timeline-content p {
          margin-bottom: 1rem;
          color: #5a6c7d;
        }

        .timeline-duration {
          font-weight: 600;
          color: #667eea;
          font-size: 0.9rem;
        }

        .cta-section {
          text-align: center;
          padding: 4rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          margin: 2rem 0;
          color: white;
        }

        .cta-content h2 {
          margin-bottom: 1rem;
          color: white;
        }

        .cta-content p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-content .btn {
          background: white;
          color: #667eea;
        }

        .cta-content .btn:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .services-page {
            padding-top: 80px;
          }

          .services-header h1 {
            font-size: 2.5rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .service-card.popular {
            transform: none;
          }

          .timeline::before {
            left: 30px;
          }

          .timeline-item,
          .timeline-item:nth-child(even) {
            flex-direction: row;
          }

          .timeline-marker {
            margin: 0 2rem 0 0;
          }

          .addons-grid,
          .size-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
