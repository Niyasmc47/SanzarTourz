import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import { defaultSeedConfig, defaultSeedPackages } from './defaultData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/packages - List all packages
app.get('/api/packages', async (_req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('packages');
    let packages = await collection.find({}).toArray();

    // Auto-seed if newly created database
    if (packages.length === 0) {
      await collection.insertMany(defaultSeedPackages);
      packages = await collection.find({}).toArray();
    }

    res.json({ success: true, packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

// POST /api/packages - Add new package
app.post('/api/packages', async (req, res) => {
  try {
    const newPkg = req.body;
    if (!newPkg || !newPkg.name) {
      return res.status(400).json({ success: false, error: 'Package name is required' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('packages');

    await collection.updateOne(
      { id: newPkg.id },
      { $set: newPkg },
      { upsert: true }
    );

    res.status(201).json({ success: true, package: newPkg });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ success: false, error: 'Failed to create package' });
  }
});

// PUT /api/packages/:id or PUT /api/packages - Edit package
app.put(['/api/packages/:id', '/api/packages'], async (req, res) => {
  try {
    const pkgId = req.params.id || req.body.id;
    const updatedPkg = req.body;

    if (!pkgId) {
      return res.status(400).json({ success: false, error: 'Package ID is required' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('packages');

    await collection.updateOne(
      { id: pkgId },
      { $set: { ...updatedPkg, id: pkgId } },
      { upsert: true }
    );

    res.json({ success: true, package: updatedPkg });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ success: false, error: 'Failed to update package' });
  }
});

// DELETE /api/packages/:id or DELETE /api/packages?id=...
app.delete(['/api/packages/:id', '/api/packages'], async (req, res) => {
  try {
    const id = req.params.id || (req.query.id as string);
    if (!id) {
      return res.status(400).json({ success: false, error: 'Package ID is required' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('packages');

    await collection.deleteOne({ id });
    res.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ success: false, error: 'Failed to delete package' });
  }
});

// GET /api/config - Get site configuration
app.get('/api/config', async (_req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('settings');
    let config = await collection.findOne({ id: 'site_config' });

    // Auto-seed if newly created database
    if (!config) {
      await collection.insertOne(defaultSeedConfig);
      config = await collection.findOne({ id: 'site_config' });
    }

    res.json({ success: true, config });
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

// PUT /api/config - Update site configuration
app.put('/api/config', async (req, res) => {
  try {
    const newConfig = req.body;
    if (!newConfig) {
      return res.status(400).json({ success: false, error: 'Config payload is required' });
    }

    const db = await connectToDatabase();
    const collection = db.collection('settings');

    await collection.updateOne(
      { id: 'site_config' },
      { $set: { ...newConfig, id: 'site_config' } },
      { upsert: true }
    );

    res.json({ success: true, config: newConfig });
  } catch (error) {
    console.error('Error updating config:', error);
    res.status(500).json({ success: false, error: 'Failed to update config' });
  }
});

// Start Express server
app.listen(PORT, async () => {
  console.log(`🚀 Sanzar Tourz API server listening on http://localhost:${PORT}`);
  try {
    await connectToDatabase();
  } catch {
    console.log('⚠️ MongoDB not connected yet. Add MONGODB_URI in .env to connect.');
  }
});

export default app;
