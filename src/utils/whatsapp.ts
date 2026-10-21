import { siteConfig } from '../config/siteConfig';
import { CustomTripFormData, TourPackage } from '../types';

/**
 * Generates a direct WhatsApp click-to-chat URL with URL-encoded prefilled message.
 */
export function createWhatsAppUrl(message: string, customNumber?: string): string {
  const number = (customNumber || siteConfig.contact.whatsappNumber).replace(/\D/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Builds a WhatsApp message for a specific Tour Package inquiry.
 */
export function getPackageEnquiryUrl(pkg: TourPackage): string {
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

  return createWhatsAppUrl(message);
}

/**
 * Builds a WhatsApp message for a Customised Holiday request.
 */
export function getCustomTripEnquiryUrl(data: CustomTripFormData): string {
  const message = `Hello Sanzar Tourz! ✈️

I would like to request a Customised Holiday plan:

👤 Name: ${data.fullName}
📞 Phone: ${data.phone || 'Not provided'}
🛫 Departure City: ${data.departureCity}
🏝️ Preferred Destination: ${data.destination}
📅 Tentative Travel Dates: ${data.travelDates}
👥 Number of Travellers: ${data.travellerCount}
💵 Estimated Budget: ${data.estimatedBudget ? `₹${data.estimatedBudget}` : 'Flexible'}
📝 Specific Preferences / Notes: ${data.preferences || 'Standard leisure trip'}

Looking forward to your suggestions and a personalised itinerary!`;

  return createWhatsAppUrl(message);
}

/**
 * Builds a WhatsApp message for general enquiries.
 */
export function getGeneralEnquiryUrl(subject: string = 'General Inquiry'): string {
  const message = `Hello Sanzar Tourz! 👋

I am contacting you from your website regarding ${subject}.
I would love to learn more about your travel planning services and tour packages.`;

  return createWhatsAppUrl(message);
}
