import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ChartBar, Users, Shield, Globe, Rocket } from 'lucide-react';
import useCustomNavigationForAuthenticatedUser from '@/src/hooks/useCustomNavigationForAuthenticatedUser';

const CircleBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-gray-100 to-blue-50 rounded-full blur-3xl opacity-70" />
    <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50 to-gray-100 rounded-full blur-3xl opacity-70" />
  </div>
);

const Starting = () => {
  useCustomNavigationForAuthenticatedUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <CircleBackground />

      {/* Navigation */}
      <nav className="relative z-10 py-6 px-4 border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-display font-bold text-gray-900">
            <span className="text-blue-600">ZEPHYR</span>
          </div>
          <div className="text-sm text-gray-600">
            Contact: support@zephyr.com
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-16">
        <section className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Hero Section */}
          <div className="text-center max-w-5xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wider">
              TRANSFORMING BUSINESS CONNECTIONS
            </span>
            <h1 className="mt-6 font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tight">
              Connect & 
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"> Grow</span>
            </h1>
            <p className="mt-8 text-xl font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
              ZEPHYR bridges the gap between innovative businesses and strategic investors, creating opportunities that drive growth and foster success.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            {[
              { icon: Building2, title: "Business Growth", desc: "Access strategic resources and mentorship to scale your business effectively", color: "blue" },
              { icon: Users, title: "Elite Network", desc: "Connect with industry leaders and decision-makers in your sector", color: "blue" },
              { icon: ChartBar, title: "Smart Analytics", desc: "Leverage real-time insights and data-driven decision making", color: "blue" }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 hover:-translate-y-1 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="h-full bg-white rounded-2xl p-8 shadow-[0_0_50px_0_rgba(0,0,0,0.05)] hover:shadow-[0_0_50px_0_rgba(0,0,0,0.1)] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why ZEPHYR Section */}
          <div className="mt-32">
            <h2 className="text-center font-display text-4xl font-bold text-gray-900 mb-16">Why Choose ZEPHYR</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { icon: Shield, title: "Secure Platform", desc: "Bank-grade security protocols ensuring your data remains protected" },
                { icon: Globe, title: "Global Reach", desc: "Access to international markets and diverse investment opportunities" },
                { icon: Rocket, title: "Fast Growth", desc: "Accelerated business development through strategic partnerships" }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Active Investors" },
              { number: "$1.2B+", label: "Capital Raised" },
              { number: "350+", label: "Startups" },
              { number: "98%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl font-bold text-blue-600">{stat.number}</div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Join ZEPHYR today and become part of a growing network of successful businesses and investors. Take the first step towards accelerated growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/investor/login"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-full overflow-hidden transition-all hover:bg-blue-700"
              >
                <span className="relative z-10 font-medium tracking-wide flex items-center">
                  Login as Investor
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/business/login"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full border-2 border-gray-200 hover:border-blue-200 transition-colors"
              >
                <span className="font-medium tracking-wide flex items-center">
                  Login as Business
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-50 mt-32 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="font-display font-bold text-xl text-blue-600 mb-4">ZEPHYR</div>
          <p className="text-sm">© 2024 ZEPHYR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Starting;