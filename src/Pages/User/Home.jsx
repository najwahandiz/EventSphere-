
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartEvent from '../../Components/Admin/CartEvent';
import UserCartEvent from '../../Components/User/UserCartEvent';
import { ArrowRight, Calendar, Music, Palette, Theater, Trophy, Star, Users, MapPin, Clock } from 'lucide-react';
import './Home.css';
import { getEvents } from '../../Api/request';

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [events, setEvents] = useState([]);

  // Get only the last 3 events by date (assuming date is in YYYY-MM-DD format)
  const coming = [...events]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  useEffect(() => {


      async function fetchEvents() {
        try {
          setLoading(true);
          const data = await getEvents();
          setEvents(data);
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchEvents();
    }, []);
  

  const categories = [
    { id: 'music', name: 'Musique', icon: <Music size={20} />, color: '#9b6cff' },
    { id: 'art', name: 'Art', icon: <Palette size={20} />, color: '#ff6b6b' },
    { id: 'theater', name: 'Spectacle', icon: <Theater size={20} />, color: '#4ecdc4' },
    { id: 'sports', name: 'Sports', icon: <Trophy size={20} />, color: '#45b7d1' },
    { id: 'food', name: 'Gastronomie', icon: <Star size={20} />, color: '#96ceb4' },
    { id: 'tech', name: 'Technologie', icon: <Users size={20} />, color: '#feca57' }
  ];

  

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Calendar size={16} />
            <span>Découvrez l'expérience ultime</span>
          </div>
          <h1 className="hero-title">
            Vivez des moments <span className="highlight">inoubliables</span> avec EventSphere
          </h1>
          <p className="hero-description">
            La plateforme qui connecte les passionnés aux événements les plus attendus. 
            Réservez vos tickets en quelques clics et créez des souvenirs mémorables.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="cta-button primary">
              Explorer les événements
              <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Nous contacter
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Événements</div>
            </div>
            <div className="stat">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Participants</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-grid">
            <div className="grid-item main"></div>
            <div className="grid-item secondary"></div>
            <div className="grid-item tertiary"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explorez par catégorie</h2>
          <p className="section-subtitle">Trouvez l'événement parfait selon vos intérêts</p>
        </div>
        
        <div className="categories-grid">
          {categories.map(category => (
            <div 
              key={category.id} 
              className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.name)}
              style={{ '--category-color': category.color }}
            >
              <div className="category-icon" style={{ backgroundColor: `${category.color}20` }}>
                {category.icon}
              </div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">12 événements</p>
            </div>
          ))}
        </div>
      </section>
      

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="section-header">
          <div className="header-content">
            <div>
              <h2 className="section-title">Événements à venir</h2>
              <p className="section-subtitle">Ne manquez pas ces expériences exclusives</p>
            </div>
            <Link to="/events" className="view-all-link">
              Voir tous les événements
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Chargement des événements...</p>
          </div>
        ) : (
          <div className="events-grid">
            {coming.map(event => (
              <UserCartEvent
              key={event.id}
              event={event}
            />
            ))}
          </div>
        )}
      </section>

 

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Pourquoi choisir EventSphere ?</h2>
          <p className="section-subtitle">Une expérience événementielle simplifiée et sécurisée</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon secure">
              <Star size={24} />
            </div>
            <h3 className="feature-title">Réservation sécurisée</h3>
            <p className="feature-description">
              Paiements 100% sécurisés avec protection des données. 
              Votre tranquillité d'esprit est notre priorité.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon easy">
              <Calendar size={24} />
            </div>
            <h3 className="feature-title">Gestion simplifiée</h3>
            <p className="feature-description">
              Interface intuitive pour trouver, réserver et gérer vos billets 
              en quelques clics seulement.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon support">
              <Users size={24} />
            </div>
            <h3 className="feature-title">Support dédié</h3>
            <p className="feature-description">
              Notre équipe est disponible 7j/7 pour vous accompagner 
              dans votre expérience événementielle.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}