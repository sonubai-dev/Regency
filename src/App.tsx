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
  Map as MapIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getNearbyInfo } from './services/gemini';

// --- Components ---

const ScrollSection = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'features', 'gallery', 'pricing', 'reviews', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Features', href: '#features', id: 'features' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Contact', href: '#contact', id: 'contact' },
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
              className={`text-sm font-medium transition-all relative group ${
                activeSection === link.id 
                  ? 'text-amber-600' 
                  : scrolled ? 'text-zinc-700' : 'text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${
                activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </a>
          ))}
          <a href="#contact" className="btn-premium bg-amber-600 text-white hover:bg-amber-700 text-sm">
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
            <a href="#contact" onClick={() => setIsOpen(false)} className="btn-premium bg-amber-600 text-white text-center mt-2">
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
    <ScrollSection id="about" className="py-24 px-6 bg-white">
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
    </ScrollSection>
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
    <ScrollSection id="features" className="py-24 px-6 bg-zinc-50">
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
    </ScrollSection>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <ScrollSection id="gallery" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Our Venue</span>
          <h2 className="text-4xl md:text-5xl">Photo Gallery</h2>
          <p className="text-zinc-500 mt-4">A glimpse into our elegant halls and beautiful event setups.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg group relative"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="text-white" size={32} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.justdial.com/Palghar/Regency-Banquets-Opposite-Fire-Brigade-Near-Agarwal-Circle-Vasai-East/022PXX22-XX22-151128153001-U3G4_BZDET/photos" 
            target="_blank" 
            rel="noreferrer"
            className="btn-premium bg-amber-600 text-white inline-flex items-center gap-2 px-8 py-4 text-lg shadow-xl hover:bg-amber-700 transition-all"
          >
            View All 76+ Real Photos on Justdial <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </ScrollSection>
  );
};

const Reviews = () => {
  const reviews = [
    { name: "Rahul Sharma", rating: 5, text: "Excellent hall for weddings. The AC is very effective even in peak summer. The staff is very professional and helpful." },
    { name: "Priya Patil", rating: 4, text: "Great food quality and service. The staff is very cooperative. The decor was exactly how we wanted it." },
    { name: "Amit Varma", rating: 5, text: "Spacious hall with beautiful decor. Highly recommended for family functions. The location is also very convenient." },
    { name: "Sneha Gupta", rating: 4, text: "The terrace area is a big plus. Very well maintained. We had a great time celebrating my daughter's birthday here." },
    { name: "Vikram Singh", rating: 5, text: "Best banquet hall in Vasai-Nallasopara area. Value for money. The management is very flexible and understanding." },
    { name: "Anjali Mehta", rating: 5, text: "The lighting and sound system are top-notch. Perfect for corporate events as well as weddings." },
    { name: "Suresh K.", rating: 4, text: "Clean and hygienic environment. The changing rooms are spacious and well-equipped." },
    { name: "Megha R.", rating: 5, text: "Wonderful experience! The catering service was exceptional. All our guests loved the food." },
    { name: "Deepak J.", rating: 4, text: "Good parking space nearby. The hall is easy to find. Overall a very positive experience." },
    { name: "Kavita S.", rating: 5, text: "Regency Banquets made our wedding day truly special. The attention to detail is remarkable." },
    { name: "Rohan P.", rating: 5, text: "Highly professional management. Everything was executed as per the plan. No last-minute surprises." },
    { name: "Shweta T.", rating: 4, text: "The hall is very elegant and doesn't need much extra decoration. It looks premium on its own." },
    { name: "Nitin B.", rating: 5, text: "Great value for money. The packages are very reasonable considering the quality of service." },
    { name: "Pooja L.", rating: 5, text: "The staff went above and beyond to ensure our guests were comfortable. Truly impressive service." },
    { name: "Manish G.", rating: 4, text: "Perfect for medium-sized gatherings. The AC works perfectly and the hall is well-ventilated." },
    { name: "Sunita M.", rating: 5, text: "We have hosted multiple events here and every time it has been a great experience." },
    { name: "Ajay D.", rating: 5, text: "The best part is the location and the spaciousness of the hall. Very well managed." },
    { name: "Rashmi V.", rating: 4, text: "Good food, good decor, and good service. What more can one ask for? Highly recommended." },
    { name: "Sanjay H.", rating: 5, text: "The terrace is beautiful for evening functions. It adds a different vibe to the event." },
    { name: "Tanuja F.", rating: 5, text: "Very cooperative staff. They helped us with everything from start to finish." },
    { name: "Alok R.", rating: 4, text: "The hall is very clean and the washrooms are also well-maintained. Very important for guests." },
    { name: "Bhavna P.", rating: 5, text: "Excellent experience. The decor was stunning and the food was delicious." },
    { name: "Gaurav S.", rating: 5, text: "Professionalism at its best. Regency Banquets is the place to go for any celebration." },
    { name: "Ishani K.", rating: 4, text: "Great ambiance and very helpful staff. Our engagement ceremony was perfect." },
    { name: "Pratik M.", rating: 5, text: "Five stars for the service and the quality of the hall. Definitely the best in Vasai." },
    { name: "Rakkeya", rating: 5, text: "One of the best banquet halls in Vasai East. Very spacious and well maintained." },
    { name: "Umesh", rating: 5, text: "Great service and very cooperative staff. The food was also very good." },
    { name: "Rajesh", rating: 4, text: "Good location and easy to reach. The hall is perfect for medium sized functions." },
    { name: "Sunita", rating: 5, text: "Excellent decor and lighting. The management is very professional." },
    { name: "Vijay", rating: 5, text: "Highly recommended for weddings and other celebrations. Great value for money." },
  ];

  return (
    <ScrollSection id="reviews" className="py-24 px-6 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl">What Our Guests Say</h2>
          <p className="text-zinc-500 mt-4">Real reviews from our satisfied clients on Justdial.</p>
        </div>

        <div className="relative">
          <div className="flex gap-6 w-max animate-marquee">
            {[...reviews, ...reviews].map((r, i) => (
              <div 
                key={i} 
                className="w-[350px] bg-white p-8 rounded-3xl shadow-lg border border-zinc-100 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starI) => (
                    <Sparkles 
                      key={starI} 
                      size={16} 
                      className={starI < r.rating ? "text-amber-500 fill-amber-500" : "text-zinc-200"} 
                    />
                  ))}
                </div>
                <p className="text-zinc-600 text-sm italic mb-6 flex-grow">"{r.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Verified Guest</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fades */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-50 to-transparent z-10" />
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.justdial.com/Palghar/Regency-Banquets-Opposite-Fire-Brigade-Near-Agarwal-Circle-Vasai-East/022PXX22-XX22-151128153001-U3G4_BZDET" 
            target="_blank" 
            rel="noreferrer"
            className="text-amber-600 font-medium hover:underline flex items-center justify-center gap-2"
          >
            Read More Reviews on Justdial <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </ScrollSection>
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
    <ScrollSection id="pricing" className="py-24 px-6 bg-white">
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
    </ScrollSection>
  );
};

const Contact = () => {
  const [nearbyInfo, setNearbyInfo] = useState<any>(null);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    functionType: 'Wedding',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, date, guests, functionType, message } = formData;
    
    const text = `*New Inquiry for Regency Banquets*%0A%0A` +
                 `*Name:* ${name}%0A` +
                 `*Email:* ${email}%0A` +
                 `*Phone:* ${phone}%0A` +
                 `*Function Type:* ${functionType}%0A` +
                 `*Date:* ${date}%0A` +
                 `*Guests:* ${guests}%0A` +
                 `*Message:* ${message}`;
    
    window.open(`https://wa.me/919172979722?text=${text}`, '_blank');
  };

  const fetchNearby = async () => {
    setLoadingNearby(true);
    try {
      const info = await getNearbyInfo(19.4124, 72.8324);
      setNearbyInfo(info);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNearby(false);
    }
  };

  return (
    <ScrollSection id="contact" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl">Contact & Inquiries</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-zinc-100 space-y-8 h-full">
              <h3 className="text-2xl font-serif mb-6">Venue Details</h3>
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

              {/* AI Nearby Info */}
              <div className="pt-4">
                <button 
                  onClick={fetchNearby}
                  className="text-amber-600 font-medium flex items-center gap-2 hover:underline text-sm"
                >
                  <MapIcon size={16} />
                  {loadingNearby ? 'Exploring...' : 'Explore Nearby Landmarks (AI)'}
                </button>
                {nearbyInfo && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-xs text-zinc-700"
                  >
                    <p className="whitespace-pre-wrap">{nearbyInfo.text}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleWhatsAppSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-zinc-100 space-y-4">
              <h3 className="text-2xl font-serif mb-6">Send an Inquiry</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Function Type</label>
                  <select 
                    name="functionType"
                    value={formData.functionType}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {['Wedding', 'Engagement', 'Birthday', 'Corporate', 'Baby Shower', 'Other'].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Function Date</label>
                  <input 
                    required
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">No. of Guests</label>
                  <input 
                    required
                    type="number" 
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="e.g. 250"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Message / Special Requirements</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Tell us more about your event..."
                />
              </div>

              <button 
                type="submit"
                className="w-full btn-premium bg-amber-600 text-white flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Send Inquiry via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
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
    </ScrollSection>
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
    const lastShown = localStorage.getItem('whatsapp_popup_last_shown');
    const now = Date.now();
    
    // Only show if not shown in the last 10 minutes
    if (!lastShown || now - parseInt(lastShown) > 10 * 60 * 1000) {
      const timer = setTimeout(() => {
        setVisible(true);
        localStorage.setItem('whatsapp_popup_last_shown', now.toString());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 50 }}
          className="fixed bottom-24 right-6 z-50 max-w-[240px]"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-zinc-100 overflow-hidden">
            <div className="bg-green-600 p-3 text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="font-bold text-[12px]">Regency Banquets</p>
                <p className="text-[9px] opacity-80">Online now</p>
              </div>
              <button onClick={() => setVisible(false)} className="ml-auto opacity-60 hover:opacity-100">
                <X size={14} />
              </button>
            </div>
            <div className="p-3 bg-zinc-50">
              <p className="text-[11px] text-zinc-600 mb-3">
                Hello! How can we help you plan your perfect event?
              </p>
              <a 
                href="https://wa.me/919172979722" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-green-600 text-white rounded-lg py-1.5 text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
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
      <Gallery />
      <Pricing />
      <Reviews />
      <Contact />
      <Footer />
      <WhatsAppPopup />
      <FloatingWhatsApp />
    </div>
  );
}
