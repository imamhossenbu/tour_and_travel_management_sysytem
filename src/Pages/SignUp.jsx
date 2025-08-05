import { motion } from 'framer-motion';
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import bgImage from '../assets/bg.jpg';
import signUpImage from '../assets/signup.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { signUp, updateUser, googleSignIn, githubLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // State to handle errors
  const [errors, setErrors] = useState({});

  // Password validation regex: at least 8 characters, 1 uppercase, 1 digit, 1 special char
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

  // Handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();
    setErrors({});  // Reset errors

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Form validation
    const newErrors = {};
    if (!name) newErrors.name = 'Full Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must have 6+ chars, 1 uppercase, 1 number, 1 special character.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    signUp(email, password)
      .then(() => {
        updateUser(name, photo)
          .then(() => {
            axiosPublic.post('/api/users', { name, email })
              .then(res => {
                if (res.data.success) {
                  form.reset();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sign Up Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
                }
              })
              .catch(error => Swal.fire('Error', error.response?.data?.error || 'Signup failed', 'error'));
          });
      })
      .catch(error => Swal.fire('Error', error.message, 'error'));
  };

  // Handle Google Login
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
                title: "Sign Up With Google Successful",
                showConfirmButton: false,
                timer: 1500
              });

            }
          })
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign Up With Google Successful",
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
                title: "Sign Up With GitHub Successful",
                showConfirmButton: false,
                timer: 1500
              });

            }
          })
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign Up With GitHub Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch(error => Swal.fire('Error', error.message, 'error'));
  };

  return (
    <div
      className="min-h-screen flex items-center py-20 justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-full">

        {/* Left Side - Sign Up Illustration */}
        <div className="md:w-1/2 p-8 hidden md:flex items-center justify-center">
          <img src={signUpImage} alt="Sign Up" className="max-w-sm w-full" />
        </div>

        {/* Right Side - Sign Up Form */}
        <motion.div
          className="md:w-1/2 w-full p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-medium">Full Name</label>
              <input
                type="text"
                name='name'
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Photo URL</label>
              <input
                type="url"
                name='photo'
                placeholder="Enter photo URL"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Email Address</label>
              <input
                type="email"
                name='email'
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                />
                <button
                  type="button"
                  className="absolute cursor-pointer inset-y-0 right-4 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-500 hover:underline ml-2">Go to Login</a>
          </p>

          <div className="mt-6">
            <p className="text-center text-gray-600">Or sign up with</p>
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

export default SignUp;
