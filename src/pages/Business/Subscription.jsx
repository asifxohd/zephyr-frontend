import React from 'react';
import { Clock, Calendar, Crown, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { createCheckoutSession } from '@/src/services/api/business/Subscriptions';
import useSubscriptionStatus from '@/src/hooks/useSubscriptionStatus';

const Subscription = () => {
  const { freeTrialUsed, isSubscribed } = useSubscriptionStatus();

  const plans = [
    {
      title: "Free Trial",
      subtitle: "7-day trial",
      duration: "for 7 days",
      description: "Try all premium features free for 7 days. Experience the full platform with no commitment.",
      icon: Gift,
      planType: "free_trial"
    },
    {
      title: "1 Month",
      subtitle: "Monthly plan",
      price: "9.99",
      duration: "/month",
      description: "Perfect for short-term access to all premium features. Enjoy your monthly plan.",
      icon: Clock,
      planType: "monthly"
    },
    {
      title: "6 Months",
      subtitle: "Semi-annual plan",
      price: "49.99",
      duration: "/6 months",
      description: "Great value for extended access to all features.",
      savings: "Save 15% vs monthly",
      icon: Calendar,
      planType: "semi_annual"
    },
    {
      title: "1 Year",
      subtitle: "Annual plan",
      price: "89.99",
      duration: "/year",
      description: "Our best value plan with maximum savings.",
      savings: "Save 25% vs monthly",
      icon: Crown,
      planType: "annual"
    }
  ];

  const handleSubscribe = async (planType) => {
    try {
      const checkoutUrl = await createCheckoutSession(planType);
      window.location.href = checkoutUrl; 
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-4 md:p-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-base max-md:text-xs text-gray-600">
            Choose a subscription plan that suits your needs. Whether you prefer a monthly, 6-month, or yearly plan, you'll have access to premium features, updates, and support throughout your subscription.
          </p>
        </div>

        <div className="max-lg:grid justify-center flex flex-grow grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify">
          {plans
            .filter(plan => !(plan.planType === "free_trial" && freeTrialUsed))
            .map((plan, index) => (
              <PricingCard 
                key={plan.title} 
                plan={plan} 
                isPopular={plan.planType === "monthly"}
                isFree={plan.planType === "free_trial"}
                onSubscribe={handleSubscribe}
              />
            ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Questions about our plans?
            <button className="text-blue-600 hover:text-blue-700 font-medium ml-2">
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ plan, isPopular, isFree, onSubscribe }) => {
  const { icon: IconComponent } = plan;

  return (
    <Card className={`relative lg:w-[300px] ${isPopular ? 'ring-2 ring-blue-500' : ''}`}>
      {(isPopular || isFree) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium text-white
            ${isFree ? 'bg-green-600' : 'bg-blue-600'}
          `}>
            {isFree ? 'Limited Time' : 'Most Popular'}
          </span>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{plan.subtitle}</p>
          </div>
          <div className={`p-2 rounded-lg ${isFree ? 'bg-green-50' : isPopular ? 'bg-blue-50' : 'bg-gray-50'}`}>
            <IconComponent className={`w-6 h-6 ${isFree ? 'text-green-600' : isPopular ? 'text-blue-600' : 'text-gray-600'}`} />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className={`text-4xl font-bold ${isFree ? 'text-green-600' : isPopular ? 'text-blue-600' : 'text-gray-900'}`}>
              {isFree ? 'Free' : `$${plan.price}`}
            </span>
            <span className="text-gray-500 ml-2">{plan.duration}</span>
          </div>
          {plan.savings && (
            <p className="text-blue-600 text-sm mt-2 font-medium">
              {plan.savings}
            </p>
          )}
        </div>

        <p className="text-gray-600 mb-6">{plan.description}</p>

        <button
          className={`
            w-full py-3 rounded-lg font-medium text-sm transition-colors
            ${isFree ? 'bg-green-600 text-white hover:bg-green-700' : isPopular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-gray-50 hover:bg-gray-600'}
          `}
          onClick={() => onSubscribe(plan.planType)}
        >
          {isFree ? 'Start Free Trial' : 'Subscribe Now'}
        </button>
      </CardContent>
    </Card>
  );
};

export default Subscription;