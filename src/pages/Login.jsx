import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      // console.log(result);
      if (result.success) {
        showToast('Login successful!', 'success');
        navigate('/admin');
      } else {
        showToast(result.error || 'Login failed', 'error');
      }
    } catch (error) {
      showToast('An unexpected error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-matte-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/50 backdrop-blur-md border border-neon-blue rounded-lg p-8 shadow-neon-blue">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-light-text mb-2">
              Seagull Academy
            </h1>
            <p className="text-neon-cyan text-lg">Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-light-text text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-neon-blue/50 rounded-lg text-light-text placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-light-text text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-neon-blue/50 rounded-lg text-light-text placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-cyan hover:shadow-neon-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Access restricted to authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
