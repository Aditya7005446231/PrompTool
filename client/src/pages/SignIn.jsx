import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle} from 'react-icons/fi';
import { LinearGradient }  from 'react-text-gradients';
// import {Layout, Lock, }

const SignIn = () => {
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate a network reques (backend delay)

    setTimeout(() => {
      if(email && password.length >= 6){
        console.log("Login Succesful:", {email});
        navigate('/');
      }else{
        setError('Invalid credentials. Password must be 6+ chars.');
        setIsLoading(false);
      }
    },1500);

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify({ email }));
    console.log("Logged in with:", email, password);
    navigate('/');
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        <div className="px-8 pt-8 text-center">
          <h2 className='text-3xl font-extrabold mb-2'>
            <LinearGradient gradient={['to left','#17acff, #ff68f0']}>
              PrompTool
            </LinearGradient>
          </h2>
          <p className='text-gray-500 text-sm'>Manage your Project workflow smoothly</p>
        </div>
        {/* Form */}
        <div className='p-8'>
          <form onSubmit={handleLogin} className='space-y-5'>
            {/* Erro Alert */}
            {error && (
              <div className='bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2'>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiMail className='text-gray-400' />
                </div>
                <input
                  type='email'
                  required
                  className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder='name@company.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10 pr-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold shadow-md transition-all duration-200 
                ${isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
        <div className='bg-gray-50 p-4 text-center border-t border-gray-100'>
          <p className="text-sm text-gray-600">
            Don't have an account? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Create Account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
