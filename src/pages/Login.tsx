
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simple demo login - would be replaced with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
      navigate('/account');
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-32">
        <div className="mx-auto max-w-md">
          <div className="bg-white shadow-md rounded-lg p-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <img 
                src="https://sallyssoultherapy.com/wp-content/uploads/2024/07/cropped-new-edited-logo-1.png" 
                alt="Sally's Soul Therapy Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-center mb-6">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isSignUp && (
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-accent-foreground hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-accent-foreground hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
              </button>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-500 text-center">
                By signing in, you agree to our <a href="#" className="text-accent-foreground hover:underline">Terms of Service</a> and <a href="#" className="text-accent-foreground hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
