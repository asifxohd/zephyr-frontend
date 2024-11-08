import React from 'react';
import { motion } from 'framer-motion';
import { XCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FailedSubscription = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <XCircleIcon className="text-red-500 w-24 h-24 mb-4" />
      </motion.div>
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Subscription Failed</h2>
      <p className="text-gray-600 mb-8">We encountered an issue while processing your subscription. Please try again.</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          as="a"
          href="/"
          variant="primary"
          className="mt-4"
        >
          Go to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default FailedSubscription;