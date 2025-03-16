import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const socialVariants = {
    hover: { scale: 1.2, rotate: 12 }
  };

  return (
    <footer className={`bg-white border-t ${className || ''}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <motion.h3
              className="text-lg font-semibold text-gray-900"
              whileHover={{ color: '#10B981' }}
            >
              CropSmart
            </motion.h3>
            <p className="text-gray-600">
              Empowering farmers with data-driven crop recommendations for sustainable agriculture.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }}>
                <a href="/about" className="text-gray-600 hover:text-emerald-500">About</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/predict" className="text-gray-600 hover:text-emerald-500">Get Prediction</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/guide" className="text-gray-600 hover:text-emerald-500">How to Use</a>
              </motion.li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }}>
                <a href="/guide" className="text-gray-600 hover:text-emerald-500">User Guide</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/about" className="text-gray-600 hover:text-emerald-500">Our Technology</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="/about" className="text-gray-600 hover:text-emerald-500">FAQ</a>
              </motion.li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-gray-600 hover:text-emerald-500"
                variants={socialVariants}
                whileHover="hover"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-emerald-500"
                variants={socialVariants}
                whileHover="hover"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-emerald-500"
                variants={socialVariants}
                whileHover="hover"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 pt-8 border-t text-center text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; {new Date().getFullYear()} CropSmart. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;