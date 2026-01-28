const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./src/models/User');
const Bike = require('./src/models/Bike');
const Booking = require('./src/models/Booking');
const connectDB = require('./src/config/db');

dotenv.config();

connectDB();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
    }
];

const bikes = [
    {
        name: 'Speedster 3000',
        model: 'X-2024',
        price_per_day: 50,
        image_url: '/uploads/bike1.jpg',
        location: 'New York',
        description: 'A fast and reliable bike for city cruising.',
        specs: {
            engine: '300cc',
            power: '35hp',
            weight: '150kg',
            fuel_capacity: '12L'
        }
    },
    {
        name: 'Mountain King',
        model: 'MK-500',
        price_per_day: 75,
        image_url: '/uploads/bike2.jpg',
        location: 'Denver',
        description: 'Perfect for off-road adventures.',
        specs: {
            engine: '500cc',
            power: '45hp',
            weight: '180kg',
            fuel_capacity: '15L'
        }
    },
    {
        name: 'City Commuter',
        model: 'CC-125',
        price_per_day: 30,
        image_url: '/uploads/bike3.jpg',
        location: 'San Francisco',
        description: 'Economical and easy to handle.',
        specs: {
            engine: '125cc',
            power: '12hp',
            weight: '110kg',
            fuel_capacity: '8L'
        }
    }
];

const importData = async () => {
    try {
        await Booking.deleteMany();
        await Bike.deleteMany();
        await User.deleteMany();

        const createdUsers = [];
        for (const user of users) {
            const newUser = new User(user);
            await newUser.save();
            createdUsers.push(newUser);
        }
        const adminUser = createdUsers[0]._id;

        const sampleBikes = bikes.map((bike) => {
            return { ...bike };
        });

        await Bike.insertMany(sampleBikes);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Booking.deleteMany();
        await Bike.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
