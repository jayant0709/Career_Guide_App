// React Native doesn't have lucide-react, so we'll use @expo/vector-icons instead
// We'll reference these icon names for use with Ionicons
export const features = [
  {
    iconName: "location-outline", // MapPin equivalent
    title: "Course-to-Career Path Mapping",
    description:
      "Provides degree-to-career roadmaps showing subjects, required skills, higher studies, and job options, reducing uncertainty about future opportunities.",
    example:
      "A student interested in technology takes our quiz and discovers they have strong analytical skills. We show them the Computer Science path: subjects like Programming, Math, and Data Structures, leading to careers in Software Development, Data Science, or AI Engineering.",
    tip: "Most students don't know that Computer Science has 15+ different career specializations!",
  },
  {
    iconName: "book-outline", // BookOpen equivalent
    title: "Nearby Government Colleges Directory",
    description:
      "Compares government and private colleges with details like cutoffs, facilities, placements, and achievements, enabling students to make informed choices.",
    example:
      "Search for Engineering colleges in Mumbai and compare IIT Bombay (99.5 percentile cutoff) vs VJTI (95 percentile cutoff) with detailed placement statistics, hostel facilities, and fee structures.",
    tip: "Government colleges often offer 80% lower fees than private ones with similar placement rates!",
  },
  {
    iconName: "time-outline", // Clock equivalent
    title: "Timeline Tracker & Opportunity Hub",
    description:
      "Delivers admission deadlines, exam schedules, scholarships, and career news updates, ensuring students stay focused and never miss key opportunities.",
    example:
      "Get alerts for JEE Main registration (January), NEET application deadline (March), and state scholarship applications (April) - all personalized to your chosen career path.",
    tip: "Students miss out on ₹2+ crore worth of scholarships annually due to missed deadlines!",
  },
  {
    iconName: "cash-outline", // DollarSign equivalent
    title: "Scholarship & Financial Aid Navigator",
    description:
      "Aggregates government and NGO schemes, matches them to student profiles, and assists in applications, removing affordability barriers to higher education.",
    example:
      "A student from rural Maharashtra with 85% marks gets matched with Post-Matric Scholarship (₹12,000/year), Merit Scholarship (₹25,000), and local NGO aid (₹15,000) - total ₹52,000 in funding.",
    tip: "There are 200+ scholarships available, but most students only know about 5-10 of them!",
  },
];

export const steps = [
  {
    iconName: "document-text-outline", // FileText equivalent
    title: "Take a short aptitude & interest quiz",
    description:
      "Get a personalized skills report that reveals your strengths and interests in just 5 minutes.",
    example:
      "Sarah discovers she has high spatial intelligence and creativity scores, pointing towards Architecture or Industrial Design careers.",
  },
  {
    iconName: "search-outline", // Search equivalent
    title: "Explore mapped course → career paths",
    description:
      "Learn about subjects, required skills, and job opportunities that align with your profile.",
    example:
      "Based on your results, explore the Engineering path: Physics, Chemistry, Math → JEE preparation → B.Tech → Software Developer (₹8-15 LPA starting salary).",
  },
  {
    iconName: "checkmark-circle-outline", // CheckCircle equivalent
    title: "Find colleges, deadlines & scholarships",
    description:
      "Apply to the right colleges and secure financial aid to plan your next steps with confidence.",
    example:
      "Get a customized list: Apply to IIT Delhi (JEE deadline: Jan 30), backup options like NSIT, plus 3 relevant scholarships totaling ₹75,000.",
  },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    details: "Class 12, Mumbai",
    quote:
      "Career Sarthi helped me choose engineering over commerce. The aptitude test showed I had strong logical thinking skills, and now I'm confident about my future!",
  },
  {
    name: "Rahul Verma",
    details: "Class 10, Delhi",
    quote:
      "I was confused about streams after 10th. The career path mapping showed me exactly what subjects to take for my dream job in graphic design.",
  },
  {
    name: "Ananya Singh",
    details: "Class 12, Bangalore",
    quote:
      "Found 3 government scholarships through Career Sarthi that I never knew existed. It's going to save my family ₹2 lakhs in college fees!",
  },
];

export const timelineItems = [
  {
    title: "JEE Main Registration",
    description:
      "Joint Entrance Examination for engineering colleges. Register early to avoid last-minute rush.",
    date: "Jan 15, 2024",
    category: "Exams",
    amount: null,
  },
  {
    title: "NEET Application Deadline",
    description:
      "National Eligibility cum Entrance Test for medical courses. Complete your application before the deadline.",
    date: "Mar 20, 2024",
    category: "Deadlines",
    amount: null,
  },
  {
    title: "Merit Scholarship Applications Open",
    description:
      "Government merit-based scholarships for Class 12 students. Apply with your board exam scores.",
    date: "Apr 10, 2024",
    category: "Scholarships",
    amount: "25000",
  },
  {
    title: "State Board Exam Results",
    description:
      "Maharashtra State Board Class 12 results declaration. Check your scores for college applications.",
    date: "May 25, 2024",
    category: "Exams",
    amount: null,
  },
  {
    title: "Engineering College Admissions",
    description:
      "First round of engineering college admissions based on JEE Main scores.",
    date: "Jun 15, 2024",
    category: "Deadlines",
    amount: null,
  },
  {
    title: "Post-Matric Scholarship Deadline",
    description:
      "Last date to apply for post-matriculation scholarships for SC/ST/OBC students.",
    date: "Jul 30, 2024",
    category: "Scholarships",
    amount: "12000",
  },
];

export const colleges = [
  {
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government",
    rating: "4.8",
    cutoff: "99.5%ile",
    placement: "98",
    facilities:
      "World-class labs, research facilities, hostels, sports complex, 200+ clubs",
  },
  {
    name: "VJTI Mumbai",
    location: "Mumbai, Maharashtra",
    type: "Government",
    rating: "4.5",
    cutoff: "95%ile",
    placement: "92",
    facilities:
      "Modern labs, library, hostels, industry partnerships, placement cell",
  },
  {
    name: "College of Engineering Pune",
    location: "Pune, Maharashtra",
    type: "Government",
    rating: "4.3",
    cutoff: "92%ile",
    placement: "88",
    facilities:
      "Research centers, well-equipped labs, hostels, sports facilities",
  },
  {
    name: "MIT Pune",
    location: "Pune, Maharashtra",
    type: "Private",
    rating: "4.2",
    cutoff: "85%ile",
    placement: "90",
    facilities:
      "Modern infrastructure, industry tie-ups, innovation labs, hostels",
  },
  {
    name: "BITS Pilani Goa",
    location: "Goa",
    type: "Private",
    rating: "4.6",
    cutoff: "96%ile",
    placement: "95",
    facilities:
      "Beach campus, research labs, hostels, extensive alumni network",
  },
  {
    name: "NIT Surathkal",
    location: "Karnataka",
    type: "Government",
    rating: "4.4",
    cutoff: "94%ile",
    placement: "89",
    facilities:
      "Coastal campus, research facilities, hostels, technical festivals",
  },
];