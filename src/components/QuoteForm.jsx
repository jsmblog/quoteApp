import { useState } from 'react';
import { createQuote, updateQuote } from '../services/quoteService';
import '../styles/QuoteForm.css';

const QuoteForm = ({ userId, quoteToEdit, onClose, onSuccess }) => {
  const [text, setText] = useState(quoteToEdit?.text || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('Por favor ingresa el texto de la cita');
      return;
    }

    setLoading(true);
    try {
      if (quoteToEdit) {
        await updateQuote(quoteToEdit.id, text);
        alert('Cita actualizada exitosamente');
      } else {
        await createQuote({ text, userId });
        alert('Cita creada exitosamente');
      }
      
      setText('');
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-form-overlay">
      <div className="quote-form-container">
        <h2>{quoteToEdit ? 'Editar Cita' : 'Crear Nueva Cita'}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu cita aquí..."
            rows="4"
            disabled={loading}
          />
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : quoteToEdit ? 'Actualizar' : 'Crear'}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;