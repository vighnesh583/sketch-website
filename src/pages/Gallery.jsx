
import { useState, useEffect } from "react";

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [filteredWorks, setFilteredWorks] = useState([]);

  const artworks = [
    {
      id: 1,
      title: "Portrait Study",
      category: "portrait",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
      description: "Detailed charcoal portrait capturing emotion and character"
    },
    {
      id: 2,
      title: "Wedding Bliss",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "Romantic wedding moment in graphite"
    },
    {
      id: 3,
      title: "Family Bond",
      category: "family",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      description: "Heartwarming family portrait"
    },
    {
      id: 4,
      title: "Couple's Love",
      category: "couple",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=500&fit=crop",
      description: "Intimate couple portrait in pencil"
    },
    {
      id: 5,
      title: "Child's Wonder",
      category: "portrait",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=600&fit=crop",
      description: "Innocent childhood captured in sketch"
    },
    {
      id: 6,
      title: "Golden Years",
      category: "portrait",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      description: "Elderly portrait with wisdom and grace"
    },
    {
      id: 7,
      title: "Ceremony Moment",
      category: "wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop",
      description: "Sacred wedding ceremony sketch"
    },
    {
      id: 8,
      title: "Three Generations",
      category: "family",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=600&fit=crop",
      description: "Multi-generational family portrait"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Works' },
    { key: 'portrait', label: 'Portraits' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'family', label: 'Family' },
    { key: 'couple', label: 'Couples' }
  ];

  useEffect(() => {
    if (filter === 'all') {
      setFilteredWorks(artworks);
    } else {
      setFilteredWorks(artworks.filter(work => work.category === filter));
    }
  }, [filter]);

  return (
    <div className="gallery-page">
      <div className="container">
        {/* Header */}
        <section className="gallery-header">
          <div className="fade-in-up">
            <h1>Gallery</h1>
            <p>Explore our collection of hand-crafted sketches and artistic creations</p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="filter-section">
          <div className="filter-buttons fade-in-up">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`filter-btn ${filter === category.key ? 'active' : ''}`}
                onClick={() => setFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="gallery-grid">
          {filteredWorks.map((artwork, index) => (
            <div 
              key={artwork.id} 
              className="gallery-item scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="artwork-card">
                <div className="image-container">
                  <img src={artwork.image} alt={artwork.title} />
                  <div className="overlay">
                    <div className="overlay-content">
                      <h3>{artwork.title}</h3>
                      <p>{artwork.description}</p>
                      <span className="category-tag">{artwork.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content fade-in-up">
            <h2>Love What You See?</h2>
            <p>Commission your own personalized sketch today</p>
            <a href="/commission" className="btn btn-primary">Start Your Commission</a>
          </div>
        </section>
      </div>

      <style jsx>{`
        .gallery-page {
          padding-top: 100px;
          min-height: 100vh;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .gallery-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .gallery-header p {
          font-size: 1.2rem;
          color: #5a6c7d;
          max-width: 600px;
          margin: 0 auto;
        }

        .filter-section {
          margin-bottom: 3rem;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 24px;
          border: 2px solid #e1e8ed;
          background: white;
          color: #5a6c7d;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .gallery-item {
          opacity: 0;
          animation: scaleIn 0.6s ease-out forwards;
        }

        .artwork-card {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          background: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .artwork-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          position: relative;
          height: 350px;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .artwork-card:hover .image-container img {
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 2rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .artwork-card:hover .overlay {
          opacity: 1;
        }

        .overlay-content h3 {
          color: white;
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
        }

        .overlay-content p {
          color: #ecf0f1;
          margin: 0 0 1rem 0;
          font-size: 0.9rem;
        }

        .category-tag {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .gallery-page {
            padding-top: 80px;
          }

          .gallery-header h1 {
            font-size: 2.5rem;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .filter-buttons {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 10px 16px;
            font-size: 0.9rem;
          }

          .cta-section {
            margin: 2rem -20px 0;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
