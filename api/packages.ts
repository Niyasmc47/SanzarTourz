import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from './lib/mongodb';

// Default fallback packages to seed if database collection is empty
const defaultPackages = [
  {
    id: "pkg-intl-dubai-escape",
    name: "Dubai City & Desert Experience",
    destination: "Dubai",
    country: "United Arab Emirates",
    category: "international",
    duration: "5 Days / 4 Nights",
    featured: true,
    pricePerPerson: 42000,
    priceFormatted: "₹42,000",
    tag: "Popular",
    shortDescription: "Experience modern architectural marvels, golden desert safaris with dune bashing, and relaxing Marina dhow cruises.",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [],
    highlights: [
      "Burj Khalifa observation deck experience",
      "Premium Desert Safari with BBQ dinner & cultural dance show",
      "Dubai Marina Dhow cruise with buffet dinner",
      "Guided city tour including Dubai Frame and Gold Souk"
    ],
    availableDates: ["Flexible Weekly Departures", "Autumn & Winter Season Batches"],
    dayByDayItinerary: [
      { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise", description: "Arrive at Dubai International Airport. Private transfer to your hotel. Evening Marina Dhow Cruise with dinner." },
      { day: 2, title: "Half-Day City Highlights & Burj Khalifa", description: "Explore the Dubai Frame, Palm Jumeirah, and ascend to Burj Khalifa 124th floor." },
      { day: 3, title: "Afternoon Red Dune Desert Safari", description: "4x4 dune bashing, camel rides, sandboarding, and an authentic Arabian camp buffet dinner." },
      { day: 4, title: "Day at Leisure or Optional Abu Dhabi Excursion", description: "Shopping or optional full-day guided trip to Sheikh Zayed Grand Mosque in Abu Dhabi." },
      { day: 5, title: "Souk Exploration & Departure Transfer", description: "Leisurely breakfast and airport transfer for return flight." }
    ],
    inclusions: [
      "4 Nights accommodation in 4-star city hotel",
      "Daily international breakfast buffet",
      "Airport transfers on private basis",
      "Desert Safari with BBQ dinner & transfers",
      "Marina Dhow Cruise with dinner",
      "Burj Khalifa non-peak tickets (124th floor)"
    ],
    exclusions: [
      "International airfare and UAE visa fees",
      "Tourism Dirham Fee payable at hotel",
      "Personal expenses and travel insurance"
    ]
  },
  {
    id: "pkg-in-kashmir-paradise",
    name: "Jewels of Kashmir",
    destination: "Srinagar, Gulmarg & Pahalgam",
    country: "India",
    category: "india",
    duration: "6 Days / 5 Nights",
    featured: true,
    pricePerPerson: 28500,
    priceFormatted: "₹28,500",
    tag: "Bestseller",
    shortDescription: "Experience heavenly Himalayan valleys, traditional Dal Lake shikara rides, snow-kissed Gulmarg meadows, and pine-clad Pahalgam.",
    heroImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [],
    highlights: [
      "Deluxe Houseboat stay on Dal Lake",
      "1-hour romantic Shikara ride at sunset",
      "Gulmarg Gondola cable car up to snow line",
      "Scenic drive through saffron fields to Pahalgam"
    ],
    availableDates: ["Departures available spring, summer & winter", "Tulip festival batches"],
    dayByDayItinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake Shikara", description: "Meet on arrival at Srinagar Airport. Transfer to your luxury houseboat. Evening Shikara ride." },
      { day: 2, title: "Mughal Gardens of Srinagar", description: "Visit Shalimar Bagh, Nishat Bagh, and Shankaracharya Temple." },
      { day: 3, title: "Gulmarg Meadow of Flowers Excursion", description: "Day excursion to Gulmarg. Ride the world-famous Gulmarg Gondola for breathtaking snow views." },
      { day: 4, title: "Srinagar to Valley of Shepherds, Pahalgam", description: "Drive along the Lidder River to picturesque Pahalgam." },
      { day: 5, title: "Pahalgam Leisure & Return to Srinagar", description: "Explore local handicraft shops in Pahalgam. Drive back to Srinagar." },
      { day: 6, title: "Departure from Srinagar", description: "Transfer to Srinagar Airport with sweet memories." }
    ],
    inclusions: [
      "1 Night stay in Premium Dal Lake Houseboat",
      "3 Nights stay in Srinagar 4-star hotel",
      "1 Night stay in Pahalgam riverside resort",
      "Daily breakfast and dinner (MAP plan)",
      "Exclusive private vehicle for all transfers",
      "1-Hour Dal Lake Shikara ride"
    ],
    exclusions: [
      "Airfare to/from Srinagar",
      "Gondola cable car tickets",
      "Personal expenses and gratuities"
    ]
  }
];

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
        await collection.insertMany(defaultPackages);
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
