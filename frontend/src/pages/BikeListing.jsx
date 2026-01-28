import { useState, useEffect } from 'react';
import api from '../utils/api';
import BikeCard from '../components/BikeCard';
import { Search, Filter } from 'lucide-react';

const BikeListing = () => {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const { data } = await api.get('/bikes');
                setBikes(data);
                setFilteredBikes(data);
            } catch (error) {
                console.error('Error fetching bikes:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBikes();
    }, []);

    useEffect(() => {
        let result = bikes;

        if (filters.search) {
            result = result.filter(bike =>
                bike.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                bike.model.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.location) {
            result = result.filter(bike =>
                bike.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.minPrice) {
            result = result.filter(bike => bike.price_per_day >= Number(filters.minPrice));
        }

        if (filters.maxPrice) {
            result = result.filter(bike => bike.price_per_day <= Number(filters.maxPrice));
        }

        setFilteredBikes(result);
    }, [filters, bikes]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Fleet</h1>

                    {/* Filters */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search bike..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="relative">
                                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min Price"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                onChange={handleFilterChange}
                            />

                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max Price"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {filteredBikes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredBikes.map(bike => (
                                    <BikeCard key={bike._id} bike={bike} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500">No bikes found matching your criteria.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BikeListing;
