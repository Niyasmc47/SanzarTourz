import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from './lib/mongodb';
import { siteConfig } from '../src/config/siteConfig';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!clientPromise) {
    return res.status(200).json({
      success: false,
      message: 'MongoDB URI not configured. Using client-side configuration.',
      config: null
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'sanzartourz');
    const collection = db.collection('settings');

    if (req.method === 'GET') {
      let config = await collection.findOne({ id: 'site_config' });

      // Auto-seed if not yet set
      if (!config) {
        await collection.insertOne({ ...siteConfig, id: 'site_config' });
        config = await collection.findOne({ id: 'site_config' });
      }

      return res.status(200).json({ success: true, config });
    }

    if (req.method === 'PUT') {
      const newConfig = req.body;
      if (!newConfig) {
        return res.status(400).json({ success: false, error: 'Config payload is required' });
      }

      await collection.updateOne(
        { id: 'site_config' },
        { $set: { ...newConfig, id: 'site_config' } },
        { upsert: true }
      );

      return res.status(200).json({ success: true, config: newConfig });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('MongoDB config API error:', error);
    return res.status(500).json({ success: false, error: 'Failed to interact with database' });
  }
}
