import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  console.error('[Seed Error] Please define MONGODB_URI in your .env or .env.local file.');
  process.exit(1);
}
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@whiteluxe.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'WhiteLuxe@2026!';

import { Admin } from '../models/Admin';
import { Project } from '../models/Project';
import { Blog } from '../models/Blog';
import { Testimonial } from '../models/Testimonial';
import { Settings } from '../models/Settings';

async function seed(): Promise<void> {
  try {
    console.log('[Seed] Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected to database.');

    // 1. Seed or Update Admin
    const adminEmail = ADMIN_EMAIL.toLowerCase();
    let admin = await Admin.findOne({ email: adminEmail });

    if (admin) {
      admin.password = ADMIN_PASSWORD;
      await admin.save();
      console.log(`[Seed] Admin updated: ${admin.email}`);
    } else {
      admin = await Admin.create({
        name: 'White Luxe Admin',
        email: adminEmail,
        password: ADMIN_PASSWORD,
      });
      console.log(`[Seed] Admin created: ${admin.email}`);
    }

    // 2. Seed Default Settings with authentic live website data
    await Settings.deleteMany({});
    await Settings.create({
      brandName: 'White Luxe Real Estate',
      tagline: 'Beyond Transactions, Building Relationships',
      shortDescription: 'Ethical and strategic property advisors in Gurgaon.',
      aboutLine:
        'At White Luxe, we believe real estate is more than an investment—it’s the foundation of your future. We take the time to understand your aspirations, offering personalized solutions that align with your goals.',
      address: 'Sector 49, Gurgaon, Haryana, India',
      phone: '+91 9958009492',
      email: 'support@whiteluxe.com',
      whatsappNumber: '919958009492',
      workingHours: 'Mon-Sat, 10:00 AM - 7:00 PM',
      experienceYears: '10+',
      happyClients: '500+',
      projectsCurated: '50+',
      transactionVolume: '1,000+',
      reraNumber: 'HRERA-PKL-GGM-1234-2026',
      socialLinks: {
        instagram: 'https://www.instagram.com/whiteluxe_real_estate/',
        facebook: 'https://www.facebook.com/profile.php',
        linkedin: 'https://linkedin.com/company/whiteluxe',
        youtube: 'https://youtube.com/@whiteluxerealestate',
      },
    });
    console.log('[Seed] Default Settings seeded from live website.');

    // 3. Seed 5 Authentic Projects from whiteluxerealestate.com
    await Project.deleteMany({});
    await Project.create([
      {
        city: 'Gurgaon',
        name: 'TARC Ishva',
        slug: 'tarc-ishva',
        type: 'Luxury Apartment',
        location: 'Sector - 63A, Gurugram',
        startingPrice: '₹ 9.7 Cr*',
        price: '6.33 Cr',
        heroImage: 'https://www.whiteluxerealestate.com/img/Trac-ishca/Main-banner.webp',
        totalLand: '10.5 Acres',
        totalTowers: '1',
        totalUnits: '150',
        paymentPlan: 'Flexible',
        status: 'construction',
        masterPlanName: 'TARC Ishva Master Plan',
        aboutHeading: 'Four-side Open Residences',
        aboutDescription:
          'At TARC Ishva, experience a blend of luxurious and harmonious lifestyle that celebrates the essence of your aspirations. Inspired by the four directions, TARC Ishva embodies the nurturing spirit of the south, the potential of new beginnings from the east, the realm of dreams in the west and the ambition to achieve in the north. Embrace a home inspired by India, where the openness elevates wisdom, balance and peaceful living.',
        units: [
          {
            unitType: '4 BHK',
            unitSize: 'Size on call',
            unitPrice: 'Price on call',
          },
        ],
        gallery: [
          'https://www.whiteluxerealestate.com/img/Trac-ishca/g1.jpg',
          'https://www.whiteluxerealestate.com/img/Trac-ishca/g2.webp',
          'https://www.whiteluxerealestate.com/img/Trac-ishca/g3.webp',
          'https://www.whiteluxerealestate.com/img/Trac-ishca/g4.jpg',
          'https://www.whiteluxerealestate.com/img/Trac-ishca/g6.jpg',
          'https://www.whiteluxerealestate.com/img/Trac-ishca/g7.jpg',
        ],
        amenities: [
          'Library',
          'Intercom Facility',
          'Security Guard',
          'Swimming Pool',
          'Community Centre',
          'Visitor Parking',
          'Piped Gas',
          'Gym',
          'Waste Disposal',
          'Cafeteria/Food Court',
          'Park',
          'Lift',
          'Maintenance Staff',
          'Kids Play Area',
          'Jogging Track',
          'ATMs',
          'Conference Room',
          'Club House',
        ],
        locationPoints: [
          '1 Km From Golf Course Road',
          '10 Min From Sun City, Heritage',
          '15 - 20 Min From Artemis, Medanta, Max',
          '15 Min From Shri Ram, Shikshantar, DPS, Amity',
          '10 Min From DLF Golf Club',
          '1.5 Km From Metro Station (Rapid)',
        ],
        mapLink: 'https://maps.google.com/?q=Sector+63A+Gurugram',
        floorPlans: [
          {
            label: '4 BHK Floor Plan',
            image: 'https://www.whiteluxerealestate.com/img/Trac-ishca/f1.webp',
          },
        ],
        masterPlan: {
          title: 'Master Plan of TARC Ishva',
          image: 'https://www.whiteluxerealestate.com/img/Trac-ishca/masterPlan.webp',
        },
        brochurePdf: '',
        reraNumber: 'HRERA-PKL-GGM-882-2023',
        seoTitle: 'TARC Ishva Sector 63A Gurgaon | Luxury 4 BHK Apartments | White Luxe',
        seoDescription:
          'TARC Ishva Sector 63A Gurgaon offers ultra-luxury 4 BHK apartments with world-class amenities, prime Golf Course Extension Road location, and premium lifestyle living.',
        featured: true,
        publishStatus: 'published',
      },
      {
        city: 'Gurgaon',
        name: 'Godrej Astra',
        slug: 'godrej-astra',
        type: 'Luxury Apartment',
        location: 'Sector 54, Golf Course Road, Gurugram',
        startingPrice: '₹ 11.52 Cr*',
        price: '6.33 Cr',
        heroImage: 'https://www.whiteluxerealestate.com/img/Godrej-Astra/Hero.webp',
        totalLand: '2.7 Acres',
        totalTowers: '2',
        totalUnits: '151',
        paymentPlan: '25:25:25:25',
        status: 'construction',
        masterPlanName: 'Godrej Astra Master Plan',
        aboutHeading: 'Crafted to Inspire',
        aboutDescription:
          'Some places are built to impress—Godrej Astra is crafted to inspire. Here, life rises above the ordinary into a world where every moment is intentional, elegant, and extraordinary. From your exclusive private speakeasy and curated clubhouse to a fine-dine restaurant and personal forest retreat, everything is designed to indulge your desires and elevate your lifestyle. At Godrej Astra, you don’t just live—you live beautifully.',
        units: [
          {
            unitType: '3 BHK + SR',
            unitSize: '2970 - 3182 SQ.FT',
            unitPrice: 'Price on call',
          },
          {
            unitType: '4 BHK + SR',
            unitSize: '3994 - 4092 SQ.FT',
            unitPrice: 'Price on call',
          },
        ],
        gallery: [
          'https://www.whiteluxerealestate.com/img/Godrej-Astra/g1.png',
          'https://www.whiteluxerealestate.com/img/Godrej-Astra/g2.webp',
          'https://www.whiteluxerealestate.com/img/Godrej-Astra/g3.webp',
          'https://www.whiteluxerealestate.com/img/Godrej-Astra/g5.webp',
          'https://www.whiteluxerealestate.com/img/Godrej-Astra/g7.jpg',
        ],
        amenities: [
          'Club House',
          'Swimming Pool',
          'Gym',
          'Spa & Wellness',
          'Private Speakeasy',
          'Fine-dine Restaurant',
          'Personal Forest Retreat',
          'Concierge Service',
          'High Speed Elevators',
          '24/7 Security Guard',
        ],
        locationPoints: [
          'Rapid Metro - 6.1km',
          'Marengo Asian Hospital - 2.8 km',
          'Cloudnine – 1 km',
          'Scottish High International – 2.7 km',
          'AIPL Masterpiece - 2.9 km',
          'One & Two Horizon Centre - 2.9 km',
        ],
        mapLink: 'https://maps.google.com/?q=Sector+54+Gurgaon',
        floorPlans: [
          {
            label: '3 BHK + SR Floor Plan',
            image: 'https://www.whiteluxerealestate.com/img/Godrej-Astra/h1.png',
          },
        ],
        masterPlan: {
          title: 'Master Plan of Godrej Astra',
          image: 'https://www.whiteluxerealestate.com/img/Godrej-Astra/master-plan.webp',
        },
        brochurePdf: '',
        reraNumber: 'HRERA-PKL-GGM-1024-2024',
        seoTitle: 'Godrej Astra Sector 54 Gurgaon | Luxury 3 & 4 BHK Apartments | White Luxe',
        seoDescription:
          'Godrej Astra Sector 54 Gurgaon offers ultra-luxury 3 & 4 BHK apartments on Golf Course Road with premium amenities, iconic design, and elite lifestyle.',
        featured: true,
        publishStatus: 'published',
      },
      {
        city: 'Gurgaon',
        name: 'Tulip Monsella',
        slug: 'tulip-monsella',
        type: 'Luxury Apartment',
        location: 'Sector 53, Golf Course Road, Gurugram',
        startingPrice: '₹ 7.18 Cr*',
        price: '7.18 Cr',
        heroImage: 'https://www.whiteluxerealestate.com/img/TulipMonsella/bannerr.avif',
        totalLand: '19.24 Acres',
        totalTowers: '1',
        totalUnits: '250',
        paymentPlan: '25:25:25:25',
        status: 'construction',
        masterPlanName: 'Tulip Monsella Site Map',
        aboutHeading: 'The Platinum Collection',
        aboutDescription:
          'Inspired by timeless perfection and unmatched brilliance, the Platinum Collection is more than a home—it\'s a rare retreat into the realm of untapped luxury. Crafted for those who relentlessly pursue success, these residences embody the art of regal living. Rising above the ordinary, this is a land bathed in beauty and light—where indulgence meets tranquility in perfect harmony. Nestled amidst the vibrant pulse of the metropolis, it offers a sanctuary where refinement, relaxation, and sophistication coexist. For some, it’s a splendid utopia. For others, the very definition of luxury. To a few fortunate ones, it’s not just a dream—it’s home. This is Tulip Monsella. An iconic landmark. One of the tallest towers on Golf Course Road.',
        units: [
          {
            unitType: '3 BHK',
            unitSize: '2874 SQ.FT',
            unitPrice: 'Price on call',
          },
          {
            unitType: '3 BHK',
            unitSize: '2892 SQ.FT',
            unitPrice: 'Price on call',
          },
          {
            unitType: '4 BHK',
            unitSize: '3684 SQ.FT',
            unitPrice: 'Price on call',
          },
          {
            unitType: '5 BHK',
            unitSize: '4503 SQ.FT',
            unitPrice: 'Price on call',
          },
        ],
        gallery: [
          'https://www.whiteluxerealestate.com/img/TulipMonsella/g1.webp',
          'https://www.whiteluxerealestate.com/img/TulipMonsella/g2.webp',
          'https://www.whiteluxerealestate.com/img/TulipMonsella/g3.webp',
          'https://www.whiteluxerealestate.com/img/TulipMonsella/g4.webp',
          'https://www.whiteluxerealestate.com/img/TulipMonsella/g5.webp',
          'https://www.whiteluxerealestate.com/img/TulipMonsella/g6.webp',
        ],
        amenities: [
          'Sky Club & Infinity Pool',
          'High Speed Lifts',
          'Multi-tier Security',
          'Concierge Desk',
          'Jogging Track & Park',
          'Private Dining Hall',
          'Sports Arenas',
          'Kids Play Area',
        ],
        locationPoints: [
          '2 Min from One Horizon Centre',
          '5 Min from MG Road',
          '5 Min from Fortis Hospital',
          '1 Min from Rapid Metro Station',
        ],
        mapLink: 'https://maps.google.com/?q=Sector+53+Gurgaon',
        floorPlans: [
          {
            label: '3 BHK Floor Plan',
            image: 'https://www.whiteluxerealestate.com/img/TulipMonsella/3bkh.jpeg',
          },
          {
            label: '4 BHK Floor Plan',
            image: 'https://www.whiteluxerealestate.com/img/TulipMonsella/4bhk.jpeg',
          },
          {
            label: '5 BHK Floor Plan',
            image: 'https://www.whiteluxerealestate.com/img/TulipMonsella/5bhk.jpeg',
          },
        ],
        masterPlan: {
          title: 'Site Map of Tulip Monsella',
          image: 'https://www.whiteluxerealestate.com/img/TulipMonsella/site-map.png',
        },
        brochurePdf: '',
        reraNumber: 'HRERA-PKL-GGM-672-2022',
        seoTitle: 'Tulip Monsella Sector 53 Gurgaon | Luxury 3, 4 & 5 BHK Apartments | White Luxe',
        seoDescription:
          'Tulip Monsella Sector 53 Gurgaon offers ultra-luxury 3, 4 & 5 BHK apartments on Golf Course Road with premium amenities and iconic high-rise living.',
        featured: true,
        publishStatus: 'published',
      },
      {
        city: 'Gurgaon',
        name: 'AIPL Autograph',
        slug: 'aipl-autograph',
        type: 'Commercial',
        location: 'Sector 108, Gurugram',
        startingPrice: '₹ 71 Lakhs*',
        price: '7.18 Cr',
        heroImage: 'https://www.whiteluxerealestate.com/img/AiplAutograp/b1.jpg',
        totalLand: '6.67 Acres',
        totalTowers: '3',
        paymentPlan: 'CLP',
        status: 'construction',
        masterPlanName: 'AIPL Autograph Plan',
        aboutHeading: 'Iconic Commercial Destination',
        aboutDescription:
          'AIPL Autograph is a Grade ‘A’ office development spread over 6.13 acres, offering a modern, interactive environment for tenants and retail patrons. With unique floor plates ranging from 12,000 to 120,000 sq. ft., it maximizes workspace and views. A 15,000 sq. ft. triple-height entrance lobby sets a grand tone, while 15–24 PAX high-speed elevators with Destination Control ensure smooth movement. The iconic, energy-efficient façade features a double-glazed unitized system with stone cladding. The project includes four levels of basement parking, a dedicated drop-off area, and excellent retail visibility—making it a landmark commercial destination.',
        units: [
          {
            unitType: 'Virtual Office',
            unitSize: '500 Sq.Ft*',
            unitPrice: 'Price on call',
          },
          {
            unitType: 'Self Use Office',
            unitSize: '4698 Sq.Ft*',
            unitPrice: 'Price on call',
          },
          {
            unitType: 'Restaurants',
            unitSize: '951 SQ.FT',
            unitPrice: 'Price on call',
          },
        ],
        gallery: [
          'https://www.whiteluxerealestate.com/img/AiplAutograp/g1.jpg',
          'https://www.whiteluxerealestate.com/img/AiplAutograp/g2.jpg',
          'https://www.whiteluxerealestate.com/img/AiplAutograp/g3.jpg',
          'https://www.whiteluxerealestate.com/img/AiplAutograp/g5.jpg',
          'https://www.whiteluxerealestate.com/img/AiplAutograp/g7.jpg',
          'https://www.whiteluxerealestate.com/img/AiplAutograp/g8.jpg',
        ],
        amenities: [
          'Triple-Height Grand Lobby',
          'High Speed Elevators with Destination Control',
          'Double-Glazed Energy Efficient Façade',
          '4 Levels of Basement Parking',
          'Fine Dining & Cafeterias',
          'Dedicated Drop-off Zone',
          '24/7 Security & CCTV Monitoring',
        ],
        locationPoints: [
          '0.8 km. - DPS International',
          '0.3 km. - St. Xavier’s School',
          '5.6 km. - Rapid Metro Sector 55-56',
          '0.3 km. - Golf Course Extn. Road',
          '8.0 km. - Huda City Centre Metro Station',
          '25 km. - IGI Airport',
        ],
        mapLink: 'https://maps.google.com/?q=Sector+108+Gurgaon',
        floorPlans: [
          {
            label: 'Office Layout Plan',
            image: 'https://www.whiteluxerealestate.com/img/AiplAutograp/map.jpg',
          },
        ],
        brochurePdf: '',
        reraNumber: 'HRERA-PKL-GGM-512-2021',
        seoTitle: 'AIPL Autograph Sector 108 Gurgaon | Premium Office & Retail Spaces | White Luxe',
        seoDescription:
          'AIPL Autograph Sector 108 Gurgaon offers premium Grade-A office spaces, retail outlets, and restaurants with modern infrastructure and high ROI potential.',
        featured: true,
        publishStatus: 'published',
      },
      {
        city: 'Gurgaon',
        name: 'DLF Privana North',
        slug: 'dlf-privana-north',
        type: 'Luxury Apartment',
        location: 'Sector 77, Southern Peripheral Road, Gurugram',
        startingPrice: '₹ 9.7 Cr*',
        price: '9.34Cr',
        heroImage: 'https://www.whiteluxerealestate.com/img/DlfPrivena/Banner.jpg',
        totalLand: '17.7 Acres',
        totalTowers: '6',
        totalUnits: '1152',
        paymentPlan: 'Flexible',
        status: 'construction',
        masterPlanName: 'Site Map of DLF Privana North',
        aboutHeading: 'Expansive Architecture in Nature',
        aboutDescription:
          'DLF Privana North is a premium luxury residential development located in Gurugram, India. Thoughtfully designed with modern architecture and expansive living spaces, it offers a perfect blend of elegance, comfort, and functionality. With a wide range of world-class amenities, this upscale project redefines contemporary living—making it the ideal choice for those who seek both sophistication and convenience in one address.',
        units: [
          {
            unitType: '4 BHK + SR',
            unitSize: '3977 Sq.ft',
            unitPrice: 'Price on call',
          },
          {
            unitType: 'Penthouse',
            unitSize: '7714 Sq.ft',
            unitPrice: 'Price on call',
          },
        ],
        gallery: [
          'https://www.whiteluxerealestate.com/img/DlfPrivena/g1.jpg',
          'https://www.whiteluxerealestate.com/img/DlfPrivena/g2.jpg',
          'https://www.whiteluxerealestate.com/img/DlfPrivena/g3.jpg',
          'https://www.whiteluxerealestate.com/img/DlfPrivena/g4.jpg',
          'https://www.whiteluxerealestate.com/img/DlfPrivena/g5.jpg',
        ],
        amenities: [
          'Private Club House',
          'Infinity Swimming Pool',
          'Aravalli Mountain Views',
          'Landscaped Green Zones',
          'Jogging & Cycling Tracks',
          'Tennis & Squash Courts',
          'Children Play Areas',
          '24/7 Gated Security',
        ],
        locationPoints: [
          'Broadways Int\'l School – 0.6 km',
          'Yaduvanshi Int\'l School – 2.9 km',
          'HUDA City Centre – 10.9 km',
          'Cyber City – 14.8 km',
        ],
        mapLink: 'https://maps.google.com/?q=Sector+77+Gurgaon',
        floorPlans: [
          {
            label: '4 BHK Floor Plan',
            image: 'https://www.whiteluxerealestate.com/img/DlfPrivena/f1.jpg',
          },
          {
            label: 'Penthouse Floor Plan',
            image: 'https://www.whiteluxerealestate.com/img/DlfPrivena/f2.jpg',
          },
        ],
        masterPlan: {
          title: 'Site Map of DLF Privana North',
          image: 'https://www.whiteluxerealestate.com/img/DlfPrivena/sitemap.jpg',
        },
        brochurePdf: '',
        reraNumber: 'HRERA-PKL-GGM-792-2023',
        seoTitle: 'DLF Privana North Sector 77 Gurgaon | Luxury Apartments & Penthouses',
        seoDescription:
          'DLF Privana North Sector 77 Gurgaon offers ultra-luxury 4 BHK apartments & penthouses with world-class amenities on Southern Peripheral Road.',
        featured: true,
        publishStatus: 'published',
      },
    ]);
    console.log('[Seed] 5 Authentic Projects seeded successfully.');

    // 4. Seed 3 Editorial Blogs
    await Blog.deleteMany({});
    await Blog.create([
      {
        title: '7 Things to Check Before Buying a Luxury Apartment in Gurgaon',
        slug: '7-things-to-check-before-buying-luxury-apartment-gurgaon',
        summary: 'A practical checklist to help you buy with confidence.',
        category: 'Buying Guide',
        author: 'White Luxe Advisory',
        readTime: '5 min read',
        coverImage: 'https://www.whiteluxerealestate.com/img/Trac-ishca/Main-banner.webp',
        tags: ['Luxury Real Estate', 'Gurgaon', 'Buyer Checklist', 'RERA'],
        featured: true,
        publishStatus: 'published',
        publishedAt: new Date(),
        seoTitle: '7 Things to Check Before Buying a Luxury Apartment in Gurgaon | White Luxe',
        seoDescription:
          'Buying a luxury apartment in Gurgaon? Review our 7-step due diligence checklist covering builder track record, RERA, payment plans, and total costs.',
        content: `
          <p>Buying a luxury apartment is as much about due diligence as it is about design. Before you commit, review these seven points.</p>
          <h3>1. Builder track record</h3>
          <p>Look at past deliveries, timelines and construction quality, not just artist impressions and glossy brochures.</p>
          <h3>2. RERA registration</h3>
          <p>Confirm the project is registered with Haryana RERA and check its officially stated completion deadline and quarterly progress reports.</p>
          <h3>3. Location and connectivity</h3>
          <p>Consider multi-lane arterial road access, metro proximity, top-tier international schools, and premier hospitals nearby.</p>
          <h3>4. Payment plan</h3>
          <p>Understand every instalment milestone thoroughly, and verify whether disbursements are strictly linked to verifiable construction progress.</p>
          <h3>5. Layout and openness</h3>
          <p>Check orientation, cross-ventilation, ceiling heights, and how much natural sunlight your residence receives throughout the seasons.</p>
          <h3>6. Total cost breakdown</h3>
          <p>Request the complete itemized cost sheet upfront, including applicable GST, covered parking slots, club membership, IFMS, and recurring maintenance charges.</p>
          <h3>7. Resale and capital appreciation potential</h3>
          <p>Sought-after micro-markets, prime arterial road connectivity, and tier-1 reputed developers consistently hold value better over economic cycles.</p>
          <p>A thoughtful checklist saves you from costly surprises later. If you would like personalized help evaluating a project, our advisors are here to guide you.</p>
        `,
      },
      {
        title: 'Why Gurgaon Continues to Attract Luxury Home Buyers',
        slug: 'why-gurgaon-continues-to-attract-luxury-home-buyers',
        summary: 'Infrastructure, jobs and lifestyle keep demand strong.',
        category: 'Market Trends',
        author: 'White Luxe Advisory',
        readTime: '4 min read',
        coverImage: 'https://www.whiteluxerealestate.com/img/Godrej-Astra/Hero.webp',
        tags: ['Market Analysis', 'Gurgaon Growth', 'High Net Worth'],
        featured: true,
        publishStatus: 'published',
        publishedAt: new Date(),
        seoTitle: 'Why Gurgaon Continues to Attract Luxury Home Buyers | White Luxe',
        seoDescription:
          'Discover why Gurgaon remains the premier destination for luxury home buyers in Delhi NCR, driven by corporate hubs, world-class infrastructure, and elevated living.',
        content: `
          <p>Gurgaon has evolved from a satellite town into one of India's most dynamic residential and commercial property markets. Several structural factors keep premium residential demand robust.</p>
          <h3>Employment hub of North India</h3>
          <p>Fortune 500 corporate headquarters, leading IT campuses, and prestigious financial institutions across Cyber City and Golf Course Road generate sustained demand for quality executive housing.</p>
          <h3>Rapidly expanding infrastructure</h3>
          <p>Signal-free arterial expressways (Dwarka Expressway, Golf Course Road, SPR, Sohna Elevated Road) and seamless airport connectivity make intra-city and international transit exceptionally efficient.</p>
          <h3>Unmatched lifestyle ecosystem</h3>
          <p>Championship golf courses, internationally accredited IB schools, JCI-accredited tertiary hospitals, fine-dining enclaves, and premium shopping arcades are within a 15-minute radius.</p>
          <h3>Quality master-planned developments</h3>
          <p>Leading developers continue to innovate with low-density high-rises, expansive clubhouse spaces, Olympic-grade sporting amenities, and world-class landscaping.</p>
          <p>Of course, every micro-market behaves differently. Choosing the right sector matters just as much as choosing the right developer. This is where an experienced, research-led property advisor brings real clarity.</p>
        `,
      },
      {
        title: 'Residential or Commercial: Which Property Investment Suits You?',
        slug: 'residential-or-commercial-which-property-investment-suits-you',
        summary: 'Understanding returns, risk and time horizon.',
        category: 'Investment',
        author: 'White Luxe Advisory',
        readTime: '4 min read',
        coverImage: 'https://www.whiteluxerealestate.com/img/AiplAutograp/b1.jpg',
        tags: ['Investment Strategy', 'Commercial Real Estate', 'Rental Yield'],
        featured: true,
        publishStatus: 'published',
        publishedAt: new Date(),
        seoTitle: 'Residential vs Commercial Real Estate Investment in Gurgaon | White Luxe',
        seoDescription:
          'Compare residential and commercial property investments in Gurgaon. Learn about capital appreciation, rental yields, liquidity, and risk profiles.',
        content: `
          <p>Both residential and commercial assets build wealth over time, but they serve fundamentally distinct financial objectives and risk profiles.</p>
          <h3>Residential Properties: Stability & Personal Utility</h3>
          <p>Residential homes deliver clear lifestyle value and long-term capital appreciation. Gross rental yields in Gurgaon typically hover between 2.5% to 4%, but residential assets benefit from high liquidity, simpler tenant management, and favorable mortgage financing options.</p>
          <h3>Commercial Properties: Higher Yields & Institutional Tenancy</h3>
          <p>Commercial assets—including Grade-A office suites and high-street retail spaces—generally provide higher rental returns (7% to 9% gross yield) and multi-year institutional lock-ins with periodic escalations. However, they demand larger capital outlay and rigorous tenant credit evaluation.</p>
          <h3>Key Decision Criteria</h3>
          <p>Before deploying capital, evaluate three questions: What is my liquid investment corpus? What is my holding horizon? What are my ongoing cash flow requirements? Your answers clarify the right asset class, and our advisors are on hand to tailor a data-backed portfolio strategy.</p>
        `,
      },
    ]);
    console.log('[Seed] Sample Blogs seeded.');

    // 5. Seed Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.create([
      {
        clientName: 'Vikram Malhotra',
        clientLocation: 'Gurgaon',
        quote:
          'They explained every option honestly and never pushed us to decide. We found our home within three weeks.',
        project: 'TARC Ishva',
        rating: 5,
        featured: true,
        order: 1,
      },
      {
        clientName: 'Sanjay Aggarwal',
        clientLocation: 'Gurgaon',
        quote:
          'Clear, professional and always available. A refreshing experience in real estate.',
        project: 'Godrej Astra',
        rating: 5,
        featured: true,
        order: 2,
      },
      {
        clientName: 'Anita Mehra',
        clientLocation: 'Delhi',
        quote:
          'Their market knowledge helped us pick the right commercial investment with exceptional rental yield.',
        project: 'AIPL Autograph',
        rating: 5,
        featured: true,
        order: 3,
      },
    ]);
    console.log('[Seed] Sample Testimonials seeded.');

    console.log('[Seed] 🎉 Database seeding completed successfully with live website data!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  }
}

seed();
