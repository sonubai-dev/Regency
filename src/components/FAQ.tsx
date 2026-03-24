import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How can I book Regency Banquets for my event?",
    answer: "You can book our venue by contacting us directly via phone at +91 9172979722, messaging us on WhatsApp, or visiting our office in Vasai–Nallasopara. We recommend booking at least 3-6 months in advance for peak wedding seasons."
  },
  {
    question: "What services are included in the banquet rental?",
    answer: "Our rental packages typically include the banquet hall, basic lighting, sound system, air conditioning, and dedicated event staff. We also offer optional add-ons like premium decor, catering, and photography services."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We understand that plans can change. Cancellations made 60 days prior to the event are eligible for a partial refund of the booking deposit. Please contact our management team for specific terms and conditions based on your booking date."
  },
  {
    question: "Do you provide in-house catering?",
    answer: "Yes, we offer a wide range of delicious in-house catering options, from traditional Indian cuisine to international dishes. We can also customize menus based on your preferences and dietary requirements."
  },
  {
    question: "Can I bring my own decorator or caterer?",
    answer: "While we have an excellent in-house team, we are open to discussing external vendors for specific requirements. Please discuss this with our event manager during your initial consultation."
  }
];

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-semibold text-zinc-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-amber-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-500">Everything you need to know about planning your event at Regency Banquets.</p>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
