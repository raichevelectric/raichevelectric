export const siteConfig = {
  name: "Raichev Electric",
  tagline: "Licensed Electrical Contractors",
  description:
    "Raichev Electric provides professional electrical design, installation, and maintenance for commercial, residential, low voltage, and specialty projects across Orange County and San Diego.",
  phone: "(949) 295-6436",
  phoneHref: "tel:+19492956436",
  email: "steven@raichevelectric.com",
  emailHref: "mailto:steven@raichevelectric.com",
  address: {
    street: "123 Main Street",
    city: "Orange County & San Diego",
    state: "CA",
    zip: "",
    full: "Orange County & San Diego, CA",
  },
  serviceArea: "Orange County & San Diego",
  license: "California C-10 Electrical Contractor",
  hours: "Mon–Fri: 7:00 AM – 5:00 PM",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    id: "commercial",
    title: "Commercial Electrical",
    description:
      "Reliable electrical solutions for offices, retail spaces, and commercial properties — on time and on budget.",
    icon: "building",
    features: [
      "Tenant improvements",
      "Office & retail build-outs",
      "Lighting retrofits",
      "Emergency & exit lighting",
      "Power distribution",
      "Preventive maintenance",
    ],
  },
  {
    id: "residential",
    title: "Residential Electrical",
    description:
      "Complete home wiring, panel upgrades, lighting design, and smart home integration for homeowners who expect quality craftsmanship.",
    icon: "home",
    features: [
      "Home & equipment wiring",
      "Panel upgrades & service changes",
      "Lighting consults & design",
      "Heated flooring systems",
      "EV charger installation",
      "Whole-home surge protection",
    ],
  },
  {
    id: "systems",
    title: "AV, Security & Low Voltage",
    description:
      "Beyond power — we install the systems that protect, connect, and elevate your property. From AV and telecom to fire alarm and landscape lighting.",
    icon: "shield",
    features: [
      "AV / audio-visual systems",
      "Telecom & data cabling",
      "Access control",
      "Security systems",
      "Landscape lighting",
      "Fire alarm systems",
    ],
  },
  {
    id: "smart-home",
    title: "Smart Home Solutions",
    description:
      "Lutron-certified smart lighting and home automation that combines elegance with everyday convenience.",
    icon: "sparkles",
    features: [
      "Lutron RA2 Select",
      "RadioRA 2 systems",
      "HomeWorks QS",
      "Automated shading",
      "Scene programming",
      "Voice & app control",
    ],
  },
  {
    id: "specialty",
    title: "Specialty & Agricultural",
    description:
      "Expertise in greenhouse wiring, agricultural systems, and custom electrical projects that require specialized knowledge.",
    icon: "leaf",
    features: [
      "Greenhouse wiring",
      "Agricultural electrical systems",
      "Irrigation controls",
      "Custom control panels",
      "Generator connections",
      "Custom specialty installs",
    ],
  },
];

export const products = [
  {
    id: "lutron",
    title: "Lutron Lighting Control",
    description:
      "As a Lutron dealer, we install premium lighting control systems that are easy to use, energy-efficient, and built to last.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    features: [
      "Dimming & scene control",
      "Automated shading integration",
      "Energy savings",
      "Elegant wall controls",
    ],
  },
  {
    id: "panels",
    title: "Electrical Panels & Distribution",
    description:
      "Modern panel upgrades and distribution systems that keep your property safe and ready for today's power demands.",
    image: "/images/IMG_2398.jpg",
    features: [
      "200A service upgrades",
      "Sub-panel installation",
      "Arc-fault & GFCI protection",
      "Load calculations",
    ],
  },
  {
    id: "ev-charging",
    title: "EV Charging Stations",
    description:
      "Level 2 EV charger installation for homes and businesses, with proper load management and permitting handled for you.",
    image: "/images/ev-charging.jpg",
    features: [
      "Home & commercial chargers",
      "Dedicated circuits",
      "Load management",
      "Permit coordination",
    ],
  },
  {
    id: "lighting",
    title: "Architectural Lighting",
    description:
      "Thoughtfully designed lighting that enhances architecture, improves function, and creates the right atmosphere — including landscape and outdoor systems.",
    image: "/images/IMG_5274.jpg",
    features: [
      "Landscape lighting",
      "Recessed & accent lighting",
      "LED retrofits",
      "Lighting design consults",
    ],
  },
];

export const projects = [
  {
    id: "commercial-conduit-package",
    title: "Commercial Conduit Package",
    location: "Orange County & San Diego",
    category: "Commercial",
    description:
      "Multi-run EMT conduit with precise offsets and Unistrut support across a commercial build-out.",
    image: "/images/IMG_3245.jpg",
  },
  {
    id: "overhead-raceway-system",
    title: "Overhead Raceway System",
    location: "Orange County & San Diego",
    category: "Commercial",
    description:
      "Parallel conduit routing across metal deck ceiling with clean transitions into distribution enclosures.",
    image: "/images/IMG_3251.jpg",
  },
  {
    id: "mechanical-room-coordination",
    title: "Mechanical Room Coordination",
    location: "Orange County & San Diego",
    category: "Commercial",
    description:
      "Organized conduit banks coordinated around ductwork and fire systems in an active construction space.",
    image: "/images/IMG_3473.jpg",
  },
  {
    id: "siemens-panel-upgrade",
    title: "Precision Panel Upgrade",
    location: "Orange County & San Diego",
    category: "Residential",
    description:
      "Clean Siemens service panel installation with meticulously organized branch circuits, labeled conduits, and professional-grade terminations.",
    image: "/images/IMG_2398.jpg",
  },
  {
    id: "surge-protected-service",
    title: "Surge-Protected Service",
    location: "Orange County & San Diego",
    category: "Residential",
    description:
      "Full panel build with SpecPRO surge protection, neat wire management, and a ready-for-inspection finish.",
    image: "/images/IMG_2476.jpg",
  },
  {
    id: "foundation-electrical-rough-in",
    title: "Foundation Electrical Rough-In",
    location: "Orange County & San Diego",
    category: "Residential",
    description:
      "PVC conduit and junction box rough-in installed inside concrete formwork ahead of pour.",
    image: "/images/IMG_4488.jpg",
  },
  {
    id: "retaining-wall-power",
    title: "Retaining Wall Power Rough-In",
    location: "Orange County & San Diego",
    category: "Residential",
    description:
      "Integrated wall power and box layout for a residential retaining wall and landscape build.",
    image: "/images/IMG_4491.jpg",
  },
  {
    id: "luxury-step-lighting",
    title: "Luxury Step Lighting",
    location: "Orange County & San Diego",
    category: "Residential",
    description:
      "Integrated LED step lighting on a herringbone paver walkway for a high-end residential exterior.",
    image: "/images/IMG_5274.jpg",
  },
  {
    id: "landscape-wall-lighting",
    title: "Landscape Wall Lighting",
    location: "Orange County & San Diego",
    category: "Residential",
    description:
      "Recessed LED accent lighting installed along a board-formed retaining wall for evening presence and safety.",
    image: "/images/IMG_5275.jpg",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Alexander V.",
    location: "Newport Beach, CA",
    project: "Whole-Home Rewire & Panel Upgrade",
    rating: 5,
    text: "Impeccable craftsmanship from start to finish. Raichev Electric treated our residence with the care it deserves — clean work, quiet execution, and a finish that feels truly luxury.",
  },
  {
    id: "2",
    name: "Caroline M.",
    location: "Laguna Beach, CA",
    project: "Lutron HomeWorks & Architectural Lighting",
    rating: 5,
    text: "Our lighting scenes transform the house at dusk. The team understood design intent, not just wiring. Every control feels intentional. Five stars without hesitation.",
  },
  {
    id: "3",
    name: "James R.",
    location: "Huntington Beach, CA",
    project: "Harbor Residence Smart Home",
    rating: 5,
    text: "Precision protocol from day one. They coordinated around our remodel schedule, protected every surface, and delivered a Lutron system that just works. Exactly what we expect on the coast.",
  },
  {
    id: "4",
    name: "Priya S.",
    location: "Irvine, CA",
    project: "EV Charging & Service Upgrade",
    rating: 5,
    text: "Dual Level 2 chargers installed with a clean panel upgrade and permits handled end to end. Professional, precise, and completely stress-free.",
  },
  {
    id: "5",
    name: "Marcus T.",
    location: "Carlsbad, CA",
    project: "Historic Home Electrical Restoration",
    rating: 5,
    text: "They modernized our electrical without compromising the character of the home. Rare to find that level of judgment and skill. Outstanding.",
  },
  {
    id: "6",
    name: "Elena G.",
    location: "La Jolla, CA",
    project: "Luxury Landscape & Step Lighting",
    rating: 5,
    text: "The evening lighting along our retaining wall and steps is stunning. Raichev Electric made the exterior feel like a resort — safe, sculpted, and elegant.",
  },
  {
    id: "7",
    name: "Daniel H.",
    location: "Costa Mesa, CA",
    project: "Commercial Tenant Improvement",
    rating: 5,
    text: "Our studio build-out finished ahead of schedule. Clear communication, excellent documentation, and a crew that respects a high-end workspace.",
  },
  {
    id: "8",
    name: "Sophia L.",
    location: "San Diego, CA",
    project: "Panel Upgrade & Surge Protection",
    rating: 5,
    text: "The panel work is museum-clean. Labeled, organized, inspection-ready. You can tell they take pride in the details most people never see.",
  },
  {
    id: "9",
    name: "Christopher B.",
    location: "Del Mar, CA",
    project: "Coastal Residence Power & Lighting",
    rating: 5,
    text: "From main service to outdoor lighting, everything was dialed for coastal conditions. Responsive, refined, and genuinely premium.",
  },
];

export const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "5.0", label: "Average Rating" },
];

export const projectTypes = [
  "Commercial Build-Out",
  "Residential Wiring",
  "Panel Upgrade",
  "Smart Home / Lutron",
  "EV Charger Installation",
  "AV / Telecom / Low Voltage",
  "Access Control / Security",
  "Fire Alarm",
  "Landscape Lighting",
  "Lighting Design",
  "Greenhouse / Agricultural",
  "Other",
];
