import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Auth = ({ onClose, onSuccess }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Validación para login
      if (!formData.email || !formData.password) {
        alert('Por favor completa todos los campos');
        return;
      }
    } else {
      // Validación para registro
      if (!formData.username || !formData.email || !formData.password) {
        alert('Por favor completa todos los campos');
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        });
        alert('Inicio de sesión exitoso');
      } else {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        alert('Registro exitoso');
      }
      
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error('Error en autenticación:', error);
      alert(error.message || 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Tu nombre de usuario"
                disabled={loading}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button type="button" onClick={toggleMode} disabled={loading}>
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;