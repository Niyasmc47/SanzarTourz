export const defaultSeedConfig = {
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

export const defaultSeedPackages = [
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
      { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise", description: "Arrive at Dubai International Airport. Private transfer to your hotel. Relax and refresh. In the evening, enjoy a 2-hour Marina Dhow Cruise." },
      { day: 2, title: "Half-Day City Highlights & Burj Khalifa", description: "Explore the Dubai Frame, Palm Jumeirah, and ascend Burj Khalifa 124th floor." },
      { day: 3, title: "Afternoon Red Dune Desert Safari", description: "4x4 dune bashing, camel rides, sandboarding, and an authentic Arabian camp buffet dinner." },
      { day: 4, title: "Day at Leisure or Optional Abu Dhabi Excursion", description: "Spend your day exploring shopping souks or opt for a full-day guided trip to Abu Dhabi." },
      { day: 5, title: "Souk Exploration & Departure Transfer", description: "Leisurely breakfast, check-out, and transfer to Dubai International Airport." }
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
      "Tourism Dirham Fee payable directly at the hotel",
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
      { day: 1, title: "Arrival in Srinagar & Dal Lake Shikara", description: "Meet on arrival at Srinagar Airport. Transfer to your luxury houseboat. Enjoy evening Shikara ride." },
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
