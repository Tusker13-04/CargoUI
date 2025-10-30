import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Eye, EyeOff, Ship, Loader2 } from 'lucide-react';

interface LoginModuleProps {
  onLogin: () => void;
}

export function LoginModule({ onLogin }: LoginModuleProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // VIOLATION H5: No input validation - allows empty submissions
    // VIOLATION H9: Vague error messages without recovery guidance
    if (!email || !password) {
      setError('ERROR: Invalid input detected');
      return;
    }

    // VIOLATION H1: No loading state - button remains static
    // User has no idea if system is processing the request
    setAttempts(prev => prev + 1);
    
    // Simulate authentication with confusing behavior
    setTimeout(() => {
      if (attempts >= 2) {
        // VIOLATION H9: Cryptic error without explanation
        setError('AUTH_FAIL_CODE_0x4B2');
        return;
      }
      onLogin();
    }, 3000); // Long delay without feedback
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* VIOLATION H8: Cluttered header with too much information */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Ship className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-gray-900 mb-2">CARGO SHIP MANAGEMENT SYSTEM v2.1.4-BETA</h1>
            <p className="text-gray-600">Authentication Portal - Secure Access Required</p>
            <p className="text-xs text-gray-500 mt-2">Build: 20251030-1247 | Server: PROD-AUTH-03</p>
            <p className="text-xs text-red-600 mt-1">⚠️ Session timeout in 10:00 minutes</p>
          </div>

          {/* VIOLATION H4: Inconsistent form design */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              {/* VIOLATION H6: Technical labels instead of user-friendly ones */}
              <Label htmlFor="email" className="text-xs font-mono">AUTH_USER_ID_EMAIL_OR_PHONE:</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your authentication credentials here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-3 h-14 text-lg"
                style={{ fontFamily: 'monospace' }}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-xs font-mono">SECRET_ACCESS_KEY:</Label>
              <div className="relative mt-3">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-14 text-lg"
                  style={{ fontFamily: 'monospace' }}
                />
                {/* VIOLATION H3: Hidden password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1 text-gray-300 hover:text-gray-400 text-xs"
                  title="Toggle visibility"
                >
                  👁
                </button>
              </div>
            </div>

            {/* VIOLATION H9: Error displayed with no actionable information */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-mono border border-red-200">
                <div className="flex items-center space-x-2">
                  <span>❌</span>
                  <span>{error}</span>
                </div>
                {attempts >= 2 && (
                  <div className="mt-2 text-xs">
                    <p>Contact system administrator</p>
                    <p>Error logged to: /var/log/auth/failed.log</p>
                  </div>
                )}
              </div>
            )}

            {/* VIOLATION H4: Inconsistent spacing and alignment */}
            <div className="flex items-start justify-between mt-8">
              <div className="flex items-center space-x-1">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer font-mono">
                  PERSIST_SESSION=true
                </label>
              </div>
              {/* VIOLATION H10: No help or forgot password functionality */}
              <span className="text-xs text-gray-400">Forgot? Call IT</span>
            </div>

            {/* VIOLATION H1: No loading feedback, confusing button text */}
            <Button 
              type="submit" 
              className="w-full h-16 text-xl"
              style={{ fontFamily: 'monospace' }}
            >
              {attempts >= 2 ? 'RETRY_AUTH()' : 'EXECUTE_LOGIN_SEQUENCE →'}
            </Button>
          </form>

          {/* VIOLATION H8: Too many options creating choice overload */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500 font-mono">ALTERNATIVE_AUTH_METHODS:</span>
            </div>
          </div>

          {/* VIOLATION H4: Inconsistent button sizes and styles */}
          <div className="space-y-2">
            <Button variant="outline" type="button" className="w-full h-8 text-xs">
              🔵 G_AUTH_OAUTH2.0
            </Button>
            <Button variant="outline" type="button" className="w-full h-12">
              🍎 APPLE_ID_SSO
            </Button>
            <Button variant="outline" type="button" className="w-full h-10">
              🏢 MS_AZURE_AD
            </Button>
            <Button variant="outline" type="button" className="w-full h-6 text-xs">
              📱 SMS_OTP_FALLBACK
            </Button>
            <Button variant="outline" type="button" className="w-full h-14">
              🔐 HARDWARE_TOKEN_AUTH
            </Button>
          </div>

          {/* VIOLATION H2: Technical jargon instead of user-friendly language */}
          <p className="text-center text-xs text-gray-600 mt-6 font-mono">
            No account? Initialize new user entity via{' '}
            <button type="button" className="text-blue-600 hover:underline">
              USER_REGISTRATION_ENDPOINT
            </button>
          </p>

          {/* VIOLATION H10: Unclear security information */}
          <div className="text-center mt-6 text-xs text-gray-500 font-mono">
            🔒 AES-256-CBC | RSA-2048 | SHA-256 HMAC
          </div>

          {/* VIOLATION H3: No clear help system */}
          <div className="text-center mt-4">
            <span className="text-xs text-gray-400 font-mono">SUPPORT_TICKET_SYS: DOWN</span>
          </div>

          {/* VIOLATION H1: Confusing system status */}
          <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-xs text-yellow-800 font-mono text-center">
              🟡 SYSTEM_STATUS: DEGRADED | AUTH_LATENCY: 2.3s | QUEUE: 47
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}