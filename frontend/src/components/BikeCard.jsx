import { Link } from 'react-router-dom';
import { Settings, Droplets } from 'lucide-react';

const BikeCard = ({ bike }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={bike.image_url.startsWith('http') ? bike.image_url : `http://localhost:5001${bike.image_url}`}
                    alt={bike.name}
                    className="w-full h-full object-cover transition transform hover:scale-105 duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-900 border border-gray-200">
                    ${bike.price_per_day}/day
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{bike.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${bike.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {bike.available ? 'Available' : 'Booked'}
                    </span>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{bike.description}</p>

                <div className="flex items-center space-x-4 mb-4 text-xs text-gray-400">
                    <div className="flex items-center">
                        <Settings className="w-4 h-4 mr-1" />
                        {bike.specs?.engine || 'N/A'}
                    </div>
                    <div className="flex items-center">
                        <Droplets className="w-4 h-4 mr-1" />
                        {bike.specs?.fuel_capacity || 'N/A'}
                    </div>
                </div>

                <Link
                    to={`/bikes/${bike._id}`}
                    className="block w-full text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-primary transition font-medium"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default BikeCard;
