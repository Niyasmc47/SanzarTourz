import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from './lib/mongodb';
import { tourPackages } from '../src/data/packages';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!clientPromise) {
    return res.status(200).json({
      success: false,
      message: 'MongoDB URI not configured. Using client-side storage.',
      packages: []
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'sanzartourz');
    const collection = db.collection('packages');

    if (req.method === 'GET') {
      let packages = await collection.find({}).toArray();

      // Auto-seed if collection is completely empty
      if (packages.length === 0) {
        await collection.insertMany(tourPackages);
        packages = await collection.find({}).toArray();
      }

      return res.status(200).json({ success: true, packages });
    }

    if (req.method === 'POST') {
      const newPackage = req.body;
      if (!newPackage || !newPackage.name) {
        return res.status(400).json({ success: false, error: 'Package name is required' });
      }

      await collection.updateOne(
        { id: newPackage.id },
        { $set: newPackage },
        { upsert: true }
      );

      return res.status(201).json({ success: true, package: newPackage });
    }

    if (req.method === 'PUT') {
      const updatedPackage = req.body;
      if (!updatedPackage || !updatedPackage.id) {
        return res.status(400).json({ success: false, error: 'Package ID is required' });
      }

      await collection.updateOne(
        { id: updatedPackage.id },
        { $set: updatedPackage },
        { upsert: true }
      );

      return res.status(200).json({ success: true, package: updatedPackage });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: 'Package ID is required' });
      }

      await collection.deleteOne({ id });
      return res.status(200).json({ success: true, deletedId: id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('MongoDB packages API error:', error);
    return res.status(500).json({ success: false, error: 'Failed to interact with database' });
  }
}
