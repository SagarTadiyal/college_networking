import mongoose from 'mongoose';

// const mongoURL = 'mongodb://localhost:27017/Networking_Project';
const mongoURL ='mongodb+srv://sagar:sagarbhai@collegesocial.tdlzt.mongodb.net/CSN';
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 10000, // Increased timeout for better reliability
});

const db = mongoose.connection;

db.on('connected', () => console.log('✅ Connected to MongoDB server'));
db.on('error', (err) => console.error('❌ MongoDB connection error:', err));
db.on('disconnected', () => console.log('🔌 Disconnected from MongoDB server'));

export default db;
