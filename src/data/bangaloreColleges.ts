export interface CollegeCourse {
  name: string
  stream: string
  duration: string
  feesPerYear: number
  eligibility: string
  intake: number
}

export interface BangaloreCollege {
  name: string
  type: 'Government' | 'Government-Aided' | 'Private' | 'Deemed University'
  area: string
  established: number
  courses: CollegeCourse[]
  hostelAvailable: boolean
  rating?: number
}

export const bangaloreColleges: BangaloreCollege[] = [
  // ─── GOVERNMENT COLLEGES ───
  {
    name: 'University Visvesvaraya College of Engineering (UVCE)',
    type: 'Government',
    area: 'KR Circle',
    established: 1917,
    hostelAvailable: true,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 18000, eligibility: 'KCET rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 18000, eligibility: 'KCET rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Mechanical Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 18000, eligibility: 'KCET rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Civil Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 18000, eligibility: 'KCET rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'Bangalore Medical College & Research Institute (BMCRI)',
    type: 'Government',
    area: 'KR Market',
    established: 1955,
    hostelAvailable: true,
    courses: [
      { name: 'MBBS', stream: 'Medical', duration: '5.5 years', feesPerYear: 12000, eligibility: 'NEET rank, PCB in 12th with 50%', intake: 250 },
      { name: 'MD/MS (Postgraduate)', stream: 'Medical', duration: '3 years', feesPerYear: 25000, eligibility: 'NEET PG rank', intake: 100 },
    ],
  },
  {
    name: 'Government College of Pharmacy',
    type: 'Government',
    area: 'Veterinary College Compound, Hebbal',
    established: 1964,
    hostelAvailable: false,
    courses: [
      { name: 'B.Pharm', stream: 'Pharmacy', duration: '4 years', feesPerYear: 8000, eligibility: 'PCM/B in 12th with 45%, KCET', intake: 60 },
      { name: 'Pharm.D', stream: 'Pharmacy', duration: '6 years', feesPerYear: 12000, eligibility: 'PCB in 12th with 50%', intake: 30 },
    ],
  },
  {
    name: 'Government Law College',
    type: 'Government',
    area: 'Basaveshwaranagar',
    established: 1948,
    hostelAvailable: false,
    courses: [
      { name: 'BA LLB (Integrated)', stream: 'Law', duration: '5 years', feesPerYear: 5000, eligibility: '60% in 12th, CLAT/LAWCET', intake: 120 },
      { name: 'LLB (3 years)', stream: 'Law', duration: '3 years', feesPerYear: 5000, eligibility: 'Any degree with 45%', intake: 60 },
    ],
  },
  {
    name: 'Government First Grade College (GFGC)',
    type: 'Government',
    area: 'Multiple locations (Koramangala, RT Nagar, etc.)',
    established: 1970,
    hostelAvailable: false,
    courses: [
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 3500, eligibility: 'Pass in 12th, any stream', intake: 120 },
      { name: 'B.Sc (Physics, Chemistry, Maths)', stream: 'Science', duration: '3 years', feesPerYear: 3500, eligibility: 'PCM in 12th', intake: 60 },
      { name: 'BA (Arts)', stream: 'Arts', duration: '3 years', feesPerYear: 3000, eligibility: 'Pass in 12th', intake: 60 },
    ],
  },
  {
    name: 'Maharani\'s Science College for Women',
    type: 'Government',
    area: 'Jayanagar',
    established: 1972,
    hostelAvailable: true,
    courses: [
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 5000, eligibility: 'PCM in 12th', intake: 120 },
      { name: 'B.Sc (PCB)', stream: 'Science', duration: '3 years', feesPerYear: 5000, eligibility: 'PCB in 12th', intake: 120 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 4000, eligibility: 'Pass in 12th', intake: 80 },
    ],
  },
  {
    name: 'Maharani\'s Arts College for Women',
    type: 'Government',
    area: 'Jayanagar',
    established: 1968,
    hostelAvailable: true,
    courses: [
      { name: 'BA (Arts)', stream: 'Arts', duration: '3 years', feesPerYear: 3000, eligibility: 'Pass in 12th', intake: 120 },
      { name: 'BA Journalism', stream: 'Arts', duration: '3 years', feesPerYear: 3500, eligibility: 'Pass in 12th', intake: 60 },
    ],
  },
  {
    name: 'Bangalore University (Central College Campus)',
    type: 'Government',
    area: 'Central College, Palace Road',
    established: 1965,
    hostelAvailable: true,
    courses: [
      { name: 'B.Sc (Various combinations)', stream: 'Science', duration: '3 years', feesPerYear: 10000, eligibility: 'PCM/PCB in 12th', intake: 200 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 8000, eligibility: 'Pass in 12th', intake: 150 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 12000, eligibility: 'Pass in 12th with 50%', intake: 60 },
    ],
  },
  {
    name: 'Government Tool Room & Training Centre (GTTC)',
    type: 'Government',
    area: 'Peenya',
    established: 1976,
    hostelAvailable: true,
    courses: [
      { name: 'Diploma in Tool & Die Making', stream: 'Vocational', duration: '3 years', feesPerYear: 5000, eligibility: 'Pass in 10th (SSLC)', intake: 60 },
      { name: 'Diploma in Mechatronics', stream: 'Vocational', duration: '3 years', feesPerYear: 5000, eligibility: 'Pass in 10th (SSLC)', intake: 30 },
    ],
  },
  {
    name: 'Government Polytechnic (Multiple Campuses)',
    type: 'Government',
    area: 'Various (Chamarajpet, Kengeri, etc.)',
    established: 1959,
    hostelAvailable: true,
    courses: [
      { name: 'Diploma in Civil Engineering', stream: 'Vocational', duration: '3 years', feesPerYear: 4000, eligibility: 'Pass in 10th (SSLC)', intake: 60 },
      { name: 'Diploma in Mechanical Engineering', stream: 'Vocational', duration: '3 years', feesPerYear: 4000, eligibility: 'Pass in 10th (SSLC)', intake: 60 },
      { name: 'Diploma in Computer Science', stream: 'Vocational', duration: '3 years', feesPerYear: 4000, eligibility: 'Pass in 10th (SSLC)', intake: 60 },
    ],
  },

  // ─── GOVERNMENT-AIDED COLLEGES ───
  {
    name: 'St. Joseph\'s College (Autonomous)',
    type: 'Government-Aided',
    area: 'Langford Road',
    established: 1882,
    hostelAvailable: true,
    rating: 4.5,
    courses: [
      { name: 'B.Sc (PCM/PCB)', stream: 'Science', duration: '3 years', feesPerYear: 30000, eligibility: 'PCM/PCB in 12th with 50%', intake: 300 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 28000, eligibility: 'Pass in 12th with 50%', intake: 240 },
      { name: 'BA (Arts)', stream: 'Arts', duration: '3 years', feesPerYear: 25000, eligibility: 'Pass in 12th with 45%', intake: 120 },
      { name: 'BCA', stream: 'Computer Applications', duration: '3 years', feesPerYear: 35000, eligibility: 'Pass in 12th with Maths', intake: 60 },
    ],
  },
  {
    name: 'Mount Carmel College (Autonomous)',
    type: 'Government-Aided',
    area: 'Palace Road',
    established: 1948,
    hostelAvailable: true,
    rating: 4.4,
    courses: [
      { name: 'B.Sc (PCM/PCB)', stream: 'Science', duration: '3 years', feesPerYear: 35000, eligibility: 'PCM/PCB in 12th with 50%', intake: 200 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 32000, eligibility: 'Pass in 12th with 50%', intake: 200 },
      { name: 'BA Psychology', stream: 'Arts', duration: '3 years', feesPerYear: 30000, eligibility: 'Pass in 12th with 50%', intake: 60 },
    ],
  },
  {
    name: 'MES College of Arts, Commerce & Science',
    type: 'Government-Aided',
    area: 'Malleshwaram',
    established: 1972,
    hostelAvailable: false,
    courses: [
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 25000, eligibility: 'PCM in 12th with 45%', intake: 120 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 22000, eligibility: 'Pass in 12th with 45%', intake: 120 },
      { name: 'BA', stream: 'Arts', duration: '3 years', feesPerYear: 18000, eligibility: 'Pass in 12th', intake: 60 },
    ],
  },
  {
    name: 'Vijaya College',
    type: 'Government-Aided',
    area: 'Basaveshwaranagar',
    established: 1975,
    hostelAvailable: false,
    courses: [
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 20000, eligibility: 'PCM in 12th with 45%', intake: 100 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 18000, eligibility: 'Pass in 12th with 45%', intake: 150 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 22000, eligibility: 'Pass in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'National College',
    type: 'Government-Aided',
    area: 'Basavanagudi',
    established: 1965,
    hostelAvailable: false,
    courses: [
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 20000, eligibility: 'PCM in 12th', intake: 100 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 20000, eligibility: 'Pass in 12th', intake: 100 },
      { name: 'BA', stream: 'Arts', duration: '3 years', feesPerYear: 15000, eligibility: 'Pass in 12th', intake: 60 },
    ],
  },
  {
    name: 'Acharya Pathashala College of Arts & Science',
    type: 'Government-Aided',
    area: 'Gandhi Nagar',
    established: 1967,
    hostelAvailable: false,
    courses: [
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 25000, eligibility: 'PCM in 12th with 45%', intake: 100 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 22000, eligibility: 'Pass in 12th with 45%', intake: 120 },
    ],
  },
  {
    name: 'BMS College of Engineering (BMSCE)',
    type: 'Government-Aided',
    area: 'Basavanagudi',
    established: 1946,
    hostelAvailable: true,
    rating: 4.3,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 85000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 180 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 85000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 180 },
      { name: 'BE Mechanical Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 80000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 180 },
      { name: 'BE Civil Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 80000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'R.V. College of Engineering (RVCE)',
    type: 'Government-Aided',
    area: 'Mysore Road',
    established: 1963,
    hostelAvailable: true,
    rating: 4.4,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 95000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 50%', intake: 180 },
      { name: 'BE Information Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 95000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 50%', intake: 120 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 90000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 50%', intake: 180 },
      { name: 'BE Aerospace Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 100000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 50%', intake: 60 },
    ],
  },

  // ─── PRIVATE COLLEGES ───
  {
    name: 'PES University (PES College of Engineering)',
    type: 'Private',
    area: 'Banshankari 3rd Stage',
    established: 1972,
    hostelAvailable: true,
    rating: 4.2,
    courses: [
      { name: 'B.Tech Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 250000, eligibility: 'COMEDK/PESSAT rank, PCM in 12th with 50%', intake: 240 },
      { name: 'B.Tech Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 220000, eligibility: 'COMEDK/PESSAT rank, PCM in 12th with 50%', intake: 120 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 200000, eligibility: 'Pass in 12th with 50%', intake: 120 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 150000, eligibility: 'Pass in 12th with 50%', intake: 60 },
    ],
  },
  {
    name: 'Dayananda Sagar University',
    type: 'Private',
    area: 'Kudlu Gate, Hosur Road',
    established: 1962,
    hostelAvailable: true,
    rating: 4.0,
    courses: [
      { name: 'B.Tech Computer Science', stream: 'Engineering', duration: '4 years', feesPerYear: 250000, eligibility: 'COMEDK/DSAT rank, PCM in 12th with 50%', intake: 180 },
      { name: 'B.Sc Nursing', stream: 'Medical', duration: '4 years', feesPerYear: 120000, eligibility: 'PCB in 12th with 45%', intake: 60 },
      { name: 'BCA', stream: 'Computer Applications', duration: '3 years', feesPerYear: 120000, eligibility: 'Pass in 12th with Maths', intake: 120 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 100000, eligibility: 'Pass in 12th', intake: 120 },
    ],
  },
  {
    name: 'BNM Institute of Technology',
    type: 'Private',
    area: 'Banashankari 2nd Stage',
    established: 2001,
    hostelAvailable: true,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 150000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 140000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
      { name: 'BE Mechanical Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 130000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'New Horizon College of Engineering',
    type: 'Private',
    area: 'Ring Road, Marathahalli',
    established: 2001,
    hostelAvailable: true,
    rating: 4.0,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 150000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Information Science', stream: 'Engineering', duration: '4 years', feesPerYear: 140000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
      { name: 'MBA', stream: 'Management', duration: '2 years', feesPerYear: 150000, eligibility: 'Any degree with 50%, PGCET rank', intake: 60 },
    ],
  },
  {
    name: 'CMR Institute of Technology (CMRIT)',
    type: 'Private',
    area: 'Whitefield',
    established: 2000,
    hostelAvailable: true,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 150000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 180 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 140000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
      { name: 'BE Artificial Intelligence & ML', stream: 'Engineering', duration: '4 years', feesPerYear: 180000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'REVA University',
    type: 'Private',
    area: 'Rukmini Knowledge Park, Yelahanka',
    established: 2012,
    hostelAvailable: true,
    courses: [
      { name: 'B.Tech Computer Science', stream: 'Engineering', duration: '4 years', feesPerYear: 180000, eligibility: 'COMEDK/REVA rank, PCM in 12th with 45%', intake: 180 },
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 80000, eligibility: 'PCM in 12th with 45%', intake: 60 },
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 70000, eligibility: 'Pass in 12th with 45%', intake: 120 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 90000, eligibility: 'Pass in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'Presidency College',
    type: 'Private',
    area: 'Hebbal',
    established: 1976,
    hostelAvailable: true,
    courses: [
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 80000, eligibility: 'Pass in 12th', intake: 120 },
      { name: 'BCA', stream: 'Computer Applications', duration: '3 years', feesPerYear: 90000, eligibility: 'Pass in 12th with Maths', intake: 60 },
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 80000, eligibility: 'PCM in 12th', intake: 60 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 90000, eligibility: 'Pass in 12th', intake: 60 },
    ],
  },
  {
    name: 'Brindavan College',
    type: 'Private',
    area: 'Dwarakanagar, Yelahanka',
    established: 2000,
    hostelAvailable: true,
    courses: [
      { name: 'B.Com', stream: 'Commerce', duration: '3 years', feesPerYear: 60000, eligibility: 'Pass in 12th', intake: 120 },
      { name: 'BCA', stream: 'Computer Applications', duration: '3 years', feesPerYear: 70000, eligibility: 'Pass in 12th with Maths', intake: 60 },
      { name: 'B.Sc (PCM)', stream: 'Science', duration: '3 years', feesPerYear: 60000, eligibility: 'PCM in 12th', intake: 60 },
    ],
  },
  {
    name: 'KLE College of Engineering & Technology',
    type: 'Private',
    area: 'Chikkabellandur, Carmelaram',
    established: 2008,
    hostelAvailable: true,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 120000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 110000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
      { name: 'BE Civil Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 100000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'Dr. Ambedkar Institute of Technology',
    type: 'Private',
    area: 'Near Jnana Bharathi Campus, Mallathahalli',
    established: 1980,
    hostelAvailable: true,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 85000, eligibility: 'KCET rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 80000, eligibility: 'KCET rank, PCM in 12th with 45%', intake: 60 },
      { name: 'BE Mechanical Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 75000, eligibility: 'KCET rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'AMC Engineering College',
    type: 'Private',
    area: 'Bannerghatta Road',
    established: 1999,
    hostelAvailable: true,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 110000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 100000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
      { name: 'BE Aerospace Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 130000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'Acharya Institute of Technology',
    type: 'Private',
    area: 'Acharya Post Office, Soldevanahalli',
    established: 2001,
    hostelAvailable: true,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 130000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'B.Sc Nursing', stream: 'Medical', duration: '4 years', feesPerYear: 100000, eligibility: 'PCB in 12th with 45%', intake: 60 },
      { name: 'BCA', stream: 'Computer Applications', duration: '3 years', feesPerYear: 80000, eligibility: 'Pass in 12th with Maths', intake: 60 },
    ],
  },

  // ─── DEEMED UNIVERSITIES ───
  {
    name: 'Indian Institute of Science (IISc)',
    type: 'Deemed University',
    area: 'Malleshwaram',
    established: 1909,
    hostelAvailable: true,
    rating: 4.8,
    courses: [
      { name: 'BS (Research) in Sciences', stream: 'Science', duration: '4 years', feesPerYear: 50000, eligibility: 'KVPY/JEE Advanced/NEET with top ranks', intake: 60 },
      { name: 'MTech (Various)', stream: 'Engineering', duration: '2 years', feesPerYear: 40000, eligibility: 'GATE rank, BE/B.Tech with 60%', intake: 200 },
      { name: 'PhD', stream: 'Research', duration: '5 years', feesPerYear: 20000, eligibility: 'UG/PG with strong research potential', intake: 300 },
    ],
  },
  {
    name: 'International Institute of Information Technology Bangalore (IIITB)',
    type: 'Deemed University',
    area: 'Electronic City',
    established: 1999,
    hostelAvailable: true,
    rating: 4.5,
    courses: [
      { name: 'B.Tech in Computer Science', stream: 'Engineering', duration: '4 years', feesPerYear: 200000, eligibility: 'JEE Mains rank, PCM in 12th with 60%', intake: 120 },
      { name: 'B.Tech in Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 200000, eligibility: 'JEE Mains rank, PCM in 12th with 60%', intake: 60 },
      { name: 'MTech in Computer Science', stream: 'Engineering', duration: '2 years', feesPerYear: 150000, eligibility: 'GATE rank, BE/B.Tech with 60%', intake: 60 },
    ],
  },
  {
    name: 'M.S. Ramaiah Institute of Technology (MSRIT)',
    type: 'Deemed University',
    area: 'Mathikere',
    established: 1962,
    hostelAvailable: true,
    rating: 4.2,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 200000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 180 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 180000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Mechanical Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 170000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'B.Arch', stream: 'Architecture', duration: '5 years', feesPerYear: 200000, eligibility: 'NATA rank, PCM in 12th with 50%', intake: 40 },
    ],
  },
  {
    name: 'Nitte Meenakshi Institute of Technology (NMIT)',
    type: 'Deemed University',
    area: 'Yelahanka',
    established: 2001,
    hostelAvailable: true,
    rating: 4.0,
    courses: [
      { name: 'BE Computer Science & Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 150000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 120 },
      { name: 'BE Electronics & Communication', stream: 'Engineering', duration: '4 years', feesPerYear: 140000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
      { name: 'BE Aerospace Engineering', stream: 'Engineering', duration: '4 years', feesPerYear: 170000, eligibility: 'KCET/COMEDK rank, PCM in 12th with 45%', intake: 60 },
    ],
  },
  {
    name: 'Ramaiah University of Applied Sciences',
    type: 'Deemed University',
    area: 'Peenya',
    established: 2012,
    hostelAvailable: true,
    courses: [
      { name: 'B.Tech Computer Science', stream: 'Engineering', duration: '4 years', feesPerYear: 200000, eligibility: 'COMEDK rank, PCM in 12th with 45%', intake: 60 },
      { name: 'B.Sc (Applied Sciences)', stream: 'Science', duration: '3 years', feesPerYear: 100000, eligibility: 'PCM/PCB in 12th with 45%', intake: 40 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 120000, eligibility: 'Pass in 12th with 50%', intake: 60 },
    ],
  },
  {
    name: 'NIMHANS',
    type: 'Deemed University',
    area: 'Hosur Road, Lakkasandra',
    established: 1925,
    hostelAvailable: true,
    rating: 4.6,
    courses: [
      { name: 'B.Sc Nursing', stream: 'Medical', duration: '4 years', feesPerYear: 20000, eligibility: 'PCB in 12th with 50%', intake: 30 },
      { name: 'M.Phil Clinical Psychology', stream: 'Arts', duration: '2 years', feesPerYear: 30000, eligibility: 'MA/M.Sc Psychology with 55%', intake: 15 },
    ],
  },

  // ─── PRIVATE UNIVERSITIES (PREMIUM) ───
  {
    name: 'Christ University',
    type: 'Private',
    area: 'Hosur Road, Bhavani Nagar',
    established: 1969,
    hostelAvailable: true,
    rating: 4.4,
    courses: [
      { name: 'B.Com (Honours)', stream: 'Commerce', duration: '3 years', feesPerYear: 250000, eligibility: 'Pass in 12th with 60%, Christ entrance test', intake: 240 },
      { name: 'BBA (Honours)', stream: 'Management', duration: '3 years', feesPerYear: 280000, eligibility: 'Pass in 12th with 60%, Christ entrance test', intake: 120 },
      { name: 'BA Psychology (Honours)', stream: 'Arts', duration: '3 years', feesPerYear: 220000, eligibility: 'Pass in 12th with 55%, Christ entrance test', intake: 60 },
      { name: 'B.Sc Computer Science', stream: 'Science', duration: '3 years', feesPerYear: 250000, eligibility: 'PCM in 12th with 55%, Christ entrance test', intake: 60 },
    ],
  },
  {
    name: 'Jain University',
    type: 'Private',
    area: 'JC Road (Central Campus)',
    established: 1990,
    hostelAvailable: true,
    rating: 4.1,
    courses: [
      { name: 'B.Com (Honours)', stream: 'Commerce', duration: '3 years', feesPerYear: 220000, eligibility: 'Pass in 12th with 50%, Jain entrance test', intake: 180 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 240000, eligibility: 'Pass in 12th with 50%, Jain entrance test', intake: 120 },
      { name: 'BA Journalism & Mass Communication', stream: 'Arts', duration: '3 years', feesPerYear: 200000, eligibility: 'Pass in 12th with 50%', intake: 60 },
      { name: 'B.Sc (PCM/PCB)', stream: 'Science', duration: '3 years', feesPerYear: 180000, eligibility: 'PCM/PCB in 12th with 50%', intake: 60 },
    ],
  },
  {
    name: 'Alliance University',
    type: 'Private',
    area: 'Chikkahagade Cross, Anekal',
    established: 2010,
    hostelAvailable: true,
    courses: [
      { name: 'B.Tech Computer Science', stream: 'Engineering', duration: '4 years', feesPerYear: 300000, eligibility: 'Alliance entrance rank, PCM in 12th with 50%', intake: 120 },
      { name: 'BBA', stream: 'Management', duration: '3 years', feesPerYear: 280000, eligibility: 'Pass in 12th with 50%, Alliance entrance test', intake: 60 },
      { name: 'B.Com (Honours)', stream: 'Commerce', duration: '3 years', feesPerYear: 250000, eligibility: 'Pass in 12th with 50%', intake: 60 },
    ],
  },
]

export const collegeWebsites: Record<string, string> = {
  'University Visvesvaraya College of Engineering (UVCE)': 'https://uvce.ac.in',
  'Bangalore Medical College & Research Institute (BMCRI)': 'https://bmcri.edu.in',
  'Government College of Pharmacy': 'https://gcpbangalore.edu.in',
  'Government Law College': 'https://glcblr.edu.in',
  'Government First Grade College (GFGC)': 'https://gfgc.karnataka.gov.in',
  "Maharani's Science College for Women": 'https://maharanisciencecollege.in',
  "Maharani's Arts College for Women": 'https://maharaniarts.org',
  'Bangalore University (Central College Campus)': 'https://bangaloreuniversity.ac.in',
  'Government Tool Room & Training Centre (GTTC)': 'https://gttc.karnataka.gov.in',
  'Government Polytechnic (Multiple Campuses)': 'https://polytechnic.karnataka.gov.in',
  "St. Joseph's College (Autonomous)": 'https://sjc.ac.in',
  'Mount Carmel College (Autonomous)': 'https://mccblr.edu.in',
  'MES College of Arts, Commerce & Science': 'https://mesccs.in',
  'Vijaya College': 'https://vijayacollege.ac.in',
  'National College': 'https://nationalcollege.in',
  'Acharya Pathashala College of Arts & Science': 'https://acharyapathashala.edu.in',
  'BMS College of Engineering (BMSCE)': 'https://bmsce.ac.in',
  'R.V. College of Engineering (RVCE)': 'https://rvce.edu.in',
  'PES University (PES College of Engineering)': 'https://pes.edu',
  'Dayananda Sagar University': 'https://dsu.edu.in',
  'BNM Institute of Technology': 'https://bnmit.org',
  'New Horizon College of Engineering': 'https://newhorizonindia.edu',
  'CMR Institute of Technology (CMRIT)': 'https://cmrit.ac.in',
  'REVA University': 'https://reva.edu.in',
  'Presidency College': 'https://presidencycollege.in',
  'Brindavan College': 'https://brindavancollege.com',
  'KLE College of Engineering & Technology': 'https://klecet.edu.in',
  'Dr. Ambedkar Institute of Technology': 'https://dr-ait.org',
  'AMC Engineering College': 'https://amceducation.in',
  'Acharya Institute of Technology': 'https://acharya.ac.in',
  'Indian Institute of Science (IISc)': 'https://iisc.ac.in',
  'International Institute of Information Technology Bangalore (IIITB)': 'https://iiitb.ac.in',
  'M.S. Ramaiah Institute of Technology (MSRIT)': 'https://msrit.edu',
  'Nitte Meenakshi Institute of Technology (NMIT)': 'https://nmit.ac.in',
  'Ramaiah University of Applied Sciences': 'https://msruas.ac.in',
  'NIMHANS': 'https://nimhans.ac.in',
  'Christ University': 'https://christuniversity.in',
  'Jain University': 'https://jainuniversity.ac.in',
  'Alliance University': 'https://alliance.edu.in',
}
