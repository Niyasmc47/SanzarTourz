import { siteConfig } from '../config/siteConfig';
import { CustomTripFormData, TourPackage } from '../types';

/**
 * Resolves the currently active WhatsApp number from localStorage or default configuration.
 */
export function getActiveWhatsAppNumber(customNumber?: string): string {
  if (customNumber) return customNumber;
  try {
    const saved = localStorage.getItem('sanzar_tourz_site_config_v2') || localStorage.getItem('sanzar_tourz_site_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.contact?.whatsappNumber) {
        return parsed.contact.whatsappNumber;
      }
    }
  } catch {
    // fallback to static config
  }
  return siteConfig.contact.whatsappNumber;
}

/**
 * Generates a direct WhatsApp click-to-chat URL with URL-encoded prefilled message.
 */
export function createWhatsAppUrl(message: string, customNumber?: string): string {
  const number = getActiveWhatsAppNumber(customNumber).replace(/\D/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Builds a WhatsApp message for a specific Tour Package inquiry.
 */
export function getPackageEnquiryUrl(pkg: TourPackage, customNumber?: string): string {
  const priceText = pkg.pricePerPerson 
    ? `₹${pkg.pricePerPerson.toLocaleString('en-IN')} per person`
    : 'Price on request';

  const message = `Hello Sanzar Tourz! 👋

I am interested in your tour package:
🏷️ Package: ${pkg.name}
📍 Destination: ${pkg.destination}, ${pkg.country}
⏱️ Duration: ${pkg.duration}
💰 Approx. Price: ${priceText}

Could you please share more details, upcoming available dates, and customized pricing for my group? Thank you!`;

  return createWhatsAppUrl(message, customNumber);
}

/**
 * Builds a WhatsApp message for a Customised Holiday request.
 */
export function getCustomTripEnquiryUrl(data: CustomTripFormData, customNumber?: string): string {
  let travellerDetails = '';
  if (typeof data.adultsCount === 'number') {
    const adultsText = `${data.adultsCount} ${data.adultsCount === 1 ? 'Adult' : 'Adults'}`;
    if (data.childrenCount && data.childrenCount > 0) {
      const childrenText = `${data.childrenCount} ${data.childrenCount === 1 ? 'Child' : 'Children'}`;
      const validAges = (data.childAges || []).filter(Boolean);
      const agesText = validAges.length > 0
        ? ` (Age${validAges.length > 1 ? 's' : ''}: ${validAges.join(', ')})`
        : '';
      travellerDetails = `${adultsText}, ${childrenText}${agesText}`;
    } else {
      travellerDetails = adultsText;
    }
  } else {
    travellerDetails = data.travellerCount || 'Not specified';
  }

  const message = `Hello Sanzar Tourz! ✈️

I would like to request a Customised Holiday plan:

👤 Name: ${data.fullName}
📞 Phone: ${data.phone || 'Not provided'}
🛫 Departure City: ${data.departureCity}
🏝️ Preferred Destination: ${data.destination}
📅 Tentative Travel Dates: ${data.travelDates}
👥 Number of Travellers: ${travellerDetails}
💵 Estimated Budget: ${data.estimatedBudget ? `₹${data.estimatedBudget}` : 'Flexible'}
📝 Specific Preferences / Notes: ${data.preferences || 'Standard leisure trip'}

Looking forward to your suggestions and a personalised itinerary!`;

  return createWhatsAppUrl(message, customNumber);
}

/**
 * Builds a WhatsApp message for general enquiries.
 */
export function getGeneralEnquiryUrl(subject: string = 'General Inquiry', customNumber?: string): string {
  const message = `Hello Sanzar Tourz! 👋

I am contacting you from your website regarding ${subject}.
I would love to learn more about your travel planning services and tour packages.`;

  return createWhatsAppUrl(message, customNumber);
}
