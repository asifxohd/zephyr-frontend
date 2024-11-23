import React from 'react';
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Receipt,
  Package,
  Clock
} from "lucide-react";

const dummyData = [
  {
    stripe_invoice_id: "inv_1234567890",
    plan_type: "Premium Annual",
    amount: 199.99,
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    billingHistory: {
      status: "paid"
    },
    subscriptions: {
      status: "active"
    }
  },
  {
    stripe_invoice_id: "inv_9876543210",
    plan_type: "Business Monthly",
    amount: 49.99,
    start_date: "2024-03-01",
    end_date: "2024-03-31",
    billingHistory: {
      status: "pending"
    },
    subscriptions: {
      status: "active"
    }
  },
  {
    stripe_invoice_id: "inv_5432109876",
    plan_type: "Enterprise",
    amount: 499.99,
    start_date: "2024-02-01",
    end_date: "2024-02-29",
    billingHistory: {
      status: "failed"
    },
    subscriptions: {
      status: "cancelled"
    }
  }
];

const SalesReport = () => {
  const getStatusColor = (status) => {
    const statusColors = {
      active: "bg-green-500",
      paid: "bg-green-500",
      pending: "bg-yellow-500",
      failed: "bg-red-500",
      cancelled: "bg-gray-500",
    };
    return statusColors[status.toLowerCase()] || "bg-gray-500";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    const statusMap = {
      active: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      paid: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      pending: <Clock className="w-4 h-4 text-yellow-500" />,
      failed: <XCircle className="w-4 h-4 text-red-500" />,
      cancelled: <AlertCircle className="w-4 h-4 text-gray-500" />
    };
    return statusMap[status.toLowerCase()] || <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Sales Report</h2>
        <p className="text-sm text-gray-600 mt-1">View all subscription transaction details</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyData.map((transaction) => (
              <tr key={transaction.stripe_invoice_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.stripe_invoice_id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-900">
                      {transaction.plan_type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(transaction.billingHistory.status)}`}>
                      {transaction.billingHistory.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-900">
                      {formatDate(transaction.start_date)} - {formatDate(transaction.end_date)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.subscriptions.status)}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(transaction.subscriptions.status)}`}>
                      {transaction.subscriptions.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;