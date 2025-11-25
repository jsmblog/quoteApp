import { useState, useEffect } from 'react';
import { getQuotesByUser, deleteQuote } from '../services/quoteService';
import Quote from './Quote';
import QuoteForm from './QuoteForm';
import '../styles/QuoteList.css';

const QuoteList = ({ userId }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quoteToEdit, setQuoteToEdit] = useState(null);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const data = await getQuotesByUser(userId);
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      alert('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta cita?')) {
      return;
    }

    try {
      await deleteQuote(id);
      alert('Cita eliminada exitosamente');
      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
      alert('Error al eliminar la cita');
    }
  };

  const handleEdit = (quote) => {
    setQuoteToEdit(quote);
  };

  useEffect(() => {
    if (userId) {
      fetchQuotes();
    }
  }, [userId]);

  if (loading) {
    return <p>Cargando tus citas...</p>;
  }

  return (
    <div className="quote-list-container">
      <h2>Mis Citas</h2>
      
      {quotes.length === 0 ? (
        <p>Aún no tienes citas creadas</p>
      ) : (
        <div className="quotes-grid">
          {quotes.map((quote) => (
            <div key={quote.id} className="quote-item">
              <Quote text={quote.text} author={`ID: ${quote.userId}`} />
              <div className="quote-actions">
                <button onClick={() => handleEdit(quote)}>Editar</button>
                <button onClick={() => handleDelete(quote.id)} className="btn-delete">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {quoteToEdit && (
        <QuoteForm
          userId={userId}
          quoteToEdit={quoteToEdit}
          onClose={() => setQuoteToEdit(null)}
          onSuccess={fetchQuotes}
        />
      )}
    </div>
  );
};

export default QuoteList;