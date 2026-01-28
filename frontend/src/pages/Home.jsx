import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10 w-full md:w-2/3"></div>
                <img
                    src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                    alt="Motorcycle on road"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                            Ride Your Dream <br />
                            <span className="text-primary">Today</span>
                        </h1>
                        <p className="text-lg text-gray-300">
                            Rent premium motorcycles for your next adventure. Affordable rates, top condition bikes, and unforgettable experiences.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="/bikes" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Browse Bikes <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link to="/register" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition">
                                Join Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
                        <p className="text-gray-600 mt-2">The best rental experience on two wheels.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Star className="w-8 h-8 text-primary" />}
                            title="Premium Fleet"
                            description="Top-tier bikes maintained to factory standards for your safety and enjoyment."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-primary" />}
                            title="Fully Insured"
                            description="Ride with peace of mind knowing you are covered with our comprehensive insurance."
                        />
                        <FeatureCard
                            icon={<Clock className="w-8 h-8 text-primary" />}
                            title="Flexible Rentals"
                            description="Rent by the day, week, or month. We adapt to your schedule."
                        />
                    </div>
                </div>
            </section>

            {/* Promo */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <img
                            src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                            alt="Biker looking at view"
                            className="rounded-2xl shadow-2xl"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-16 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Experience the Freedom</h2>
                        <p className="text-gray-600 text-lg">
                            There's nothing quite like the feeling of the open road. Whether you're a seasoned rider looking for something new or a beginner wanting to try out the lifestyle, we have the perfect bike for you.
                        </p>
                        <Link to="/bikes" className="inline-block text-primary font-semibold hover:text-blue-700 transition">
                            View Our Fleet &rarr;
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition duration-300"
    >
        <div className="mb-4 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

export default Home;
