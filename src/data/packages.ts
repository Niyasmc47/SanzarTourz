import { TourPackage, DestinationCard } from '../types';

/**
 * SANZAR TOURZ — TOUR PACKAGES DATA
 * 
 * NOTE FOR MAINTAINERS:
 * To add, edit, or remove tour packages, edit the items in the `tourPackages` array below.
 * Each package supports full day-by-day itineraries, inclusions, exclusions, dates, and prices.
 * Set `pricePerPerson: null` to display "Price on request".
 */

export const tourPackages: TourPackage[] = [
  // --- INTERNATIONAL PACKAGES ---
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
    galleryImages: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Burj Khalifa observation deck experience",
      "Premium Desert Safari with BBQ dinner & cultural dance show",
      "Dubai Marina Dhow cruise with buffet dinner",
      "Guided city tour including Dubai Frame and Gold Souk"
    ],
    availableDates: [
      "Flexible Weekly Departures (Customisable)",
      "Autumn & Winter Season Batches"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Arrival in Dubai & Marina Dhow Cruise",
        description: "Arrive at Dubai International Airport. Private transfer to your hotel. Relax and refresh. In the evening, enjoy a 2-hour Marina Dhow Cruise with international buffet dining and sparkling skyline views."
      },
      {
        day: 2,
        title: "Half-Day City Highlights & Burj Khalifa",
        description: "Explore the Dubai Frame, Palm Jumeirah, and Jumeirah Mosque. In the afternoon, visit the Dubai Mall and ascend to the Burj Khalifa 124th-floor observation deck."
      },
      {
        day: 3,
        title: "Afternoon Red Dune Desert Safari",
        description: "Morning at leisure for shopping or relaxation. By afternoon, head out in 4x4 vehicles for exhilarating dune bashing, camel rides, sandboarding, and an authentic Arabian camp buffet dinner."
      },
      {
        day: 4,
        title: "Day at Leisure or Optional Abu Dhabi Excursion",
        description: "Spend your day exploring shopping souks, Miracle Garden, or opt for a full-day guided trip to Sheikh Zayed Grand Mosque in Abu Dhabi."
      },
      {
        day: 5,
        title: "Souk Exploration & Departure Transfer",
        description: "Leisurely breakfast, check-out, and transfer to Dubai International Airport for your flight back home."
      }
    ],
    inclusions: [
      "4 Nights accommodation in 4-star city hotel",
      "Daily international breakfast buffet",
      "Airport transfers on private basis",
      "Desert Safari with BBQ dinner & transfers",
      "Marina Dhow Cruise with dinner",
      "Burj Khalifa non-peak tickets (124th floor)",
      "Half-day Dubai city orientation tour"
    ],
    exclusions: [
      "International airfare and UAE visa fees",
      "Tourism Dirham Fee payable directly at the hotel",
      "Personal expenses, tips, and optional activities",
      "Travel insurance (recommended upon request)"
    ]
  },
  {
    id: "pkg-intl-malaysia-singapore",
    name: "Classic Malaysia & Singapore",
    destination: "Kuala Lumpur & Singapore",
    country: "Southeast Asia",
    category: "international",
    duration: "7 Days / 6 Nights",
    featured: true,
    pricePerPerson: 58000,
    priceFormatted: "₹58,000",
    tag: "Family Favorite",
    shortDescription: "A balanced twin-country itinerary featuring vibrant cityscapes, Batu Caves, Sentosa Island, and Gardens by the Bay.",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Petronas Twin Towers & Batu Caves in Kuala Lumpur",
      "Genting Highlands day trip with cable car",
      "Gardens by the Bay (Flower Dome & Cloud Forest)",
      "Sentosa Island cable car & beach sunset"
    ],
    availableDates: [
      "Available on Custom Dates Year-Round",
      "School Vacation & Holiday Batches"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Arrive in Kuala Lumpur",
        description: "Warm welcome at KLIA and transfer to hotel. Rest of the day free to unwind and explore Bukit Bintang."
      },
      {
        day: 2,
        title: "Kuala Lumpur City Tour & Batu Caves",
        description: "Visit King's Palace, National Monument, Batu Caves limestone shrine, and photo stop at the iconic Petronas Towers."
      },
      {
        day: 3,
        title: "Genting Highlands Excursion",
        description: "Scenic ride up the mountain including Awana SkyWay cable car and free time at SkyAvenue entertainment complex."
      },
      {
        day: 4,
        title: "Kuala Lumpur to Singapore by Road/Flight",
        description: "Transfer to Singapore. Check into your hotel. Evening visit to Marina Bay promenade and Spectra light show."
      },
      {
        day: 5,
        title: "Singapore City Tour & Gardens by the Bay",
        description: "Drive past Civic District, Merlion Park, Chinatown. Afternoon visit to the futuristic domes of Gardens by the Bay."
      },
      {
        day: 6,
        title: "Sentosa Island Highlights",
        description: "Cross over to Sentosa via cable car. Explore beaches, Madame Tussauds, and Wings of Time night show."
      },
      {
        day: 7,
        title: "Jewel Changi & Departure",
        description: "Check-out and transfer to Singapore Changi Airport. Discover Jewel Changi's indoor Rain Vortex before departure."
      }
    ],
    inclusions: [
      "3 Nights hotel stay in Kuala Lumpur",
      "3 Nights hotel stay in Singapore",
      "Daily breakfast at both hotels",
      "All intercity and airport transfers",
      "Sightseeing tours with standard entry tickets"
    ],
    exclusions: [
      "International flights & Singapore/Malaysia visas",
      "Universal Studios Singapore tickets (optional add-on)",
      "Meals other than breakfast",
      "Personal porterage and tips"
    ]
  },
  {
    id: "pkg-intl-bali-bliss",
    name: "Enchanting Bali Island Retreat",
    destination: "Ubud & Kuta",
    country: "Indonesia",
    category: "international",
    duration: "6 Days / 5 Nights",
    featured: false,
    pricePerPerson: null, // Price on request
    priceFormatted: "Price on request",
    tag: "Honeymoon & Leisure",
    shortDescription: "Immerse yourself in Bali's emerald rice terraces, sacred sea temples, serene Ubud rainforests, and stunning Indian Ocean sunsets.",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Tegallalang Rice Terraces & Jungle Swing",
      "Tanah Lot sea temple at dusk",
      "Uluwatu clifftop temple with Kecak Fire Dance",
      "Handpicked villa options with private pool"
    ],
    availableDates: [
      "Custom Departures Year-Round",
      "Best season: April through October"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Arrival in Denpasar & Ubud Transfer",
        description: "Arrive at Ngurah Rai Airport. Private driver transfer to Ubud's lush hill country. Evening relaxation."
      },
      {
        day: 2,
        title: "Ubud Cultural Trail & Rice Terraces",
        description: "Visit Sacred Monkey Forest Sanctuary, Ubud Palace, and the terraced landscape of Tegallalang."
      },
      {
        day: 3,
        title: "Kintamani Volcano & Coffee Plantation",
        description: "Scenic drive offering panoramic views of Mount Batur and Lake Batur, followed by local Luwak coffee tasting."
      },
      {
        day: 4,
        title: "Transfer to South Bali Coast & Tanah Lot",
        description: "Move towards Seminyak / Nusa Dua beach resort. Late afternoon visit to Tanah Lot temple set on an offshore rock."
      },
      {
        day: 5,
        title: "Water Sports & Uluwatu Sunset",
        description: "Optional Tanjung Benoa water sports. Sunset excursion to clifftop Uluwatu Temple overlooking crashing waves."
      },
      {
        day: 6,
        title: "Farewell Bali",
        description: "Relaxed breakfast and airport transfer for return flight."
      }
    ],
    inclusions: [
      "2 Nights stay in Ubud resort / villa",
      "3 Nights stay in South Bali beach resort",
      "Daily breakfast",
      "Private air-conditioned vehicle throughout tours",
      "English-speaking driver-guide",
      "Entrance fees to listed attractions"
    ],
    exclusions: [
      "Flight tickets and Indonesia Visa on Arrival (VoA)",
      "Meals not specified",
      "Personal water sports expenses"
    ]
  },
  {
    id: "pkg-intl-thailand-leisure",
    name: "Phuket & Krabi Coastal Getaway",
    destination: "Phuket & Krabi",
    country: "Thailand",
    category: "international",
    duration: "5 Days / 4 Nights",
    featured: false,
    pricePerPerson: 36000,
    priceFormatted: "₹36,000",
    tag: "Beach Escape",
    shortDescription: "Turquoise waters, limestone karst formations, Phi Phi island speedboats, and vibrant evening markets.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Phi Phi Island tour by speedboat with snorkeling",
      "Krabi 4-Island tour including Phra Nang Cave beach",
      "Patong Night Market and coastal viewpoints"
    ],
    availableDates: [
      "Weekly Custom Departures",
      "November to May Peak Season"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Arrive in Phuket",
        description: "Airport pickup and check-in. Evening at leisure strolling along Kata or Patong beach."
      },
      {
        day: 2,
        title: "Phi Phi Islands Speedboat Excursion",
        description: "Full day boat tour visiting Maya Bay, Viking Cave, and pristine snorkeling spots with lunch on the island."
      },
      {
        day: 3,
        title: "Phuket to Krabi Scenic Drive",
        description: "Scenic transfer from Phuket to Ao Nang, Krabi. Free evening to enjoy seaside cafes."
      },
      {
        day: 4,
        title: "Krabi 4-Island Longtail Tour",
        description: "Visit Koh Poda, Chicken Island, Tup Island, and Phra Nang Beach with crystal-clear waters."
      },
      {
        day: 5,
        title: "Departure from Krabi Airport",
        description: "Morning checkout and transfer to Krabi International Airport."
      }
    ],
    inclusions: [
      "2 Nights stay in Phuket 4-star hotel",
      "2 Nights stay in Krabi 4-star resort",
      "Daily breakfast",
      "Phi Phi Island tour with shared speedboat & lunch",
      "Krabi 4-Island tour with national park fees",
      "All airport and intercity transfers"
    ],
    exclusions: [
      "International flights and Thailand visa fees",
      "Personal expenses and water equipment rentals"
    ]
  },

  // --- INDIA PACKAGES ---
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
    galleryImages: [
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Deluxe Houseboat stay on Dal Lake",
      "1-hour romantic Shikara ride at sunset",
      "Gulmarg Gondola cable car up to snow line",
      "Scenic drive through saffron fields to Pahalgam"
    ],
    availableDates: [
      "Departures available spring, summer & winter",
      "Tulip festival batches (March/April)"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Dal Lake Shikara",
        description: "Meet on arrival at Srinagar Airport. Transfer to your luxury houseboat. Enjoy evening Shikara ride gliding past floating gardens and artisan markets."
      },
      {
        day: 2,
        title: "Mughal Gardens of Srinagar",
        description: "Visit Shalimar Bagh, Nishat Bagh, and the historic Shankaracharya Temple atop Gopadari Hill."
      },
      {
        day: 3,
        title: "Gulmarg Meadow of Flowers Excursion",
        description: "Day excursion to Gulmarg. Ride the world-famous Gulmarg Gondola (Phase 1 & 2 options) for breathtaking snow views."
      },
      {
        day: 4,
        title: "Srinagar to Valley of Shepherds, Pahalgam",
        description: "Drive along the Lidder River to picturesque Pahalgam. Walk through pine forests and visit Betaab Valley or Aru Valley."
      },
      {
        day: 5,
        title: "Pahalgam Leisure & Return to Srinagar",
        description: "Explore local handicraft shops in Pahalgam. Drive back to Srinagar for an overnight hotel stay."
      },
      {
        day: 6,
        title: "Departure from Srinagar",
        description: "Transfer to Srinagar Airport with sweet memories of the valley."
      }
    ],
    inclusions: [
      "1 Night stay in Premium Dal Lake Houseboat",
      "3 Nights stay in Srinagar 4-star hotel",
      "1 Night stay in Pahalgam riverside resort",
      "Daily breakfast and dinner (MAP plan)",
      "Exclusive private vehicle for all transfers and sightseeing",
      "1-Hour Dal Lake Shikara ride"
    ],
    exclusions: [
      "Airfare to/from Srinagar",
      "Gondola cable car tickets (recommended to book in advance)",
      "Pony rides and local union taxi in Betaab Valley",
      "Personal expenses and gratuities"
    ]
  },
  {
    id: "pkg-in-himachal-serenity",
    name: "Himachal Highlands: Shimla & Manali",
    destination: "Shimla, Manali & Solang",
    country: "India",
    category: "india",
    duration: "7 Days / 6 Nights",
    featured: true,
    pricePerPerson: 24500,
    priceFormatted: "₹24,500",
    tag: "Cool Climates",
    shortDescription: "Cedar forests, colonial Shimla promenades, gushing Beas river, and snow adventures in Solang Valley.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Shimla Mall Road & historic Christ Church",
      "Manali Hadimba Devi Temple & Old Manali cafes",
      "Solang Valley adventure & Atal Tunnel gateway",
      "Scenic drives across Himachal mountain passes"
    ],
    availableDates: [
      "All seasons customized itineraries",
      "Snow season & summer retreats"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Chandigarh to Shimla (Approx 4 hrs)",
        description: "Pickup from Chandigarh railway station or airport. Climb into the foothills to Shimla. Evening stroll along Mall Road."
      },
      {
        day: 2,
        title: "Kufri Sightseeing & Shimla Ridge",
        description: "Morning visit to Kufri for panoramic Himalayan views. Afternoon walking tour of Ridge, Lakkar Bazaar, and Christ Church."
      },
      {
        day: 3,
        title: "Shimla to Manali via Kullu Valley",
        description: "Picturesque journey winding past Pandoh Dam, Hanogi Mata temple, and Kullu shawl factories. Arrive in Manali."
      },
      {
        day: 4,
        title: "Manali Local Sightseeing",
        description: "Visit ancient 16th-century Hadimba Temple, Vashisht hot water sulphur springs, and Tibetan Monasteries."
      },
      {
        day: 5,
        title: "Solang Valley & Atal Tunnel Excursion",
        description: "Experience the majestic Solang Valley for paragliding or snow activities, continuing towards Sissu via Atal Tunnel."
      },
      {
        day: 6,
        title: "Naggar Castle & Leisure Day",
        description: "Explore historic Naggar Castle and local art galleries, or enjoy cafe culture in Old Manali."
      },
      {
        day: 7,
        title: "Manali to Chandigarh Departure",
        description: "Drive back to Chandigarh airport/railway station for onward journey."
      }
    ],
    inclusions: [
      "2 Nights hotel stay in Shimla",
      "4 Nights hotel stay in Manali",
      "Daily breakfast and dinner",
      "Dedicated private car for entire itinerary",
      "All toll, parking, driver allowances"
    ],
    exclusions: [
      "Airfare/train fare to Chandigarh",
      "Adventure activities and Solang ski passes",
      "Entry fees to monuments"
    ]
  },
  {
    id: "pkg-in-golden-triangle",
    name: "Royal Heritage: Delhi, Agra & Jaipur",
    destination: "Golden Triangle",
    country: "India",
    category: "india",
    duration: "6 Days / 5 Nights",
    featured: false,
    pricePerPerson: 26000,
    priceFormatted: "₹26,000",
    tag: "Cultural Classic",
    shortDescription: "A timeless heritage circuit traversing Mughal grandeur at the Taj Mahal and royal Rajput palaces in Jaipur.",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Sunrise visit to the iconic Taj Mahal in Agra",
      "Amber Fort jeep ride and City Palace in Jaipur",
      "Delhi historic landmarks: Qutub Minar & India Gate"
    ],
    availableDates: [
      "Flexible private departures year-round",
      "Best: October to March"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Arrive in Delhi",
        description: "Airport reception and city orientation tour covering India Gate, Parliament House drive-by, and Qutub Minar."
      },
      {
        day: 2,
        title: "Delhi to Agra via Yamuna Expressway",
        description: "Drive to Agra. Visit massive Agra Fort and view the Taj Mahal across the river from Mehtab Bagh at sunset."
      },
      {
        day: 3,
        title: "Taj Mahal Sunrise & Drive to Jaipur",
        description: "Experience the ethereal Taj Mahal at sunrise. Proceed to Jaipur with an en-route stop at Fatehpur Sikri."
      },
      {
        day: 4,
        title: "Full Day in the Pink City, Jaipur",
        description: "Ascend Amber Fort, photograph the facade of Hawa Mahal, and explore City Palace and Jantar Mantar observatory."
      },
      {
        day: 5,
        title: "Jaipur Cultural Explorations & Bazaars",
        description: "Visit Nahargarh Fort overlooking Jaipur and enjoy time for authentic block printing and jewelry bazaars."
      },
      {
        day: 6,
        title: "Jaipur to Delhi Departure",
        description: "Drive back to New Delhi airport for your flight home."
      }
    ],
    inclusions: [
      "1 Night in Delhi, 1 Night in Agra, 3 Nights in Jaipur (4-star hotels)",
      "Daily breakfast buffet",
      "Chauffeur-driven AC Sedan / SUV",
      "Intercity transfers, parking, and toll taxes"
    ],
    exclusions: [
      "Monument entrance tickets",
      "Camera fees and guide gratuities",
      "Flights to and from Delhi"
    ]
  },
  {
    id: "pkg-in-andaman-islands",
    name: "Tropical Andaman & Havelock",
    destination: "Port Blair & Havelock Island",
    country: "India",
    category: "india",
    duration: "5 Days / 4 Nights",
    featured: false,
    pricePerPerson: null, // Price on request
    priceFormatted: "Price on request",
    tag: "Island Bliss",
    shortDescription: "Pristine white sand beaches, Radhanagar sunset, cruise transfers, and historic Cellular Jail sound & light show.",
    heroImage: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80"
    ],
    highlights: [
      "Radhanagar Beach (Asia's acclaimed beach)",
      "High-speed catamaran cruise between Port Blair and Havelock",
      "Cellular Jail light & sound history performance",
      "Elephant Beach coral reef and snorkeling zone"
    ],
    availableDates: [
      "Daily ferry departures from Port Blair",
      "Best season: October through May"
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: "Arrival at Port Blair & Cellular Jail",
        description: "Arrive at Veer Savarkar Airport. Hotel transfer. Afternoon visit to Cellular Jail and evening light and sound show."
      },
      {
        day: 2,
        title: "Catamaran to Havelock & Radhanagar Sunset",
        description: "Board luxury catamaran to Havelock Island. Check into beach resort and spend sunset at famous Radhanagar Beach."
      },
      {
        day: 3,
        title: "Elephant Beach Watersports",
        description: "Speedboat ride to Elephant Beach. Free time for snorkeling, sea walk, or glass-bottom boat rides."
      },
      {
        day: 4,
        title: "Return to Port Blair & City Shopping",
        description: "Morning ferry back to Port Blair. Visit Sagarika cottage industry emporium for pearl and shell crafts."
      },
      {
        day: 5,
        title: "Departure from Port Blair",
        description: "Transfer to airport for return flight."
      }
    ],
    inclusions: [
      "2 Nights stay in Port Blair hotel",
      "2 Nights stay in Havelock beach resort",
      "Daily breakfast",
      "Premium AC catamaran tickets (Makruzz / Green Ocean)",
      "All island transfers and entry passes"
    ],
    exclusions: [
      "Airfare to/from Port Blair",
      "Optional water sports activities (scuba, sea walking)",
      "Meals other than breakfast"
    ]
  }
];

/**
 * ILLUSTRATIVE POPULAR DESTINATIONS
 * As requested: "Display image-based destination cards for international and Indian destinations.
 * Use destinations only as illustrative examples. Do not present unconfirmed destinations as actual available packages."
 */
export const popularDestinations: DestinationCard[] = [
  {
    id: "dest-dubai",
    name: "Dubai",
    region: "Middle East",
    category: "international",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    shortTag: "Skyline & Dunes",
    isIllustrativeOnly: true
  },
  {
    id: "dest-kashmir",
    name: "Kashmir Valley",
    region: "North India",
    category: "india",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
    shortTag: "Snow & Shikaras",
    isIllustrativeOnly: true
  },
  {
    id: "dest-singapore",
    name: "Singapore",
    region: "Southeast Asia",
    category: "international",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    shortTag: "City of Gardens",
    isIllustrativeOnly: true
  },
  {
    id: "dest-himachal",
    name: "Himachal Pradesh",
    region: "North India",
    category: "india",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    shortTag: "Mountain Retreats",
    isIllustrativeOnly: true
  },
  {
    id: "dest-bali",
    name: "Bali",
    region: "Indonesia",
    category: "international",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    shortTag: "Tropical Serenity",
    isIllustrativeOnly: true
  },
  {
    id: "dest-rajasthan",
    name: "Rajasthan",
    region: "West India",
    category: "india",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    shortTag: "Royal Forts & Palaces",
    isIllustrativeOnly: true
  }
];
