import React, { useEffect, useState } from 'react';
import { AlertCircle, Calendar, CreditCard, Crown, Bell, Shield, Star, Receipt, ChevronRight, Loader2 } from 'lucide-react';
import CancelSubscriptionModal from '@/src/components/Alerts/CancellSubscriptionModal';
import { fetchSubscriptionInformation } from '@/src/services/api/business/Subscriptions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cancelSubscriptionConfirm } from '@/src/services/api/business/Subscriptions';

const ViewSubscriptions = () => {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchSubscriptionInformation();
                setSubscriptionData(response.data);
            } catch (error) {
                setError('Failed to load subscription information');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getPlanName = (planType) => {
        const plans = {
            free_trial: 'Free Trial',
            basic: 'Basic Plan',
            premium: 'Premium Plan',
            pro: 'Pro Plan'
        };
        return plans[planType] || planType;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="mt-2 text-gray-600">Loading subscription details...</p>
            </div>
        );
    }
    function formatToIST(dateString) {
        const dateObj = new Date(dateString);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "Asia/Kolkata",
            timeZoneName: "short"
        };
        return dateObj.toLocaleString("en-IN", options);
    }


    const handleCancelSubscription = async () => {
        try {
            const response = await cancelSubscriptionConfirm()
            setShowCancelModal(false);
            console.log(response);
        } catch (error) {
            console.log(error);
            
        }
    };


    if (error || !subscriptionData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                            <span>No Subscription Found</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert className="bg-yellow-50 border-yellow-200">
                            <AlertDescription>
                                We couldn't find any active subscriptions. Please check back later or contact support if you believe this is an error.
                            </AlertDescription>
                        </Alert>
                        <button
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                            onClick={() => window.location.href = '/subscribe'}
                        >
                            View Available Plans
                        </button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center  bg-gradient-to-b">
            {/* Header Section */}
            <div className="w-full max-w-6xl bg-white shadow-lg overflow-hidden mb-4">
                <div className="flex flex-col md:flex-row items-center p-6 md:p-8 space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-50 flex items-center justify-center">
                            <Crown className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
                            {subscriptionData.status === 'active' && (
                                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-2">
                                    <Bell className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h1 className="text-3xl font-semibold text-gray-800">Your Subscription Details</h1>
                            <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className="text-gray-500 mt-1 flex items-center space-x-1">
                            <Shield className="w-4 h-4" />
                            <span>Plan: {getPlanName(subscriptionData.plan_type)}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 space-y-8">
                {/* Subscription Details */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Crown className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-xl font-semibold text-indigo-700">Current Subscription</h2>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <p className="text-lg font-medium text-gray-700">
                                    Plan: {getPlanName(subscriptionData.plan_type)}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <p className="text-gray-600">End Date: {formatDate(subscriptionData.end_date)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-green-500" />
                                <p className={`text-sm font-semibold ${subscriptionData.status === "active" ? "text-green-600" : "text-red-600"
                                    }`}>
                                    Status: {subscriptionData.status.charAt(0).toUpperCase() + subscriptionData.status.slice(1)}
                                </p>
                            </div>
                        </div>

                        {
                            subscriptionData.status === "active" &&
                            <button
                            onClick={() => setShowCancelModal(true)}
                            className="mt-4 md:mt-0 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition flex items-center space-x-2"
                        >
                            <CreditCard className="w-4 h-4" />
                            <span>Cancel Subscription</span>
                        </button>
                        }
                    </div>
                </div>

                {/* Transaction History */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Receipt className="w-6 h-6 text-indigo-600" />
                        <h3 className="text-xl font-semibold text-indigo-700">Transaction History</h3>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-indigo-50 text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Date</span>
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-indigo-50 text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="w-4 h-4" />
                                            <span>Amount</span>
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-indigo-50 text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <Receipt className="w-4 h-4" />
                                            <span>Status</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptionData.billing_histories.map((transaction) => (
                                    <tr key={transaction.stripe_invoice_id} className="bg-white hover:bg-indigo-50 transition-colors">
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            {formatDate(transaction.paid_at)}
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-200 font-medium">
                                            ${parseFloat(transaction.amount).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                            <span className={`capitalize ${transaction.status === 'paid' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {transaction.status}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CancelSubscriptionModal
                open={showCancelModal}
                onOpenChange={() => setShowCancelModal(false)}
                onCancel={handleCancelSubscription}
                expiryDate={formatToIST(subscriptionData.end_date)}
            />
        </div>
    );
};

export default ViewSubscriptions;