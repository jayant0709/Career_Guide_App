/**
 * TypeScript interfaces for College data structures
 * Matches the web app's college types and API responses
 */

export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  type: "Government" | "Private" | "Aided";
  rating?: string;
  cutoff?: string;
  placement?: string;
  naacGrade?: string;
  fees?: string;
  programs: string[];
  facilities: string[];
  description: string;
  distance?: string;
  establishedYear?: number;
  affiliation?: string;
  website?: string;
}

export interface CollegeDetail {
  id: string;
  name: string;
  type: "Government" | "Private" | "Aided";
  establishedYear: number;
  naacGrade: string;
  affiliation: string;
  location: string;
  city: string;
  state: string;
  coordinates: { lat: number; lng: number };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  programs: {
    undergraduate: Array<{
      name: string;
      duration: string;
      seats: number;
      eligibility: string;
    }>;
    postgraduate: Array<{
      name: string;
      duration: string;
      seats: number;
      eligibility: string;
    }>;
  };
  cutoffs: Array<{
    year: number;
    open: number;
    obc: number;
    sc: number;
    st: number;
  }>;
  facilities: Array<{
    name: string;
    available: boolean;
    rating?: number;
    description?: string;
  }>;
  achievements: Array<{
    title: string;
    year: number;
    description: string;
    type: "award" | "recognition" | "ranking";
  }>;
  placements: {
    averagePackage: string;
    highestPackage: string;
    placementRate: number;
    topRecruiters: string[];
    trends: Array<{
      year: number;
      average: number;
      highest: number;
      rate: number;
    }>;
  };
  reviews: {
    overallRating: number;
    totalReviews: number;
    sentiment: "positive" | "neutral" | "negative";
    breakdown: {
      academics: number;
      faculty: number;
      infrastructure: number;
      placements: number;
      campus: number;
    };
    recentReviews: Array<{
      id: string;
      rating: number;
      text: string;
      author: string;
      date: string;
      helpful: number;
    }>;
  };
  notableAlumni: string[];
  description: string;
  photos: string[];
}

export interface ApiResponse {
  success: boolean;
  data: College[];
  total: number;
  filtered: number;
  message: string;
  error?: string;
}

export interface ComparisonParameter {
  key: string;
  label: string;
  getValue: (college: CollegeDetail) => any;
  getBestValue: (values: any[]) => number[];
  format?: (value: any) => string;
  description?: string;
}

export interface FilterOptions {
  searchTerm: string;
  selectedDistance: string;
  selectedType: string;
  selectedProgram: string;
  selectedState: string;
}

export interface FacilityInfo {
  name: string;
  icon: string;
  color: string;
}

// Static college data for comparison (matches web app)
export const staticColleges: CollegeDetail[] = [
  {
    id: "iit_bombay",
    name: "Indian Institute of Technology Bombay",
    type: "Government",
    location: "Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    establishedYear: 1958,
    naacGrade: "A++",
    affiliation: "Autonomous",
    coordinates: { lat: 19.1334, lng: 72.9133 },
    contact: {
      phone: "+91-22-2572-2545",
      email: "webmaster@iitb.ac.in",
      website: "https://www.iitb.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.Tech Computer Science",
          duration: "4 years",
          seats: 120,
          eligibility: "JEE Advanced",
        },
        {
          name: "B.Tech Electrical Engineering",
          duration: "4 years",
          seats: 100,
          eligibility: "JEE Advanced",
        },
        {
          name: "B.Tech Mechanical Engineering",
          duration: "4 years",
          seats: 110,
          eligibility: "JEE Advanced",
        },
      ],
      postgraduate: [
        {
          name: "M.Tech Computer Science",
          duration: "2 years",
          seats: 50,
          eligibility: "GATE",
        },
        { name: "MBA", duration: "2 years", seats: 120, eligibility: "CAT" },
      ],
    },
    cutoffs: [
      { year: 2024, open: 63, obc: 178, sc: 891, st: 1250 },
      { year: 2023, open: 67, obc: 188, sc: 945, st: 1456 },
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.5,
        description: "14 hostels with modern amenities",
      },
      {
        name: "Library",
        available: true,
        rating: 4.8,
        description: "Central Library with 4+ lakh books",
      },
      {
        name: "Labs",
        available: true,
        rating: 4.7,
        description: "State-of-the-art research laboratories",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #3",
        year: 2024,
        description: "3rd rank in Engineering category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹21.82 LPA",
      highestPackage: "₹1.68 CPA",
      placementRate: 98.2,
      topRecruiters: ["Microsoft", "Google", "Goldman Sachs", "McKinsey"],
      trends: [
        { year: 2024, average: 21.82, highest: 168, rate: 98.2 },
        { year: 2023, average: 19.96, highest: 145, rate: 97.8 },
      ],
    },
    reviews: {
      overallRating: 4.6,
      totalReviews: 1247,
      sentiment: "positive",
      breakdown: {
        academics: 4.7,
        faculty: 4.5,
        infrastructure: 4.8,
        placements: 4.9,
        campus: 4.4,
      },
      recentReviews: [
        {
          id: "1",
          rating: 5,
          text: "Excellent faculty and world-class research opportunities.",
          author: "Rahul S.",
          date: "2024-08-15",
          helpful: 23,
        },
      ],
    },
    notableAlumni: [
      "Sundar Pichai (CEO, Google)",
      "Bhavish Aggarwal (CEO, Ola)",
    ],
    description: "IIT Bombay is one of India's premier technological institutes.",
    photos: ["/placeholder1.jpg", "/placeholder2.jpg"],
  },
  {
    id: "bits_pilani",
    name: "Birla Institute of Technology and Science Pilani",
    type: "Private",
    location: "Pilani, Rajasthan",
    city: "Pilani",
    state: "Rajasthan",
    establishedYear: 1964,
    naacGrade: "A",
    affiliation: "Deemed University",
    coordinates: { lat: 28.3636, lng: 75.5851 },
    contact: {
      phone: "+91-1596-242-204",
      email: "info@pilani.bits-pilani.ac.in",
      website: "https://www.bits-pilani.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.E. Computer Science",
          duration: "4 years",
          seats: 150,
          eligibility: "BITSAT",
        },
        {
          name: "B.E. Electronics",
          duration: "4 years",
          seats: 120,
          eligibility: "BITSAT",
        },
      ],
      postgraduate: [
        {
          name: "M.E. Software Engineering",
          duration: "2 years",
          seats: 40,
          eligibility: "GATE",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 340, obc: 320, sc: 280, st: 260 },
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.2,
        description: "Multiple hostels with good facilities",
      },
      {
        name: "Library",
        available: true,
        rating: 4.3,
        description: "Well-equipped library with digital resources",
      },
      {
        name: "Labs",
        available: true,
        rating: 4.4,
        description: "Modern computer and engineering labs",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #25",
        year: 2024,
        description: "25th rank in Engineering category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹16.5 LPA",
      highestPackage: "₹60 LPA",
      placementRate: 94,
      topRecruiters: ["Amazon", "Google", "Microsoft", "Samsung"],
      trends: [
        { year: 2024, average: 16.5, highest: 60, rate: 94 },
      ],
    },
    reviews: {
      overallRating: 4.3,
      totalReviews: 892,
      sentiment: "positive",
      breakdown: {
        academics: 4.4,
        faculty: 4.2,
        infrastructure: 4.1,
        placements: 4.5,
        campus: 4.3,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Great academic environment and placements.",
          author: "Priya K.",
          date: "2024-07-10",
          helpful: 15,
        },
      ],
    },
    notableAlumni: ["Satya Nadella (CEO, Microsoft)"],
    description: "BITS Pilani is a leading private technical university.",
    photos: ["/placeholder3.jpg"],
  },
  {
    id: "iit_delhi",
    name: "Indian Institute of Technology Delhi",
    type: "Government",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    establishedYear: 1961,
    naacGrade: "A++",
    affiliation: "Autonomous",
    coordinates: { lat: 28.5449, lng: 77.1928 },
    contact: {
      phone: "+91-11-2659-1000",
      email: "webmaster@admin.iitd.ac.in",
      website: "https://home.iitd.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.Tech Computer Science",
          duration: "4 years",
          seats: 110,
          eligibility: "JEE Advanced",
        },
        {
          name: "B.Tech Electronics",
          duration: "4 years",
          seats: 90,
          eligibility: "JEE Advanced",
        },
      ],
      postgraduate: [
        {
          name: "M.Tech AI",
          duration: "2 years",
          seats: 30,
          eligibility: "GATE",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 55, obc: 164, sc: 823, st: 1124 },
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.4,
        description: "13 hostels with excellent facilities",
      },
      {
        name: "Library",
        available: true,
        rating: 4.7,
        description: "Modern library with vast collection",
      },
      {
        name: "Labs",
        available: true,
        rating: 4.8,
        description: "Advanced research laboratories",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #2",
        year: 2024,
        description: "2nd rank in Engineering category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹18.5 LPA",
      highestPackage: "₹1.2 CPA",
      placementRate: 97.5,
      topRecruiters: ["Google", "Microsoft", "Apple", "Meta"],
      trends: [
        { year: 2024, average: 18.5, highest: 120, rate: 97.5 },
      ],
    },
    reviews: {
      overallRating: 4.5,
      totalReviews: 1156,
      sentiment: "positive",
      breakdown: {
        academics: 4.6,
        faculty: 4.4,
        infrastructure: 4.7,
        placements: 4.8,
        campus: 4.2,
      },
      recentReviews: [
        {
          id: "1",
          rating: 5,
          text: "Outstanding academics and research culture.",
          author: "Ankit M.",
          date: "2024-08-20",
          helpful: 18,
        },
      ],
    },
    notableAlumni: ["Vinod Khosla (Co-founder, Sun Microsystems)"],
    description: "IIT Delhi is among India's top technical institutions.",
    photos: ["/placeholder4.jpg"],
  },
  {
    id: "nit_trichy",
    name: "National Institute of Technology Tiruchirappalli",
    type: "Government",
    location: "Tiruchirappalli, Tamil Nadu",
    city: "Tiruchirappalli", 
    state: "Tamil Nadu",
    establishedYear: 1964,
    naacGrade: "A++",
    affiliation: "NIT System",
    coordinates: { lat: 10.7598, lng: 78.8148 },
    contact: {
      phone: "+91-431-250-3000",
      email: "webmaster@nitt.edu",
      website: "https://www.nitt.edu",
    },
    programs: {
      undergraduate: [
        {
          name: "B.Tech Computer Science",
          duration: "4 years",
          seats: 100,
          eligibility: "JEE Main",
        },
        {
          name: "B.Tech Mechanical",
          duration: "4 years",
          seats: 120,
          eligibility: "JEE Main",
        },
      ],
      postgraduate: [
        {
          name: "M.Tech CSE",
          duration: "2 years",
          seats: 35,
          eligibility: "GATE",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 875, obc: 2456, sc: 4821, st: 6234 },
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.3,
        description: "15 hostels with good amenities",
      },
      {
        name: "Library",
        available: true,
        rating: 4.5,
        description: "Central library with digital resources",
      },
      {
        name: "Labs",
        available: true,
        rating: 4.6,
        description: "Well-equipped laboratories",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #9",
        year: 2024,
        description: "9th rank in Engineering category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹14.2 LPA",
      highestPackage: "₹44 LPA",
      placementRate: 89.5,
      topRecruiters: ["TCS", "Infosys", "Amazon", "Adobe"],
      trends: [
        { year: 2024, average: 14.2, highest: 44, rate: 89.5 },
      ],
    },
    reviews: {
      overallRating: 4.2,
      totalReviews: 743,
      sentiment: "positive",
      breakdown: {
        academics: 4.3,
        faculty: 4.1,
        infrastructure: 4.4,
        placements: 4.3,
        campus: 4.1,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Good academic environment and placement opportunities.",
          author: "Deepak R.",
          date: "2024-07-25",
          helpful: 12,
        },
      ],
    },
    notableAlumni: ["Kris Gopalakrishnan (Co-founder, Infosys)"],
    description: "NIT Trichy is one of India's premier technical institutes.",
    photos: ["/placeholder5.jpg"],
  },
  {
    id: "iisc_bangalore",
    name: "Indian Institute of Science Bangalore",
    type: "Government",
    location: "CV Raman Nagar, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    establishedYear: 1909,
    naacGrade: "A++",
    affiliation: "Autonomous",
    coordinates: { lat: 13.0207, lng: 77.5649 },
    contact: {
      phone: "+91-80-2293-2001",
      email: "info@iisc.ac.in",
      website: "https://www.iisc.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "Bachelor of Science (Research)",
          duration: "4 years",
          seats: 120,
          eligibility: "KVPY/JEE Advanced/NEET",
        },
      ],
      postgraduate: [
        {
          name: "M.Tech Computer Science",
          duration: "2 years",
          seats: 45,
          eligibility: "GATE",
        },
        {
          name: "PhD Programs",
          duration: "4-6 years",
          seats: 200,
          eligibility: "NET/GATE",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 125, obc: 245, sc: 456, st: 678 },
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.6,
        description: "On-campus accommodation for all students",
      },
      {
        name: "Library",
        available: true,
        rating: 4.9,
        description: "J.R.D. Tata Memorial Library",
      },
      {
        name: "Labs",
        available: true,
        rating: 4.9,
        description: "World-class research facilities",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #1",
        year: 2024,
        description: "1st rank overall in India",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹19.3 LPA",
      highestPackage: "₹89 LPA",
      placementRate: 95.8,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Facebook"],
      trends: [
        { year: 2024, average: 19.3, highest: 89, rate: 95.8 },
      ],
    },
    reviews: {
      overallRating: 4.7,
      totalReviews: 521,
      sentiment: "positive",
      breakdown: {
        academics: 4.9,
        faculty: 4.8,
        infrastructure: 4.6,
        placements: 4.5,
        campus: 4.7,
      },
      recentReviews: [
        {
          id: "1",
          rating: 5,
          text: "Best research environment in the country.",
          author: "Meera T.",
          date: "2024-08-10",
          helpful: 28,
        },
      ],
    },
    notableAlumni: ["C.N.R. Rao (Bharat Ratna)", "Raghunath Anant Mashelkar"],
    description: "IISc is India's premier institute for scientific research.",
    photos: ["/placeholder6.jpg"],
  },
  {
    id: "srm_chennai",
    name: "SRM Institute of Science and Technology",
    type: "Private",
    location: "Kattankulathur, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    establishedYear: 1985,
    naacGrade: "A++",
    affiliation: "Deemed University",
    coordinates: { lat: 12.8230, lng: 80.0444 },
    contact: {
      phone: "+91-44-2741-9000",
      email: "info@srmist.edu.in",
      website: "https://www.srmist.edu.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.Tech Computer Science",
          duration: "4 years",
          seats: 300,
          eligibility: "SRMJEEE/JEE Main",
        },
        {
          name: "B.Tech Electronics",
          duration: "4 years",
          seats: 250,
          eligibility: "SRMJEEE/JEE Main",
        },
      ],
      postgraduate: [
        {
          name: "M.Tech Data Science",
          duration: "2 years",
          seats: 60,
          eligibility: "GATE",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 15000, obc: 18000, sc: 25000, st: 30000 },
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.1,
        description: "Multiple hostels with AC facilities",
      },
      {
        name: "Library",
        available: true,
        rating: 4.2,
        description: "Modern library with e-resources",
      },
      {
        name: "Labs",
        available: true,
        rating: 4.3,
        description: "Industry-standard laboratories",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #41",
        year: 2024,
        description: "41st rank in Engineering category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹9.8 LPA",
      highestPackage: "₹41.6 LPA",
      placementRate: 85.2,
      topRecruiters: ["TCS", "Cognizant", "Wipro", "Accenture"],
      trends: [
        { year: 2024, average: 9.8, highest: 41.6, rate: 85.2 },
      ],
    },
    reviews: {
      overallRating: 4.0,
      totalReviews: 1534,
      sentiment: "positive",
      breakdown: {
        academics: 4.1,
        faculty: 3.9,
        infrastructure: 4.3,
        placements: 4.2,
        campus: 4.0,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Good infrastructure and placement support.",
          author: "Kavya P.",
          date: "2024-07-30",
          helpful: 21,
        },
      ],
    },
    notableAlumni: ["Various industry leaders"],
    description: "SRM is a leading private university with strong industry connections.",
    photos: ["/placeholder7.jpg"],
  },
  {
    id: "vit_vellore",
    name: "Vellore Institute of Technology",
    type: "Private",
    location: "Vellore, Tamil Nadu",
    city: "Vellore",
    state: "Tamil Nadu",
    establishedYear: 1984,
    naacGrade: "A++",
    affiliation: "Deemed University",
    coordinates: { lat: 12.9692, lng: 79.1559 },
    contact: {
      phone: "+91-416-220-2020",
      email: "info@vit.ac.in",
      website: "https://vit.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.Tech Computer Science",
          duration: "4 years",
          seats: 360,
          eligibility: "VITEEE",
        },
        {
          name: "B.Tech Information Technology",
          duration: "4 years",
          seats: 240,
          eligibility: "VITEEE",
        },
      ],
      postgraduate: [
        {
          name: "M.Tech Software Engineering",
          duration: "2 years",
          seats: 50,
          eligibility: "GATE",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 8500, obc: 12000, sc: 18000, st: 25000 },
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.0,
        description: "Modern hostels with AC rooms",
      },
      {
        name: "Library",
        available: true,
        rating: 4.1,
        description: "Digital library with vast collection",
      },
      {
        name: "Labs",
        available: true,
        rating: 4.2,
        description: "State-of-the-art laboratories",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #15",
        year: 2024,
        description: "15th rank in Engineering category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹8.9 LPA",
      highestPackage: "₹41.6 LPA",
      placementRate: 82.1,
      topRecruiters: ["TCS", "Infosys", "Capgemini", "Cognizant"],
      trends: [
        { year: 2024, average: 8.9, highest: 41.6, rate: 82.1 },
      ],
    },
    reviews: {
      overallRating: 3.9,
      totalReviews: 2134,
      sentiment: "positive",
      breakdown: {
        academics: 4.0,
        faculty: 3.8,
        infrastructure: 4.2,
        placements: 4.1,
        campus: 3.7,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Great campus life and good placement opportunities.",
          author: "Arjun V.",
          date: "2024-08-05",
          helpful: 16,
        },
      ],
    },
    notableAlumni: ["Multiple tech industry professionals"],
    description: "VIT is a renowned private university with excellent facilities.",
    photos: ["/placeholder8.jpg"],
  },
  {
    id: "aiims_delhi",
    name: "All India Institute of Medical Sciences Delhi",
    type: "Government",
    location: "Ansari Nagar, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    establishedYear: 1956,
    naacGrade: "A++",
    affiliation: "Institute of National Importance",
    coordinates: { lat: 28.5672, lng: 77.2100 },
    contact: {
      phone: "+91-11-2658-8500",
      email: "info@aiims.edu",
      website: "https://www.aiims.edu",
    },
    programs: {
      undergraduate: [
        {
          name: "MBBS",
          duration: "5.5 years",
          seats: 125,
          eligibility: "NEET UG",
        },
        {
          name: "B.Sc Nursing",
          duration: "4 years",
          seats: 60,
          eligibility: "AIIMS B.Sc Nursing Entrance",
        },
      ],
      postgraduate: [
        {
          name: "MD General Medicine",
          duration: "3 years",
          seats: 15,
          eligibility: "NEET PG",
        },
        {
          name: "MS Surgery",
          duration: "3 years",
          seats: 12,
          eligibility: "NEET PG",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 50, obc: 156, sc: 1256, st: 2134 },
    ],
    facilities: [
      {
        name: "Hospital",
        available: true,
        rating: 4.9,
        description: "1,312-bed multi-specialty hospital",
      },
      {
        name: "Hostel",
        available: true,
        rating: 4.3,
        description: "On-campus accommodation for students",
      },
      {
        name: "Library",
        available: true,
        rating: 4.7,
        description: "Medical library with extensive collection",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #1",
        year: 2024,
        description: "1st rank in Medical category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹15-25 LPA",
      highestPackage: "₹50+ LPA",
      placementRate: 100,
      topRecruiters: ["AIIMS", "PGIMER", "JIPMER", "Private Hospitals"],
      trends: [
        { year: 2024, average: 20, highest: 50, rate: 100 },
      ],
    },
    reviews: {
      overallRating: 4.8,
      totalReviews: 867,
      sentiment: "positive",
      breakdown: {
        academics: 4.9,
        faculty: 4.8,
        infrastructure: 4.7,
        placements: 4.8,
        campus: 4.6,
      },
      recentReviews: [
        {
          id: "1",
          rating: 5,
          text: "Best medical education in India with excellent clinical exposure.",
          author: "Dr. Sneha K.",
          date: "2024-08-12",
          helpful: 45,
        },
      ],
    },
    notableAlumni: ["Dr. Harsh Vardhan", "Dr. V.K. Paul"],
    description: "AIIMS Delhi is India's premier medical institute and hospital.",
    photos: ["/placeholder9.jpg"],
  },
  {
    id: "iim_ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    type: "Government",
    location: "Vastrapur, Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    establishedYear: 1961,
    naacGrade: "A++",
    affiliation: "Institute of National Importance",
    coordinates: { lat: 23.0347, lng: 72.5157 },
    contact: {
      phone: "+91-79-6632-4000",
      email: "info@iima.ac.in",
      website: "https://www.iima.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "IPM (Integrated Program in Management)",
          duration: "5 years",
          seats: 120,
          eligibility: "IPMAT",
        },
      ],
      postgraduate: [
        {
          name: "MBA (PGPM)",
          duration: "2 years",
          seats: 395,
          eligibility: "CAT",
        },
        {
          name: "MBA-PGPX",
          duration: "1 year",
          seats: 120,
          eligibility: "Work Experience + GMAT/GRE",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 100, obc: 100, sc: 100, st: 100 }, // CAT percentile
    ],
    facilities: [
      {
        name: "Hostel",
        available: true,
        rating: 4.6,
        description: "On-campus residential facilities",
      },
      {
        name: "Library",
        available: true,
        rating: 4.8,
        description: "Vikram Sarabhai Library with vast management collection",
      },
      {
        name: "Computer Center",
        available: true,
        rating: 4.7,
        description: "Advanced computing facilities",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #1",
        year: 2024,
        description: "1st rank in Management category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹34.36 LPA",
      highestPackage: "₹1.15 CPA",
      placementRate: 100,
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs"],
      trends: [
        { year: 2024, average: 34.36, highest: 115, rate: 100 },
      ],
    },
    reviews: {
      overallRating: 4.7,
      totalReviews: 1243,
      sentiment: "positive",
      breakdown: {
        academics: 4.8,
        faculty: 4.7,
        infrastructure: 4.6,
        placements: 4.9,
        campus: 4.5,
      },
      recentReviews: [
        {
          id: "1",
          rating: 5,
          text: "Exceptional faculty and unparalleled placement opportunities.",
          author: "Rohit A.",
          date: "2024-08-18",
          helpful: 67,
        },
      ],
    },
    notableAlumni: ["Mukesh Ambani", "Kumar Mangalam Birla"],
    description: "IIM Ahmedabad is India's premier management institute.",
    photos: ["/placeholder10.jpg"],
  },
  {
    id: "nlu_delhi",
    name: "National Law University Delhi",
    type: "Government",
    location: "Sector 14, Dwarka, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    establishedYear: 2008,
    naacGrade: "A+",
    affiliation: "State University",
    coordinates: { lat: 28.5923, lng: 77.0463 },
    contact: {
      phone: "+91-11-2787-9200",
      email: "info@nludelhi.ac.in",
      website: "https://www.nludelhi.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.A. LL.B. (Hons.)",
          duration: "5 years",
          seats: 120,
          eligibility: "CLAT",
        },
      ],
      postgraduate: [
        {
          name: "LL.M.",
          duration: "1 year",
          seats: 60,
          eligibility: "CLAT PG",
        },
        {
          name: "Ph.D. in Law",
          duration: "3-5 years",
          seats: 20,
          eligibility: "UGC NET/CLAT PG",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 89, obc: 267, sc: 1456, st: 2134 }, // CLAT rank
    ],
    facilities: [
      {
        name: "Library",
        available: true,
        rating: 4.5,
        description: "Law library with extensive legal database",
      },
      {
        name: "Hostel",
        available: true,
        rating: 4.2,
        description: "Separate hostels for boys and girls",
      },
      {
        name: "Moot Court",
        available: true,
        rating: 4.6,
        description: "State-of-the-art moot court hall",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #2",
        year: 2024,
        description: "2nd rank in Law category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹12.5 LPA",
      highestPackage: "₹28 LPA",
      placementRate: 92.3,
      topRecruiters: ["Khaitan & Co", "AZB & Partners", "Cyril Amarchand Mangaldas"],
      trends: [
        { year: 2024, average: 12.5, highest: 28, rate: 92.3 },
      ],
    },
    reviews: {
      overallRating: 4.4,
      totalReviews: 456,
      sentiment: "positive",
      breakdown: {
        academics: 4.5,
        faculty: 4.4,
        infrastructure: 4.3,
        placements: 4.5,
        campus: 4.2,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Excellent faculty and good placement opportunities in law firms.",
          author: "Aditi S.",
          date: "2024-07-22",
          helpful: 19,
        },
      ],
    },
    notableAlumni: ["Various Supreme Court advocates"],
    description: "NLU Delhi is a premier law university with excellent academic standards.",
    photos: ["/placeholder11.jpg"],
  },
  {
    id: "du_stephens",
    name: "St. Stephen's College, Delhi University",
    type: "Aided",
    location: "University Enclave, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    establishedYear: 1881,
    naacGrade: "A++",
    affiliation: "University of Delhi",
    coordinates: { lat: 28.6856, lng: 77.2093 },
    contact: {
      phone: "+91-11-2766-7351",
      email: "principal@ststephens.edu",
      website: "https://www.ststephens.edu",
    },
    programs: {
      undergraduate: [
        {
          name: "B.A. (Hons.) Economics",
          duration: "3 years",
          seats: 35,
          eligibility: "CUET",
        },
        {
          name: "B.A. (Hons.) English",
          duration: "3 years",
          seats: 30,
          eligibility: "CUET",
        },
        {
          name: "B.Sc. (Hons.) Physics",
          duration: "3 years",
          seats: 35,
          eligibility: "CUET",
        },
      ],
      postgraduate: [],
    },
    cutoffs: [
      { year: 2024, open: 99.75, obc: 99.25, sc: 97.5, st: 95.0 }, // CUET percentile
    ],
    facilities: [
      {
        name: "Library",
        available: true,
        rating: 4.8,
        description: "Historic library with rare collections",
      },
      {
        name: "Chapel",
        available: true,
        rating: 4.7,
        description: "Beautiful college chapel",
      },
      {
        name: "Hostel",
        available: true,
        rating: 4.1,
        description: "On-campus accommodation",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #2",
        year: 2024,
        description: "2nd rank in College category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹8.5 LPA",
      highestPackage: "₹35 LPA",
      placementRate: 78.5,
      topRecruiters: ["Goldman Sachs", "JP Morgan", "Deloitte", "EY"],
      trends: [
        { year: 2024, average: 8.5, highest: 35, rate: 78.5 },
      ],
    },
    reviews: {
      overallRating: 4.5,
      totalReviews: 723,
      sentiment: "positive",
      breakdown: {
        academics: 4.7,
        faculty: 4.6,
        infrastructure: 4.2,
        placements: 4.3,
        campus: 4.8,
      },
      recentReviews: [
        {
          id: "1",
          rating: 5,
          text: "Rich academic tradition and excellent faculty.",
          author: "Ravi K.",
          date: "2024-08-08",
          helpful: 34,
        },
      ],
    },
    notableAlumni: ["Dr. Manmohan Singh", "Shashi Tharoor"],
    description: "St. Stephen's College is one of India's most prestigious liberal arts colleges.",
    photos: ["/placeholder12.jpg"],
  },
  {
    id: "jnu_delhi",
    name: "Jawaharlal Nehru University",
    type: "Government",
    location: "New Mehrauli Road, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    establishedYear: 1969,
    naacGrade: "A++",
    affiliation: "Central University",
    coordinates: { lat: 28.5383, lng: 77.1641 },
    contact: {
      phone: "+91-11-2670-4000",
      email: "info@jnu.ac.in",
      website: "https://www.jnu.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.A. (Hons.) History",
          duration: "3 years",
          seats: 40,
          eligibility: "CUET",
        },
        {
          name: "B.A. (Hons.) Political Science",
          duration: "3 years",
          seats: 45,
          eligibility: "CUET",
        },
      ],
      postgraduate: [
        {
          name: "M.A. International Relations",
          duration: "2 years",
          seats: 50,
          eligibility: "JNU Entrance",
        },
        {
          name: "M.A. Economics",
          duration: "2 years",
          seats: 35,
          eligibility: "JNU Entrance",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 95.5, obc: 92.3, sc: 85.2, st: 78.5 },
    ],
    facilities: [
      {
        name: "Library",
        available: true,
        rating: 4.9,
        description: "One of Asia's largest university libraries",
      },
      {
        name: "Hostel",
        available: true,
        rating: 4.4,
        description: "Multiple hostels across campus",
      },
      {
        name: "Sports Complex",
        available: true,
        rating: 4.3,
        description: "Comprehensive sports facilities",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #2",
        year: 2024,
        description: "2nd rank in University category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹6.8 LPA",
      highestPackage: "₹22 LPA",
      placementRate: 65.4,
      topRecruiters: ["Government", "NGOs", "Media Houses", "Think Tanks"],
      trends: [
        { year: 2024, average: 6.8, highest: 22, rate: 65.4 },
      ],
    },
    reviews: {
      overallRating: 4.3,
      totalReviews: 1834,
      sentiment: "positive",
      breakdown: {
        academics: 4.6,
        faculty: 4.5,
        infrastructure: 4.0,
        placements: 3.8,
        campus: 4.7,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Excellent for social sciences and research opportunities.",
          author: "Priya M.",
          date: "2024-07-28",
          helpful: 26,
        },
      ],
    },
    notableAlumni: ["Sitaram Yechury", "Nirmala Sitharaman"],
    description: "JNU is renowned for social sciences and liberal arts education.",
    photos: ["/placeholder13.jpg"],
  },
  {
    id: "nift_delhi",
    name: "National Institute of Fashion Technology Delhi",
    type: "Government",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi", 
    state: "Delhi",
    establishedYear: 1986,
    naacGrade: "A+",
    affiliation: "Statutory Institute",
    coordinates: { lat: 28.5494, lng: 77.1917 },
    contact: {
      phone: "+91-11-2696-2064",
      email: "niftdelhi@nift.ac.in",
      website: "https://www.nift.ac.in/delhi",
    },
    programs: {
      undergraduate: [
        {
          name: "B.Des Fashion Design",
          duration: "4 years",
          seats: 30,
          eligibility: "NIFT Entrance",
        },
        {
          name: "B.FTech Fashion Technology",
          duration: "4 years",
          seats: 30,
          eligibility: "NIFT Entrance",
        },
      ],
      postgraduate: [
        {
          name: "M.Des Fashion Design",
          duration: "2 years",
          seats: 20,
          eligibility: "NIFT Entrance",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 45, obc: 78, sc: 156, st: 234 }, // NIFT rank
    ],
    facilities: [
      {
        name: "Design Studios",
        available: true,
        rating: 4.7,
        description: "State-of-the-art design studios",
      },
      {
        name: "Fashion Lab",
        available: true,
        rating: 4.6,
        description: "Advanced fashion technology labs",
      },
      {
        name: "Library",
        available: true,
        rating: 4.4,
        description: "Fashion and design resource center",
      },
    ],
    achievements: [
      {
        title: "Top Fashion Institute",
        year: 2024,
        description: "Leading fashion design institute in India",
        type: "recognition",
      },
    ],
    placements: {
      averagePackage: "₹7.2 LPA",
      highestPackage: "₹25 LPA",
      placementRate: 88.7,
      topRecruiters: ["Zara", "H&M", "Myntra", "Fabindia"],
      trends: [
        { year: 2024, average: 7.2, highest: 25, rate: 88.7 },
      ],
    },
    reviews: {
      overallRating: 4.2,
      totalReviews: 387,
      sentiment: "positive",
      breakdown: {
        academics: 4.4,
        faculty: 4.3,
        infrastructure: 4.5,
        placements: 4.1,
        campus: 3.9,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Great for fashion design with industry exposure.",
          author: "Ananya S.",
          date: "2024-08-02",
          helpful: 14,
        },
      ],
    },
    notableAlumni: ["Manish Malhotra", "Sabyasachi Mukherjee"],
    description: "NIFT Delhi is India's premier fashion and design institute.",
    photos: ["/placeholder14.jpg"],
  },
  {
    id: "isikolkata",
    name: "Indian Statistical Institute Kolkata",
    type: "Government",
    location: "203, B.T. Road, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    establishedYear: 1931,
    naacGrade: "A++",
    affiliation: "Institute of National Importance",
    coordinates: { lat: 22.6542, lng: 88.3885 },
    contact: {
      phone: "+91-33-2575-2001",
      email: "office@isical.ac.in",
      website: "https://www.isical.ac.in",
    },
    programs: {
      undergraduate: [
        {
          name: "B.Stat (Hons.)",
          duration: "3 years",
          seats: 45,
          eligibility: "ISI Admission Test",
        },
        {
          name: "B.Math (Hons.)",
          duration: "3 years",
          seats: 25,
          eligibility: "ISI Admission Test",
        },
      ],
      postgraduate: [
        {
          name: "M.Stat",
          duration: "2 years",
          seats: 40,
          eligibility: "ISI Admission Test",
        },
        {
          name: "M.Tech Computer Science",
          duration: "2 years",
          seats: 25,
          eligibility: "ISI Admission Test",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 35, obc: 89, sc: 245, st: 356 }, // ISI rank
    ],
    facilities: [
      {
        name: "Library",
        available: true,
        rating: 4.8,
        description: "Excellent statistical and mathematical collection",
      },
      {
        name: "Computer Lab",
        available: true,
        rating: 4.7,
        description: "Advanced computing facilities",
      },
      {
        name: "Hostel",
        available: true,
        rating: 4.0,
        description: "Basic but adequate accommodation",
      },
    ],
    achievements: [
      {
        title: "Premier Statistics Institute",
        year: 2024,
        description: "Leading institute for statistics and mathematics",
        type: "recognition",
      },
    ],
    placements: {
      averagePackage: "₹15.6 LPA",
      highestPackage: "₹45 LPA",
      placementRate: 94.2,
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "D.E. Shaw"],
      trends: [
        { year: 2024, average: 15.6, highest: 45, rate: 94.2 },
      ],
    },
    reviews: {
      overallRating: 4.4,
      totalReviews: 234,
      sentiment: "positive",
      breakdown: {
        academics: 4.8,
        faculty: 4.7,
        infrastructure: 3.9,
        placements: 4.5,
        campus: 4.0,
      },
      recentReviews: [
        {
          id: "1",
          rating: 5,
          text: "Unmatched for statistics and mathematics education.",
          author: "Sameer D.",
          date: "2024-08-14",
          helpful: 22,
        },
      ],
    },
    notableAlumni: ["C.R. Rao (Statistician)", "Prasanta Chandra Mahalanobis"],
    description: "ISI Kolkata is the world's premier institute for statistical education.",
    photos: ["/placeholder15.jpg"],
  },
  {
    id: "christ_bangalore",
    name: "Christ University Bangalore",
    type: "Private",
    location: "Hosur Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    establishedYear: 1969,
    naacGrade: "A++",
    affiliation: "Deemed University",
    coordinates: { lat: 12.9345, lng: 77.6101 },
    contact: {
      phone: "+91-80-4012-9292",
      email: "info@christuniversity.in",
      website: "https://christuniversity.in",
    },
    programs: {
      undergraduate: [
        {
          name: "BBA",
          duration: "3 years",
          seats: 180,
          eligibility: "Christ University Entrance",
        },
        {
          name: "B.Com (Hons.)",
          duration: "3 years",
          seats: 120,
          eligibility: "Merit Based",
        },
        {
          name: "B.A. Psychology",
          duration: "3 years",
          seats: 60,
          eligibility: "Christ University Entrance",
        },
      ],
      postgraduate: [
        {
          name: "MBA",
          duration: "2 years",
          seats: 180,
          eligibility: "CAT/MAT/CMAT",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 85.5, obc: 82.3, sc: 75.6, st: 70.2 },
    ],
    facilities: [
      {
        name: "Library",
        available: true,
        rating: 4.5,
        description: "Modern library with digital resources",
      },
      {
        name: "Hostel",
        available: true,
        rating: 4.2,
        description: "Separate hostels for boys and girls",
      },
      {
        name: "Sports Complex",
        available: true,
        rating: 4.4,
        description: "Comprehensive sports facilities",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #20",
        year: 2024,
        description: "20th rank in University category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹6.5 LPA",
      highestPackage: "₹18 LPA",
      placementRate: 76.8,
      topRecruiters: ["Deloitte", "EY", "KPMG", "Accenture"],
      trends: [
        { year: 2024, average: 6.5, highest: 18, rate: 76.8 },
      ],
    },
    reviews: {
      overallRating: 4.1,
      totalReviews: 1456,
      sentiment: "positive",
      breakdown: {
        academics: 4.2,
        faculty: 4.1,
        infrastructure: 4.3,
        placements: 4.0,
        campus: 4.2,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Good for management and commerce programs.",
          author: "Neha J.",
          date: "2024-07-18",
          helpful: 17,
        },
      ],
    },
    notableAlumni: ["Various business leaders"],
    description: "Christ University is known for quality education across multiple disciplines.",
    photos: ["/placeholder16.jpg"],
  },
  {
    id: "manipal_main",
    name: "Manipal Academy of Higher Education",
    type: "Private",
    location: "Manipal, Karnataka",
    city: "Manipal",
    state: "Karnataka",
    establishedYear: 1953,
    naacGrade: "A++",
    affiliation: "Deemed University",
    coordinates: { lat: 13.3519, lng: 74.7854 },
    contact: {
      phone: "+91-820-292-3000",
      email: "info@manipal.edu",
      website: "https://www.manipal.edu",
    },
    programs: {
      undergraduate: [
        {
          name: "MBBS",
          duration: "5.5 years",
          seats: 150,
          eligibility: "NEET UG",
        },
        {
          name: "B.Tech Computer Science",
          duration: "4 years",
          seats: 120,
          eligibility: "MET/JEE Main",
        },
        {
          name: "BDS",
          duration: "5 years",
          seats: 100,
          eligibility: "NEET UG",
        },
      ],
      postgraduate: [
        {
          name: "MD Pediatrics",
          duration: "3 years",
          seats: 8,
          eligibility: "NEET PG",
        },
      ],
    },
    cutoffs: [
      { year: 2024, open: 456, obc: 1234, sc: 3456, st: 5678 },
    ],
    facilities: [
      {
        name: "Hospital",
        available: true,
        rating: 4.6,
        description: "Kasturba Medical College Hospital",
      },
      {
        name: "Hostel",
        available: true,
        rating: 4.3,
        description: "Multiple hostels with good facilities",
      },
      {
        name: "Library",
        available: true,
        rating: 4.4,
        description: "Well-stocked library with digital access",
      },
    ],
    achievements: [
      {
        title: "NIRF Ranking #17",
        year: 2024,
        description: "17th rank in University category",
        type: "ranking",
      },
    ],
    placements: {
      averagePackage: "₹8.8 LPA",
      highestPackage: "₹32 LPA",
      placementRate: 82.4,
      topRecruiters: ["Apollo Hospitals", "TCS", "Infosys", "Amazon"],
      trends: [
        { year: 2024, average: 8.8, highest: 32, rate: 82.4 },
      ],
    },
    reviews: {
      overallRating: 4.2,
      totalReviews: 2134,
      sentiment: "positive",
      breakdown: {
        academics: 4.3,
        faculty: 4.2,
        infrastructure: 4.4,
        placements: 4.1,
        campus: 4.0,
      },
      recentReviews: [
        {
          id: "1",
          rating: 4,
          text: "Good for medical and engineering programs.",
          author: "Vikash M.",
          date: "2024-07-20",
          helpful: 19,
        },
      ],
    },
    notableAlumni: ["Dr. Satish Reddy", "Rajeev Suri"],
    description: "Manipal is a multidisciplinary university with strong medical and engineering programs.",
    photos: ["/placeholder17.jpg"],
  },
];