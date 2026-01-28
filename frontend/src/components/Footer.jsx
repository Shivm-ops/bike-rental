import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary">VelocityRentals</h3>
                        <p className="text-gray-400 text-sm">
                            Premium bike rentals for your next adventure. Explore the city or hit the trails with our top-quality fleet.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/bikes" className="hover:text-primary transition">Our Bikes</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>123 Bike Lane, New York, NY</li>
                            <li>+1 (555) 123-4567</li>
                            <li>info@velocityrentals.com</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to verify the latest updates.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full border border-gray-700 focus:border-primary"
                            />
                            <button className="bg-primary px-4 py-2 rounded-r-md hover:bg-blue-600 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} VelocityRentals. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
