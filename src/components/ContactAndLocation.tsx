import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/initialData';
import { validateContactForm, generateWhatsAppUrl } from '../utils/helpers';
import { ContactFormData, ContactFormErrors } from '../types';

export const ContactAndLocation: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable enquiry receipt
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleForwardToWhatsApp = () => {
    const formattedMsg = `Hello ShopAtDoor, my name is ${formData.name.trim()} (Phone: ${formData.phone.trim()}). Enquiry: ${formData.message.trim()}`;
    const url = generateWhatsAppUrl(STORE_INFO.whatsappNumber, formattedMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const defaultWhatsAppUrl = generateWhatsAppUrl(
    STORE_INFO.whatsappNumber,
    'Hello ShopAtDoor, I would like to enquire about your clothing collection.'
  );

  return (
    <section id="contact" className="py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8c774b] mb-2">
            Visit Or Enquire
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
            Store Location & Contact
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534e]">
            We are here to assist with size inquiries, fabric details, and store visits in Bhadohi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column: Business & Store Details */}
          <div className="space-y-6">
            <div className="bg-white p-7 rounded-lg border border-[#e8dfd1] shadow-xs space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8c774b]">
                  Verified Business
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1c1917] mt-1">
                  {STORE_INFO.name}
                </h3>
                <p className="text-xs text-[#78716c] mt-0.5">{STORE_INFO.category}</p>
              </div>

              {/* Address with Google Maps link */}
              <div className="flex items-start gap-3.5 pt-2">
                <div className="p-2.5 bg-[#f4efe6] rounded-md text-[#8c774b] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1c1917] uppercase tracking-wide">
                    Store Address
                  </div>
                  <p className="text-sm text-[#44403c] mt-1 leading-relaxed">
                    {STORE_INFO.address}
                  </p>
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-[#8c774b] hover:text-[#1c1917] underline"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone with click-to-call */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-[#f4efe6]">
                <div className="p-2.5 bg-[#f4efe6] rounded-md text-[#8c774b] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1c1917] uppercase tracking-wide">
                    Direct Phone Call
                  </div>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="text-base font-bold text-[#1c1917] hover:text-[#8c774b] transition-colors mt-0.5 inline-block"
                  >
                    {STORE_INFO.phone}
                  </a>
                  <p className="text-xs text-[#78716c] mt-0.5">
                    Click to call directly from your mobile phone
                  </p>
                </div>
              </div>

              {/* WhatsApp Enquiry */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-[#f4efe6]">
                <div className="p-2.5 bg-[#d4af37]/20 rounded-md text-[#8c774b] shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1c1917] uppercase tracking-wide">
                    WhatsApp Support
                  </div>
                  <p className="text-sm font-semibold text-[#1c1917] mt-0.5">
                    +91 {STORE_INFO.whatsappNumber.slice(2)}
                  </p>
                  <a
                    href={defaultWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#8c774b] hover:text-[#1c1917] underline"
                  >
                    <span>Open WhatsApp Chat with ShopAtDoor</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Store Hours & Visiting Note */}
            <div className="p-5 bg-[#f7f4ed] rounded-lg border border-[#e2d7c5] text-xs text-[#57534e] space-y-1">
              <div className="font-semibold text-[#1c1917]">Store Visiting Hours:</div>
              <div>Monday to Sunday: 10:00 AM – 9:00 PM</div>
              <div className="text-[#78716c] pt-1">
                Trial rooms available in store. Parking available near Rajpur Crossing.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="bg-white p-7 sm:p-8 rounded-lg border border-[#e8dfd1] shadow-xs">
            <h3 className="text-xl font-serif font-bold text-[#1c1917] mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#78716c] mb-6">
              Have questions about specific sizes, pricing, or custom orders? Send us a message and our store team in Bhadohi will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#f4f9f4] border border-[#c4e3c4] rounded-lg text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div>
                  <h4 className="text-base font-semibold text-[#1c1917]">
                    Thank you, {formData.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#57534e] mt-1">
                    Your enquiry has been received. Our Bhadohi store staff will contact you at{' '}
                    <strong>{formData.phone}</strong> shortly.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleForwardToWhatsApp}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#c49f2b] rounded-md transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send this enquiry directly to WhatsApp</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', message: '' });
                  }}
                  className="block text-xs text-[#78716c] hover:text-[#1c1917] underline mx-auto pt-2"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Mishra"
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-[#faf8f5] border rounded-md focus:outline-none focus:ring-1 ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-[#dcd3c4] focus:ring-[#8c774b]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9651394959 (10 digits)"
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-[#faf8f5] border rounded-md focus:outline-none focus:ring-1 ${
                      errors.phone
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-[#dcd3c4] focus:ring-[#8c774b]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Enquiry Details */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#1c1917] mb-1">
                    Enquiry Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for (e.g. Kurta for wedding, shirt sizes, store visit timing)..."
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-[#faf8f5] border rounded-md focus:outline-none focus:ring-1 ${
                      errors.message
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-[#dcd3c4] focus:ring-[#8c774b]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-[#1c1917] bg-[#d4af37] hover:bg-[#c49f2b] disabled:opacity-50 rounded-md transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
