import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';
import { MapPin, Calendar, CreditCard, Info, ArrowLeft } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const BikeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        const fetchBike = async () => {
            try {
                const { data } = await api.get(`/bikes/${id}`);
                setBike(data);
            } catch (error) {
                console.error('Error fetching bike:', error);
                toast.error('Failed to load bike details');
            } finally {
                setLoading(false);
            }
        };
        fetchBike();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            toast.error('Please login to book a bike');
            navigate('/login');
            return;
        }

        const days = differenceInDays(endDate, startDate) + 1;
        if (days <= 0) {
            toast.error('End date must be after start date');
            return;
        }

        const totalPrice = days * bike.price_per_day;

        try {
            await api.post('/bookings', {
                bikeId: bike._id,
                startDate,
                endDate,
                totalPrice
            });
            toast.success('Booking request submitted successfully!');
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            console.error('Booking failed:', error);
            toast.error('Booking failed. Please try again.');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!bike) return <div className="text-center py-20">Bike not found</div>;

    const days = Math.max(1, differenceInDays(endDate, startDate) + 1);
    const total = days * bike.price_per_day;

    return (
        <div className="bg-white min-h-screen py-10">
            <Toaster />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary mb-6 transition">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                            <img
                                src={bike.image_url.startsWith('http') ? bike.image_url : `http://localhost:5001${bike.image_url}`}
                                alt={bike.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Placeholders for gallery if we had more images */}
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="rounded-lg overflow-hidden h-24 bg-gray-100">
                                    <img
                                        src={bike.image_url.startsWith('http') ? bike.image_url : `http://localhost:5001${bike.image_url}`}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details & Booking */}
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{bike.name}</h1>
                                <p className="text-lg text-gray-500 font-medium">{bike.model}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-primary">${bike.price_per_day}</p>
                                <p className="text-sm text-gray-500">per day</p>
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-600">
                            <MapPin className="w-5 h-5 mr-2" />
                            {bike.location}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-3">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                {bike.specs && Object.entries(bike.specs).map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">{key.replace('_', ' ')}</span>
                                        <span className="font-semibold text-gray-900">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{bike.description}</p>
                        </div>

                        {/* Booking Card */}
                        <div className="mt-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-lg font-bold mb-4">Book this Ride</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={new Date()}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-semibold">{days} Day{days > 1 ? 's' : ''}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={!bike.available}
                                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition transform hover:-translate-y-1 ${bike.available ? 'bg-primary hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                            >
                                {bike.available ? 'Confirm Booking' : 'Currently Unavailable'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeDetail;
