import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Quote from './Quote';
import QuoteForm from './QuoteForm';
import QuoteList from './QuoteList';
import Auth from './Auth';
import { getRandomQuote } from '../services/quoteService';
import '../styles/Home.css';

const Home = () => {
  const { user, isAuthenticated, loginAsAnonymous, logout } = useAuth();
  const [randomQuote, setRandomQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showMyQuotes, setShowMyQuotes] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  console.log(randomQuote);
  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const quote = await getRandomQuote();
      setRandomQuote(quote);
    } catch (error) {
      console.error('Error fetching random quote:', error);
      alert('Error al obtener cita aleatoria');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuote = async () => {
    if (!isAuthenticated) {
      // Si no está autenticado, crear usuario anónimo
      try {
        await loginAsAnonymous();
        setShowForm(true);
      } catch (error) {
        console.error('Error creating anonymous user:', error);
        alert('Error al crear usuario anónimo');
      }
    } else {
      // Si ya está autenticado, mostrar formulario
      setShowForm(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    fetchRandomQuote();
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="home-container">
      <div className="header">
        <h1>Bienvenido a Quote App</h1>
        
        <div className="header-actions">
          {!isAuthenticated ? (
            <button onClick={() => setShowAuth(true)} className="btn-login">
              Iniciar Sesión / Registrarse
            </button>
          ) : (
            <button onClick={logout} className="btn-logout">
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
      
      {user && (
        <div className="user-info">
          <p>Usuario: {user.username}</p>
          {user.isAnonymous && <span className="badge-anonymous">Anónimo</span>}
        </div>
      )}

      <div className="quote-section">
        <h2>Cita Aleatoria</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : randomQuote ? (
          <Quote text={randomQuote.text} author={randomQuote.user?.username} />
        ) : (
          <p>No hay citas disponibles</p>
        )}
        <button onClick={fetchRandomQuote} disabled={loading}>
          {loading ? 'Cargando...' : 'Obtener otra cita'}
        </button>
      </div>

      <div className="actions-section">
        <button onClick={handleCreateQuote}>
          {isAuthenticated ? 'Crear Nueva Cita' : 'Crear Cita (Anónimo)'}
        </button>
        
        {isAuthenticated && (
          <button onClick={() => setShowMyQuotes(!showMyQuotes)}>
            {showMyQuotes ? 'Ocultar Mis Citas' : 'Ver Mis Citas'}
          </button>
        )}
      </div>

      {showForm && (
        <QuoteForm 
          userId={user?.id} 
          onClose={() => setShowForm(false)}
          onSuccess={fetchRandomQuote}
        />
      )}

      {showMyQuotes && isAuthenticated && (
        <QuoteList userId={user.id} />
      )}

      {showAuth && (
        <Auth 
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Home;