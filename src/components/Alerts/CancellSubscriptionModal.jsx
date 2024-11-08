import React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle, XCircle, CheckCircle } from 'lucide-react';

const CancelSubscriptionModal = ({ open, onOpenChange, expiryDate, onCancel }) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-2xl mx-auto">
				<AlertDialogHeader className="p-4">
					<AlertDialogTitle className="flex items-center space-x-2 text-xl font-semibold mb-4">
						<XCircle className="w-6 h-6 text-red-500" />
						<span>Cancel Subscription</span>
					</AlertDialogTitle>
					<AlertDialogDescription className="space-y-4">
						<div className="p-4 bg-red-50 rounded-lg border border-red-100 space-y-3">
							<p className="text-base text-gray-700">
								Are you sure you want to cancel your subscription?
							</p>
							<div className="flex items-start space-x-3 text-sm text-gray-600">
								<AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
								<div>
									<p className="font-medium text-red-600">What happens after cancellation:</p>
									<ul className="list-disc pl-5 mt-2 space-y-2">
										<li>Your subscription will remain active until <b>{expiryDate}</b> </li>
										<li>You'll lose access to premium features after this date</li>
										<li>No further payments will be charged</li>
										<li>You can reactivate your subscription at any time</li>
									</ul>
								</div>
							</div>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className='flex justify-end'>
					<AlertDialogFooter className="p-4 space-x-3">
						<AlertDialogCancel className="flex items-center space-x-2">
							<XCircle className="w-4 h-4" />
							<span>Keep Subscription</span>
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={onCancel}
							className="bg-red-500 hover:bg-red-600 text-white flex items-center space-x-2"
						>
							<CheckCircle className="w-4 h-4" />
							<span>Yes, Cancel Subscription</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CancelSubscriptionModal;