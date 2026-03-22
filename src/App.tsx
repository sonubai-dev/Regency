import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Wind, 
  Zap, 
  Music, 
  Users, 
  Camera, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
  Map as MapIcon,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateEventImage, getNearbyInfo } from './services/gemini';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'AI Visualizer', href: '#ai-visualizer' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col">
          <span className={`text-2xl font-serif font-bold tracking-tight ${scrolled ? 'text-zinc-900' : 'text-white'}`}>Regency Banquets</span>
          <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${scrolled ? 'text-zinc-500' : 'text-zinc-300'}`}>Vasai–Nallasopara Banquet Hall</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${scrolled ? 'text-zinc-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="https://wa.me/919172979722" target="_blank" rel="noreferrer" className="btn-premium bg-amber-600 text-white hover:bg-amber-700 text-sm">
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled ? 'text-zinc-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-zinc-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-zinc-100 py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif text-zinc-800 hover:text-amber-600"
              >
                {link.name}
              </a>
            ))}
            <a href="https://wa.me/919172979722" target="_blank" rel="noreferrer" className="btn-premium bg-amber-600 text-white text-center mt-2">
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop" 
          alt="Banquets" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Make Your Occasion <br />
            <span className="italic text-amber-400">Unforgettable</span>
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light tracking-wide">
            Experience luxury and elegance at Vasai's premier banquet destination. 
            Perfect for weddings, corporate events, and celebrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-premium bg-amber-600 text-white hover:bg-amber-700">
              Book Now
            </a>
            <a href="https://wa.me/919172979722" target="_blank" rel="noreferrer" className="btn-premium bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center gap-2">
              <MessageCircle size={20} />
              WhatsApp Chat
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Elegant Spaces for <br />Your Special Moments</h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed text-lg">
            <p>
              Located at Gayatri Plaza, Opp Fire Brigade, Vasai–Nallasopara Link Road, Regency Banquets offers a sophisticated setting for all your celebrations.
            </p>
            <p>
              With two magnificent halls on the 2nd and 3rd floors, we provide fully air-conditioned spaces designed to host 250–300 guests comfortably.
            </p>
            <ul className="grid grid-cols-2 gap-4 pt-4">
              {[
                'Weddings', 'Engagements', 'Birthdays', 'Corporate Events', 'Baby Showers', 'Anniversaries'
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="text-amber-600" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
              alt="Banquet Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl hidden lg:block max-w-xs shadow-xl">
            <p className="font-serif text-2xl mb-2 italic">"Luxury is in each detail"</p>
            <p className="text-sm text-zinc-500">— Regency Excellence</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Wind />, title: "Fully AC Hall", desc: "Stay cool and comfortable regardless of the weather." },
    { icon: <Zap />, title: "Generator Backup", desc: "Uninterrupted celebrations with our robust power backup." },
    { icon: <Music />, title: "Normal Sound System", desc: "Crystal clear audio for your speeches and music." },
    { icon: <Users />, title: "2 Changing Rooms", desc: "Private spaces for hosts and guests to prepare." },
    { icon: <Sparkles />, title: "Vidhi Mandap", desc: "Dedicated space for traditional ceremonies." },
    { icon: <Sparkles />, title: "Hawan Kund", desc: "Equipped for all religious rituals and hawan." },
    { icon: <Sparkles />, title: "Paat & Chaurang", desc: "Essential traditional furniture provided." },
    { icon: <Sparkles />, title: "Raja Rani Chair", desc: "Premium seating for the couple of the hour." },
    { icon: <Sparkles />, title: "White Sofa", desc: "Elegant lounge seating for VIP guests." },
    { icon: <Sparkles />, title: "Steel Chairs", desc: "With premium covers and decorative bows." },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Amenities</span>
          <h2 className="text-4xl md:text-5xl">Premium Features</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-feature"
            >
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-serif mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const policies = [
    "Booking amount: ₹30,000",
    "Full payment required 8 days before function",
    "Extra time: ₹5,000/hour",
    "Food quality same only up to 20 extra plates",
    "No parcel for balance plates",
    "Flower decoration extra charge",
    "Pets not allowed"
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Investment</span>
          <h2 className="text-4xl md:text-5xl">Transparent Pricing</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hall 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl border border-zinc-100 bg-white shadow-xl flex flex-col"
          >
            <h3 className="text-2xl font-serif mb-4">3rd Floor + Terrace</h3>
            <div className="text-4xl font-serif text-amber-600 mb-6">₹70,000 <span className="text-sm text-zinc-400 font-sans">/ Event</span></div>
            <p className="text-zinc-500 mb-8 text-sm">Perfect for larger gatherings with an open-air terrace experience.</p>
            <div className="mt-auto">
              <a href="https://wa.me/919172979722" className="w-full btn-premium bg-zinc-900 text-white block text-center">Enquire Now</a>
            </div>
          </motion.div>

          {/* Hall 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-3xl bg-zinc-900 text-white shadow-2xl flex flex-col scale-105 relative z-10"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Popular</div>
            <h3 className="text-2xl font-serif mb-4">2nd Floor Hall</h3>
            <div className="text-4xl font-serif text-amber-400 mb-6">₹60,000 <span className="text-sm text-zinc-400 font-sans">/ Event</span></div>
            <p className="text-zinc-400 mb-8 text-sm">Our premium fully AC hall, ideal for elegant indoor ceremonies.</p>
            <div className="mt-auto">
              <a href="https://wa.me/919172979722" className="w-full btn-premium bg-amber-600 text-white block text-center">Enquire Now</a>
            </div>
          </motion.div>

          {/* Policies */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-3xl border border-zinc-100 bg-zinc-50 shadow-xl"
          >
            <h3 className="text-2xl font-serif mb-6">Our Policies</h3>
            <ul className="space-y-4">
              {policies.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AIVisualizer = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [size, setSize] = useState('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    try {
      const img = await generateEventImage(prompt, aspectRatio, size);
      if (img) {
        setGeneratedImage(img);
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during generation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-visualizer" className="py-24 px-6 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-4 block">AI Powered</span>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Visualize Your <br /><span className="text-amber-400 italic">Dream Event</span></h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Not sure how to decorate? Use our AI visualizer to see how Regency Banquets can be transformed for your specific theme.
            </p>

            <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Event Theme / Decor Prompt</label>
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Royal Gold and White Wedding with floral arches"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Aspect Ratio</label>
                  <select 
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {['1:1', '3:4', '4:3', '9:16', '16:9', '21:9'].map(r => <option key={r} value={r} className="bg-zinc-900">{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Quality</label>
                  <select 
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {['1K', '2K', '4K'].map(s => <option key={s} value={s} className="bg-zinc-900">{s}</option>)}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="w-full btn-premium bg-amber-600 text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {loading ? 'Generating...' : 'Visualize Now'}
              </button>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-white/5 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center"
          >
            {generatedImage ? (
              <img src={generatedImage} alt="AI Generated Decor" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-12">
                <ImageIcon size={64} className="mx-auto mb-4 text-white/20" />
                <p className="text-zinc-500">Your AI visualization will appear here</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-amber-500 mb-4" size={48} />
                <p className="text-amber-500 font-medium">Gemini is crafting your vision...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [nearbyInfo, setNearbyInfo] = useState<any>(null);
  const [loadingNearby, setLoadingNearby] = useState(false);

  const fetchNearby = async () => {
    setLoadingNearby(true);
    try {
      // Coordinates for Gayatri Plaza area
      const info = await getNearbyInfo(19.4124, 72.8324);
      setNearbyInfo(info);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNearby(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl mb-12">Visit Our Venue</h2>
            
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-zinc-100 space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif mb-1">Address</h4>
                  <p className="text-zinc-500 leading-relaxed">
                    Gayatri Plaza, Opp. Fire Brigade, Vasai–Nallasopara Link Road, Vasai (E) – 401208
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif mb-1">Phone</h4>
                  <p className="text-zinc-500">+91 91729 79722</p>
                  <p className="text-zinc-500">9320656057</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif mb-1">Email</h4>
                  <p className="text-zinc-500">regencybanquets790@gmail.com</p>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <a href="tel:+919172979722" className="btn-premium bg-zinc-900 text-white flex items-center gap-2">
                  <Phone size={18} /> Call Now
                </a>
                <a href="https://wa.me/919172979722" target="_blank" rel="noreferrer" className="btn-premium bg-amber-600 text-white flex items-center gap-2">
                  <MessageCircle size={18} /> WhatsApp Now
                </a>
              </div>
            </div>

            {/* AI Nearby Info */}
            <div className="mt-8">
              <button 
                onClick={fetchNearby}
                className="text-amber-600 font-medium flex items-center gap-2 hover:underline"
              >
                <MapIcon size={18} />
                {loadingNearby ? 'Exploring...' : 'Explore Nearby Landmarks (AI)'}
              </button>
              {nearbyInfo && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-sm text-zinc-700"
                >
                  <p className="whitespace-pre-wrap">{nearbyInfo.text}</p>
                  {nearbyInfo.grounding.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-amber-200">
                      <p className="font-bold mb-2">Sources:</p>
                      <ul className="space-y-1">
                        {nearbyInfo.grounding.map((chunk: any, i: number) => (
                          <li key={i}>
                            <a href={chunk.web?.uri} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline">
                              {chunk.web?.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.435742295535!2d72.8302113!3d19.4124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI0JzQ0LjYiTiA3MsKwNDknNDguOCJF!5e0!3m2!1sen!2sin!4v1647950000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <h3 className="text-3xl font-serif mb-6">Regency Banquets</h3>
            <p className="text-zinc-400 max-w-md leading-relaxed">
              Creating timeless memories in the heart of Vasai–Nallasopara. 
              Our commitment to excellence ensures your special day is nothing short of perfection.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-serif mb-6">Quick Links</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-serif mb-6">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-600 transition-all"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
          <p>Copyright © {new Date().getFullYear()} Regency Banquets. All rights reserved.</p>
          <p>Designed for Vasai–Nallasopara</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 50 }}
          className="fixed bottom-24 right-6 z-50 max-w-[280px]"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden">
            <div className="bg-green-600 p-4 text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-sm">Regency Banquets</p>
                <p className="text-[10px] opacity-80">Online now</p>
              </div>
              <button onClick={() => setVisible(false)} className="ml-auto opacity-60 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 bg-zinc-50">
              <p className="text-xs text-zinc-600 mb-4">
                Hello! How can we help you plan your perfect event today?
              </p>
              <a 
                href="https://wa.me/919172979722" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-green-600 text-white rounded-lg py-2 text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                Start Chat
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/919172979722" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-float"
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Pricing />
      <AIVisualizer />
      <Contact />
      <Footer />
      <WhatsAppPopup />
      <FloatingWhatsApp />
    </div>
  );
}
