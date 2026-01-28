import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast, Toaster } from 'react-hot-toast';
import { Trash, Edit, Plus, X } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('bikes');
    const [bikes, setBikes] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingBike, setEditingBike] = useState(null);

    useEffect(() => {
        fetchBikes();
        fetchBookings();
    }, []);

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        }
    }, [activeTab]);

    const fetchBikes = async () => {
        try {
            const { data } = await api.get('/bikes');
            setBikes(data);
        } catch (error) { console.error(error); }
    };

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings');
            setBookings(data);
        } catch (error) { console.error(error); }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/auth/users');
            setUsers(data);
        } catch (error) { console.error(error); }
    }

    const handleDeleteBike = async (id) => {
        if (window.confirm('Are you sure?')) {
            await api.delete(`/bikes/${id}`);
            fetchBikes();
            toast.success('Bike deleted');
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            try {
                await api.delete(`/auth/users/${id}`);
                fetchUsers();
                toast.success('User removed');
            } catch (error) {
                toast.error('Failed to remove user');
            }
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('bikes')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'bikes' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        Manage Bikes
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'bookings' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        All Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'users' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        Manage Users
                    </button>
                </div>

                {activeTab === 'bikes' && (
                    <div>
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => { setEditingBike(null); setShowModal(true); }}
                                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add Bike
                            </button>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bikes.map(bike => (
                                        <tr key={bike._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bike.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${bike.price_per_day}/day</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bike.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {bike.available ? 'Available' : 'Unavailable'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => { setEditingBike(bike); setShowModal(true); }} className="text-blue-600 hover:text-blue-900 mr-4">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteBike(bike._id)} className="text-red-600 hover:text-red-900">
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bike</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map(booking => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{booking._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.bike?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${booking.total_price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.role !== 'admin' && (
                                                <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900">
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal for Add/Edit Bike */}
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-2xl font-bold mb-6">{editingBike ? 'Edit Bike' : 'Add New Bike'}</h2>
                            <BikeForm bike={editingBike} onSuccess={() => { setShowModal(false); fetchBikes(); }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const BikeForm = ({ bike, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        model: '',
        price_per_day: '',
        location: '',
        description: '',
        engine: '', // flattened specs for simplicity
        power: '',
        weight: '',
        fuel_capacity: '',
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (bike) {
            setFormData({
                name: bike.name,
                model: bike.model,
                price_per_day: bike.price_per_day,
                location: bike.location,
                description: bike.description,
                engine: bike.specs?.engine || '',
                power: bike.specs?.power || '',
                weight: bike.specs?.weight || '',
                fuel_capacity: bike.specs?.fuel_capacity || ''
            });
        }
    }, [bike]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (['engine', 'power', 'weight', 'fuel_capacity'].includes(key)) return;
            data.append(key, formData[key]);
        });

        const specs = {
            engine: formData.engine,
            power: formData.power,
            weight: formData.weight,
            fuel_capacity: formData.fuel_capacity
        };
        data.append('specs', JSON.stringify(specs));

        if (image) {
            data.append('image', image);
        }

        try {
            if (bike) {
                await api.put(`/bikes/${bike._id}`, data);
            } else {
                await api.post('/bikes', data);
            }
            toast.success(bike ? 'Bike updated' : 'Bike added');
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    placeholder="Name"
                    required
                    className="border p-2 rounded"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    placeholder="Model"
                    required
                    className="border p-2 rounded"
                    value={formData.model}
                    onChange={e => setFormData({ ...formData, model: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price per day"
                    required
                    className="border p-2 rounded"
                    value={formData.price_per_day}
                    onChange={e => setFormData({ ...formData, price_per_day: e.target.value })}
                />
                <input
                    placeholder="Location"
                    required
                    className="border p-2 rounded"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
            </div>
            <textarea
                placeholder="Description"
                className="border p-2 rounded w-full"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
            ></textarea>

            <div className="grid grid-cols-2 gap-4">
                <input placeholder="Engine" className="border p-2 rounded" value={formData.engine} onChange={e => setFormData({ ...formData, engine: e.target.value })} />
                <input placeholder="Power" className="border p-2 rounded" value={formData.power} onChange={e => setFormData({ ...formData, power: e.target.value })} />
                <input placeholder="Weight" className="border p-2 rounded" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                <input placeholder="Fuel Capacity" className="border p-2 rounded" value={formData.fuel_capacity} onChange={e => setFormData({ ...formData, fuel_capacity: e.target.value })} />
            </div>

            <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
                className="block"
            />

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600">
                {bike ? 'Update Bike' : 'Add Bike'}
            </button>
        </form>
    );
};

export default AdminDashboard;
