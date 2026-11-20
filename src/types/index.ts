export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  country: string;
  category: 'international' | 'india';
  duration: string; // e.g. "5 Days / 4 Nights"
  featured?: boolean;
  pricePerPerson: number | null; // null represents "Price on request"
  priceFormatted?: string; // e.g. "₹45,000" or "On Request"
  shortDescription: string;
  heroImage: string;
  galleryImages: string[];
  highlights: string[];
  availableDates: string[];
  dayByDayItinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  tag?: string; // e.g. "Popular", "Customisable", "Trending"
}

export interface DestinationCard {
  id: string;
  name: string;
  region: string;
  category: 'international' | 'india';
  image: string;
  shortTag: string;
  isIllustrativeOnly?: boolean;
}

export interface CustomTripFormData {
  fullName: string;
  phone: string;
  departureCity: string;
  destination: string;
  travelDates: string;
  adultsCount: number;
  childrenCount: number;
  childAges: string[];
  travellerCount?: string;
  estimatedBudget: string;
  preferences: string;
}

export interface SiteConfig {
  brandName: string;
  brandSlogan: string;
  baseLocation: {
    city: string;
    state: string;
    country: string;
    formattedAddress: string;
    shortLocation: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappDisplayNumber: string;
    phoneNumber: string;
    email: string;
    workingHours: string;
    workingDaysNotice: string;
  };
  socialLinks: {
    instagram?: string;
    facebook?: string;
    whatsappChannel?: string;
  };
  about: {
    tagline: string;
    shortBio: string;
    story: string;
    philosophy: string;
    values: {
      title: string;
      description: string;
    }[];
  };
}
