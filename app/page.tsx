'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Cross,
  Filter,
  HeartPulse,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react';

const hospitals = [
  {
    name: 'Aster Prime Hospital',
    area: 'Ameerpet',
    type: 'Multi-speciality',
    distance: '2.4 km away',
    accent: 'blue',
    hours: 'Open until 8:00 PM',
    doctors: 42,
  },
  {
    name: 'CARE Hospitals',
    area: 'Banjara Hills',
    type: 'Advanced care centre',
    distance: '4.8 km away',
    accent: 'teal',
    hours: 'Open until 9:00 PM',
    doctors: 68,
  },
  {
    name: 'KIMS Hospitals',
    area: 'Secunderabad',
    type: 'Tertiary care',
    distance: '7.1 km away',
    accent: 'navy',
    hours: 'Open 24 hours',
    doctors: 85,
  },
];

const doctors = [
  {
    name: 'Dr. Ananya Rao',
    specialty: 'Cardiology',
    hospital: 'Aster Prime Hospital',
    area: 'Ameerpet',
    experience: '14 years',
    fee: '₹800',
    initials: 'AR',
    color: 'sky',
  },
  {
    name: 'Dr. Arjun Mehta',
    specialty: 'Neurology',
    hospital: 'CARE Hospitals',
    area: 'Banjara Hills',
    experience: '11 years',
    fee: '₹1,200',
    initials: 'AM',
    color: 'mint',
  },
  {
    name: 'Dr. Kavya Reddy',
    specialty: 'Dermatology',
    hospital: 'KIMS Hospitals',
    area: 'Secunderabad',
    experience: '9 years',
    fee: '₹700',
    initials: 'KR',
    color: 'peach',
  },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-lockup">
      <img src="/image.png" alt="NEXA-CARE" className={compact ? 'brand-image compact' : 'brand-image'} />
      {!compact && <span>Healthcare, connected.</span>}
    </div>
  );
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1350);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loading-screen">
      <div className="loader-orbit orbit-one" />
      <div className="loader-orbit orbit-two" />
      <div className="loader-center">
        <img src="/image.png" alt="NEXA-CARE" className="loader-logo" />
        <p>Healthcare, connected.</p>
        <div className="loader-line"><span /></div>
      </div>
      <div className="loader-grid" />
    </div>
  );
}

function LoginPanel({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'choose' | 'patient' | 'admin'>('choose');
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="login-panel" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close login"><X size={18} /></button>
        <div className="panel-heading"><div className="eyebrow">Secure access</div><h2>{mode === 'choose' ? 'Welcome to NEXA-CARE' : mode === 'patient' ? 'Patient access' : 'Admin access'}</h2><p>{mode === 'choose' ? 'How would you like to continue?' : 'Use your registered details to continue.'}</p></div>
        {mode === 'choose' ? <div className="login-options">
          <button className="login-option" onClick={() => setMode('patient')}><div className="option-icon patient"><UserRound size={21} /></div><div><strong>Patient / User</strong><span>Find doctors, book appointments and manage your healthcare.</span></div><ArrowRight size={18} /></button>
          <button className="login-option" onClick={() => setMode('admin')}><div className="option-icon admin"><ShieldCheck size={21} /></div><div><strong>Admin</strong><span>Manage hospitals, doctors, appointments and platform settings.</span></div><ArrowRight size={18} /></button>
        </div> : <div className="login-form"><label>Email or phone<input placeholder="you@example.com" /></label><label>Password<input type="password" placeholder="Enter your password" /></label><button className="primary-button full">Continue <ArrowRight size={16} /></button><button className="text-button" onClick={() => setMode('choose')}>Back to account types</button></div>}
        <div className="panel-footer"><ShieldCheck size={15} /> Your information is protected with secure access controls.</div>
      </div>
    </div>
  );
}

function BookingPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const steps = ['Hospital', 'Department', 'Doctor', 'Time'];
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="booking-panel" onMouseDown={(event) => event.stopPropagation()}>
      <div className="booking-top"><div><div className="eyebrow">Book with confidence</div><h2>Find your next appointment</h2></div><button className="icon-button" onClick={onClose} aria-label="Close booking"><X size={18} /></button></div>
      <div className="stepper">{steps.map((item, index) => <div className={`step ${step > index ? 'active' : ''}`} key={item}><span>{step > index + 1 ? <Check size={13} /> : index + 1}</span><small>{item}</small></div>)}</div>
      {step === 1 && <div className="booking-content"><h3>Start with a hospital</h3><p>Choose where you would like to receive care in Hyderabad.</p><div className="choice-grid">{hospitals.map((hospital) => <button className={`choice-card ${selectedHospital === hospital.name ? 'selected' : ''}`} key={hospital.name} onClick={() => setSelectedHospital(hospital.name)}><div className={`hospital-mark ${hospital.accent}`}><Cross size={18} /></div><strong>{hospital.name}</strong><span><MapPin size={13} /> {hospital.area}</span><small>{hospital.hours}</small></button>)}</div><button className="primary-button full" disabled={!selectedHospital} onClick={() => setStep(2)}>Continue to departments <ArrowRight size={16} /></button></div>}
      {step === 2 && <div className="booking-content"><h3>Select a department</h3><p>What kind of care are you looking for today?</p><div className="department-grid">{['Cardiology', 'Neurology', 'Dermatology', 'Orthopaedics', 'General medicine', 'Paediatrics'].map((item) => <button className="department-chip" key={item} onClick={() => setStep(3)}><Stethoscope size={17} />{item}<ArrowRight size={15} /></button>)}</div><button className="text-button" onClick={() => setStep(1)}>Back</button></div>}
      {step === 3 && <div className="booking-content"><h3>Select a doctor</h3><p>Based on {selectedHospital || 'your hospital'}.</p><div className="doctor-list">{doctors.slice(0, 2).map((doctor) => <button className={`doctor-choice ${selectedDoctor === doctor.name ? 'selected' : ''}`} key={doctor.name} onClick={() => setSelectedDoctor(doctor.name)}><div className={`doctor-avatar ${doctor.color}`}>{doctor.initials}</div><div><strong>{doctor.name}</strong><span>{doctor.specialty} · {doctor.experience}</span><small>{doctor.fee} consultation</small></div><div className="available-dot" /></button>)}</div><button className="primary-button full" disabled={!selectedDoctor} onClick={() => setStep(4)}>See available times <ArrowRight size={16} /></button><button className="text-button" onClick={() => setStep(2)}>Back</button></div>}
      {step === 4 && <div className="booking-content"><h3>Choose an available time</h3><p>Real-time availability for {selectedDoctor || 'your doctor'}.</p><div className="date-row">{['Today', 'Tomorrow', 'Fri, 18'].map((date, index) => <button className={`date-card ${index === 0 ? 'selected' : ''}`} key={date}><strong>{date}</strong><span>{index === 0 ? '17 Sep' : index === 1 ? '18 Sep' : '19 Sep'}</span></button>)}</div><div className="time-grid">{['10:30 AM', '11:00 AM', '12:30 PM', '04:00 PM', '05:30 PM', '06:00 PM'].map((time) => <button className="time-chip" key={time}>{time}</button>)}</div><button className="primary-button full" onClick={onClose}>Continue to patient details <ArrowRight size={16} /></button><button className="text-button" onClick={() => setStep(3)}>Back</button></div>}
      <div className="demo-note"><Sparkles size={14} /> Demo environment · availability is shown for preview only</div>
    </div>
  </div>;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filteredDoctors = doctors.filter((doctor) => `${doctor.name} ${doctor.specialty} ${doctor.hospital} ${doctor.area}`.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;
  return <main>
    <header className="site-header"><a href="#top" aria-label="NEXA-CARE home"><Logo compact /></a><nav className={mobileOpen ? 'nav-open' : ''}>{['Hospitals', 'Doctors', 'Services', 'How it works'].map((item) => <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item} onClick={() => setMobileOpen(false)}>{item}</a>)}<button className="mobile-login" onClick={() => { setLoginOpen(true); setMobileOpen(false); }}>Log in</button></nav><div className="header-actions"><button className="login-button" onClick={() => setLoginOpen(true)}>Log in</button><button className="primary-button header-book" onClick={() => setBookingOpen(true)}>Book appointment <ArrowUpRight size={16} /></button><button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu"><Menu size={21} /></button></div></header>
    <section className="hero" id="top"><div className="hero-glow" /><div className="hero-copy"><div className="eyebrow"><span className="pulse-dot" /> Hyderabad's care network</div><h1>Find the right care.<br /><em>Book it with confidence.</em></h1><p className="hero-subtitle">Discover trusted hospitals and specialists across Hyderabad. See real availability, choose your time, and take the next step in your care journey.</p><div className="hero-actions"><button className="primary-button large" onClick={() => setBookingOpen(true)}>Book an appointment <ArrowRight size={18} /></button><button className="secondary-button large" onClick={() => document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' })}>Find a doctor <Search size={17} /></button></div><div className="trust-row"><div className="trust-avatars"><span>AR</span><span>SM</span><span>DK</span><b>+8k</b></div><span>Patients finding better care every month</span></div></div><div className="hero-visual"><div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" /><div className="health-card"><div className="health-card-top"><span className="live-badge"><i /> Live network</span><span>17 Sep 2025</span></div><div className="health-score"><div className="score-ring"><HeartPulse size={34} /><strong>98</strong><span>care score</span></div><div><p>Hyderabad care, connected</p><strong>Everything in one place.</strong><div className="mini-bars"><i /><i /><i /><i /><i /><i /></div></div></div><div className="health-stats"><div><strong>124</strong><span>Specialists</span></div><div><strong>18</strong><span>Hospitals</span></div><div><strong>24/7</strong><span>Emergency</span></div></div></div><div className="floating-card appointment-float"><div className="float-icon"><CalendarDays size={18} /></div><div><span>Next available</span><strong>Today, 5:30 PM</strong></div><Check size={16} className="float-check" /></div><div className="floating-card location-float"><MapPin size={16} /><span>Care near you</span><strong>Gachibowli</strong></div></div></section>
    <section className="search-panel-wrap"><div className="search-panel"><div className="search-field"><Search size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search doctors, specialties or hospitals" /><span>⌘ K</span></div><div className="search-location"><MapPin size={18} /><div><small>Your location</small><strong>Hyderabad, Telangana</strong></div><ChevronDown size={16} /></div><button className="primary-button search-submit" onClick={() => document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' })}>Search care</button></div></section>
    <section className="section stats-section"><div className="section-intro"><div className="eyebrow">Why NEXA-CARE</div><h2>Care that moves<br /><em>with your life.</em></h2></div><div className="stats-grid"><div><strong>18<span>+</span></strong><p>Trusted hospitals<br />across Hyderabad</p></div><div><strong>120<span>+</span></strong><p>Verified specialists<br />ready to help</p></div><div><strong>4.9<span>/5</span></strong><p>Average patient<br />experience rating</p></div></div></section>
    <section className="section hospitals-section" id="hospitals"><div className="section-heading"><div><div className="eyebrow">Explore the network</div><h2>Care, closer to you.</h2></div><button className="outline-button">View all hospitals <ArrowUpRight size={16} /></button></div><div className="hospital-grid">{hospitals.map((hospital) => <article className="hospital-card" key={hospital.name}><div className={`hospital-banner ${hospital.accent}`}><div className="hospital-symbol"><Cross size={26} /></div><span className="open-status"><i /> Open now</span><button className="round-arrow" aria-label={`View ${hospital.name}`}><ArrowUpRight size={17} /></button></div><div className="hospital-body"><div className="card-kicker"><span>{hospital.type}</span><span><MapPin size={13} />{hospital.distance}</span></div><h3>{hospital.name}</h3><p>{hospital.area}, Hyderabad</p><div className="card-meta"><span><Clock3 size={14} />{hospital.hours}</span><span><Stethoscope size={14} />{hospital.doctors} doctors</span></div><button className="card-link" onClick={() => setBookingOpen(true)}>Book here <ArrowRight size={15} /></button></div></article>)}</div></section>
    <section className="section doctors-section" id="doctors"><div className="section-heading"><div><div className="eyebrow">Meet your care team</div><h2>Specialists who listen.</h2></div><button className="filter-button"><Filter size={16} /> Filters</button></div><div className="doctor-grid">{filteredDoctors.map((doctor) => <article className="doctor-card" key={doctor.name}><div className="doctor-top"><div className={`doctor-avatar ${doctor.color}`}>{doctor.initials}</div><button className="save-button" aria-label={`Save ${doctor.name}`}><HeartPulse size={17} /></button></div><div className="doctor-label">Specialist in {doctor.specialty}</div><h3>{doctor.name}</h3><p>{doctor.hospital}</p><div className="doctor-details"><span>{doctor.experience} experience</span><span>{doctor.fee} consultation</span></div><div className="availability"><i /><span>Available today until 6:30 PM</span></div><button className="doctor-book" onClick={() => setBookingOpen(true)}>View profile <ArrowUpRight size={15} /></button></article>)}</div>{filteredDoctors.length === 0 && <div className="empty-search"><Search size={22} /><strong>No care teams found</strong><span>Try a different doctor, specialty, or hospital.</span></div>}</section>
    <section className="journey-section" id="how-it-works"><div className="journey-copy"><div className="eyebrow">A better way to get care</div><h2>From search to<br /><em>seen by a doctor.</em></h2><p>One calm, clear experience for every step of your healthcare journey.</p><button className="primary-button" onClick={() => setBookingOpen(true)}>Start your journey <ArrowRight size={17} /></button></div><div className="journey-steps"><div className="journey-step"><span>01</span><div><strong>Find your fit</strong><p>Search by specialty, location, or hospital.</p></div></div><div className="journey-step active"><span>02</span><div><strong>See what is real</strong><p>View verified profiles and genuine availability.</p></div><Check size={18} /></div><div className="journey-step"><span>03</span><div><strong>Book without friction</strong><p>Pick a time that works. We will take care of the rest.</p></div></div></div></section>
    <section className="emergency-strip"><div className="emergency-icon"><Phone size={21} /></div><div><strong>Need urgent care?</strong><span>Our emergency network is available around the clock.</span></div><a href="tel:108">Call emergency <ArrowUpRight size={16} /></a></section>
    <footer className="site-footer"><div><Logo /><p>Better access to better care.<br />Starting with Hyderabad.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#hospitals">Hospitals</a><a href="#doctors">Doctors</a><a href="#services">Services</a></div><div><strong>Company</strong><a href="#about">About NEXA-CARE</a><a href="#contact">Contact</a><a href="#privacy">Privacy</a></div><div><strong>Support</strong><a href="#help">Help centre</a><a href="#emergency">Emergency care</a><a href="#feedback">Share feedback</a></div></div><div className="footer-bottom"><span>© 2025 NEXA-CARE</span><span>Made for healthier days.</span></div></footer>
    {loginOpen && <LoginPanel onClose={() => setLoginOpen(false)} />}{bookingOpen && <BookingPanel onClose={() => setBookingOpen(false)} />}
  </main>;
}
