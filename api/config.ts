import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from './lib/mongodb';

const defaultConfig = {
  id: 'site_config',
  brandName: "Sanzar Tourz",
  brandSlogan: "Travel. Breathe. Unwind.",
  baseLocation: {
    city: "Palakkad",
    state: "Kerala",
    country: "India",
    formattedAddress: "Palakkad, Kerala, India - 678001",
    shortLocation: "Palakkad, Kerala, India"
  },
  contact: {
    whatsappNumber: "919876543210",
    whatsappDisplayNumber: "+91 98765 43210",
    phoneNumber: "+91 98765 43210",
    email: "enquiry@sanzartourz.com",
    workingHours: "Monday – Saturday: 9:30 AM – 7:00 PM IST",
    workingDaysNotice: "Sunday: Closed (WhatsApp enquiries open)"
  },
  socialLinks: {
    instagram: "https://instagram.com/sanzartourz",
    facebook: "https://facebook.com/sanzartourz",
    whatsappChannel: "https://wa.me/919876543210",
  },
  about: {
    tagline: "Boutique Travel Planning Crafted with Care",
    shortBio: "Based in Palakkad, Kerala, Sanzar Tourz is dedicated to curating seamless holiday experiences, customized itineraries, and memorable journeys across India and global destinations.",
    story: "Sanzar Tourz was founded with a genuine passion for travel and personal service. We believe travel is not just about visiting places, but about stepping away from routine to breathe, unwind, and create meaningful memories with family and friends. From our home in Palakkad, Kerala, we assist travellers with tailored itineraries, handpicked stays, and attentive guidance every step of the way.",
    philosophy: "We place thoughtfulness, flexibility, and honest advice at the center of every itinerary we build.",
    values: [
      { title: "Personalised Travel Planning", description: "Every traveller is unique. We tailor each itinerary to match your personal interests, pacing, and group dynamics." },
      { title: "Customised Holiday Experiences", description: "From tranquil retreats to cultural explorations, we help you shape trips that feel authentically yours." },
      { title: "Enquiry Assistance", description: "Direct WhatsApp support and prompt responses to assist you from initial ideas through to trip completion." },
      { title: "Flexible Travel Preferences", description: "Choose your preferred dates, hotel categories, meal preferences, and pace without rigid constraints." }
    ]
  }
};

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
        await collection.insertOne(defaultConfig);
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

