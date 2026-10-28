import React from 'react';
import { Sparkles, CheckCircle2, HeartHandshake, MapPin, MessageCircle } from 'lucide-react';

const REASONS = [
  {
    title: 'Stylish Clothing Collections',
    description:
      'Trendy styles and traditional elegance carefully curated to suit everyday life, festive celebrations, and work.',
    icon: Sparkles,
  },
  {
    title: 'Quality-Focused Products',
    description:
      'Durable stitching, skin-friendly fabrics, and rich textures chosen to keep you feeling comfortable and confident.',
    icon: CheckCircle2,
  },
  {
    title: 'Friendly Customer Service',
    description:
      'Warm, personalized assistance to help you pick the right fit, fabric, and styling for you and your family.',
    icon: HeartHandshake,
  },
  {
    title: 'Convenient Local Shopping',
    description:
      'Easily accessible store at Rajpur Crossing on Aurai Road in Bhadohi, with hassle-free trials and exchanges.',
    icon: MapPin,
  },
  {
    title: 'Easy Contact & Enquiries',
    description:
      'Instant WhatsApp assistance and direct phone support so you can check stock, sizes, and new arrivals anytime.',
    icon: MessageCircle,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-[#faf8f5] border-b border-[#ece5da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8c774b] mb-2">
            The ShopAtDoor Promise
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
            Why Choose ShopAtDoor?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534e]">
            Your trusted fashion destination in Bhadohi, committed to bringing style, quality, and warm hospitality to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white p-6 rounded-lg border border-[#e8dfd1] hover:border-[#d4af37] transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#f4efe6] text-[#8c774b] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1c1917] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f7f4ed] text-[11px] font-medium text-[#8c774b]">
                  Priority standard · Bhadohi Store
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
