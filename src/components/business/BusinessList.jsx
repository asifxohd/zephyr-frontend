import { motion } from "framer-motion";
import BusinessCard from "./BusinessCard";

const BusinessList = ({ businesses }) => {
    return (
        <div className="max-w-7xl mx-auto  ">
            <div className="space-y-4">
                {businesses.map((business, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <BusinessCard
                            key={business.id || index}
                            business={business}
                            index={index}
                        />
                    </motion.div>

                ))}
            </div>
        </div>
    );
};

export default BusinessList