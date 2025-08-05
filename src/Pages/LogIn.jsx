import { motion } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import bgImage from '../assets/bg.jpg';
import loginImage from '../../src/assets/login.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const LogIn = () => {
  const axiosPublic = useAxiosPublic();
  const { googleSignIn, githubLogin, loginUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const [error, setError] = useState('')


  const handleLogin = (e) => {
    e.preventDefault();
    setError({});
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }


    loginUser(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log in Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch(err => {
        setError({ login: err.message });
      })
  }



  // goole sign in
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        const result = res?.user;
        const name = result?.displayName || "GitHub User";
        const email = result?.email;

        axiosPublic.post('/api/users', { name, email })
          .then(res => {
            if (res.data.success) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign in With Google Successful",
                showConfirmButton: false,
                timer: 1500
              });

            }
          })
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign in With Google Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch(error => Swal.fire('Error', error.message, 'error'));
  };

  // Handle GitHub Login
  const handleGithubLogin = () => {
    githubLogin()
      .then((res) => {
        const result = res?.user;
        const name = result?.displayName || "GitHub User";
        const email = result?.email;

        axiosPublic.post('/api/users', { name, email })
          .then(res => {
            if (res.data.success) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign in With GitHub Successful",
                showConfirmButton: false,
                timer: 1500
              });

            }
          })
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign in With GitHub Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch(error => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <div
      className="min-h-screen flex py-20 items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-full">

        {/* Left Side - Image */}
        <div className="md:w-1/2 p-8 hidden md:flex items-center justify-center">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="max-w-sm w-full"
          />
        </div>

        {/* Right Side - Login Form */}
        <motion.div
          className="md:w-1/2 w-full p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Welcome Back!
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-medium">Email Address</label>
              <input
                type="email"
                name='email'
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                name='password'
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>

            {error.login && <p className="text-red-500 text-sm text-center mt-1">{error.login}</p>}

            <motion.button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?
            <a href="/sign-up" className="text-blue-500 hover:underline ml-2">Sign Up</a>
          </p>

          {/* Social Media Login */}
          <div className="mt-6">
            <p className="text-center text-gray-600">Or log in with</p>
            <div className="flex justify-center gap-6 mt-4">
              <motion.button onClick={handleGoogleLogin}
                className="flex items-center bg-red-500 cursor-pointer text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGoogle className="mr-2" />
                Google
              </motion.button>

              <motion.button onClick={handleGithubLogin}
                className="flex items-center bg-gray-800 text-white px-6 py-3 cursor-pointer rounded-lg shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="mr-2" />
                GitHub
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogIn;
