import React from 'react';
import { Link } from 'react-router-dom';

const Starting = () => {
  return (
    <div className="min-h-screen flex justify-center pt-28 bg-[url('https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center text-black">
      {/* Main Content */}
      <section className="pt-12 sm:pt-16 bg-opacity-80 rounded-lg  px-8 py-10">
        <div className="text-center max-w-4xl mx-auto px-4">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Connect & Grow Your Business
          </h1>

          {/* Subheading */}
          <h2 className="mt-4 text-xl sm:text-2xl text-gray-600">
            A platform to bridge businesses and investors seamlessly.
          </h2>

          {/* Paragraph */}
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Whether you're an investor seeking new opportunities or a business looking for funding and support, we provide the perfect platform to create meaningful connections and foster growth.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/investor/login"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full"
            >
              Login as Investor
            </Link>
            <Link
              to="/business/login"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full"
            >
              Login as Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Starting;
