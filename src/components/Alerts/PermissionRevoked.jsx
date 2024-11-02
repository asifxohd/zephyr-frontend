import React from 'react';
import { ShieldOff, HelpCircle, ArrowRight, Home, Mail } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const PermissionRevoked = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 bg-white rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldOff className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600">
            Your permissions have been revoked. Please contact support for assistance.
          </p>
        </div>

        {/* Alert Banner */}
        <Alert className="bg-amber-50 border-amber-200">
          <HelpCircle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800 font-semibold">
            What Does This Mean?
          </AlertTitle>
          <AlertDescription className="text-amber-700 mt-2">
            Revoked permissions mean that your account no longer has the necessary rights 
            to access this section of the application. This could be due to various reasons, 
            including account restrictions or policy updates.
          </AlertDescription>
        </Alert>

        {/* Next Steps Section */}
        
        {/* Home Link */}
        <div className="pt-6 border-t border-gray-200">
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PermissionRevoked;