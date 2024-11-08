import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SuccessSubscription = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/'); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircleIcon className="text-green-500 w-24 h-24 mb-4" />
      </motion.div>
      <h2 className="text-3xl font-bold mb-2">Subscription Successful!</h2>
      <p className="text-gray-600 mb-8">Thank you for subscribing to our service.</p>
      <Button
        variant="primary"
        className="mt-4"
        onClick={handleGoToDashboard}  
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default SuccessSubscription;
