const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // Use Environment Variables for security on Vercel
    const uri = process.env.MONGODB_URI; 
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("tantraDB");
        const collection = db.collection("students");

        await collection.insertOne({
            ...req.body,
            timestamp: new Date()
        });

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
};