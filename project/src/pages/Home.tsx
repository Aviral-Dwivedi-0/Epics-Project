import { Link } from 'react-router-dom';
import { Scaling as Seedling, Sprout, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="space-y-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section
        className="relative h-[600px] rounded-3xl overflow-hidden"
        variants={itemVariants}
      >
        <img
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=2070&q=80"
          alt="Farming landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div
          className="relative h-full flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center text-white p-8 max-w-3xl">
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Smart Crop Recommendations
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Leverage the power of data and precision agriculture to make informed decisions
              about your crops. Get personalized recommendations based on your soil conditions
              and environmental factors.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/predict"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -10 }}
        >
          <Seedling className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Precision Agriculture</h3>
          <p className="text-gray-600">
            Make data-driven decisions to optimize your crop yield and resource utilization.
          </p>
        </motion.div>
        <motion.div
          className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -10 }}
        >
          <Sprout className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Smart Recommendations</h3>
          <p className="text-gray-600">
            Get personalized crop suggestions based on soil composition and environmental conditions.
          </p>
        </motion.div>
        <motion.div
          className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -10 }}
        >
          <Leaf className="w-12 h-12 text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Sustainable Farming</h3>
          <p className="text-gray-600">
            Promote sustainable agricultural practices while maximizing your farm's productivity.
          </p>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;