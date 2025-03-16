import { motion } from 'framer-motion';
import { Scaling as Seedling, Database, LineChart } from 'lucide-react';

const About = () => {
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
      className="max-w-4xl mx-auto space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section
        className="bg-white rounded-2xl p-8 shadow-lg"
        variants={itemVariants}
      >
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          About CropSmart
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-4"
          variants={itemVariants}
        >
          CropSmart is an innovative crop recommendation system that leverages data analytics
          and agricultural science to help farmers make informed decisions about their crops.
        </motion.p>
        <motion.p
          className="text-lg text-gray-600"
          variants={itemVariants}
        >
          Our system analyzes various environmental factors and soil conditions to provide
          personalized crop recommendations, helping optimize yield and resource utilization.
        </motion.p>
      </motion.section>

      <motion.section
        className="bg-white rounded-2xl p-8 shadow-lg"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="space-y-6">
          <motion.div
            className="flex items-start space-x-4 p-4 rounded-xl bg-emerald-50"
            whileHover={{ scale: 1.02 }}
          >
            <Database className="w-8 h-8 text-emerald-500 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Collection</h3>
              <p className="text-gray-600">
                Input your soil and environmental parameters including nitrogen, phosphorus,
                potassium levels, temperature, humidity, pH, and rainfall.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start space-x-4 p-4 rounded-xl bg-emerald-50"
            whileHover={{ scale: 1.02 }}
          >
            <LineChart className="w-8 h-8 text-emerald-500 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Analysis</h3>
              <p className="text-gray-600">
                Our system analyzes your inputs using advanced algorithms to determine the
                most suitable crops for your conditions.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start space-x-4 p-4 rounded-xl bg-emerald-50"
            whileHover={{ scale: 1.02 }}
          >
            <Seedling className="w-8 h-8 text-emerald-500 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized crop recommendations based on your specific conditions,
                helping you make data-driven farming decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;