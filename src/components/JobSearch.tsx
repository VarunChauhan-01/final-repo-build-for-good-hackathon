import React, { useState } from 'react';
import {
  Search,
  Mic,
  MapPin,
  Clock,
  ShieldCheck,
  Filter,
  DollarSign,
  Briefcase,
  Volume2,
  ChevronDown,
  UserCheck,
  BadgeAlert,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface JobSearchProps {
  onNavigate: (page: string) => void;
}

const mockJobs = [
  { id: 1, title: 'Harvesting Helper (Crop Cutting)', employer: 'Sunil Choudhary (Farmer)', trustScore: 97, pay: '₹450/day', distance: '1.5 km', location: 'Ganaur Village, Sonipat', category: 'Agriculture', verified: true, date: 'Starts 21 Jun' },
  { id: 2, title: 'House Painter (2 BHK Exterior)', employer: 'Rajesh Sharma', trustScore: 92, pay: '₹750/day', distance: '3.2 km', location: 'Model Town, Sonipat', category: 'Painter', verified: true, date: '2-Day Assignment' },
  { id: 3, title: 'Urgent Home Electrician Repair', employer: 'Karan Mehra', trustScore: 89, pay: '₹600/day', distance: '4.8 km', location: 'Narela, Delhi Border', category: 'Electrician', verified: false, date: '1-Day Task' },
  { id: 4, title: 'Wooden Wardrobe Carpenter Helper', employer: 'Vikas Furniture Shop', trustScore: 95, pay: '₹700/day', distance: '2.0 km', location: 'Industrial Area, Sonipat', category: 'Carpenter', verified: true, date: '5-Day Job' },
  { id: 5, title: 'Daily Wage Loader & Unloader', employer: 'Grain Mandi Warehouse', trustScore: 98, pay: '₹500/day', distance: '0.8 km', location: 'New APMC Mandi, Sonipat', category: 'Daily Wage', verified: true, date: 'Starts Immediate' },
  { id: 6, title: 'Personal Car Driver for Local Trip', employer: 'Dr. Alok Verma', trustScore: 96, pay: '₹800/day', distance: '5.5 km', location: 'Sector 15, Sonipat', category: 'Driver', verified: true, date: 'Single Day' },
];

export const JobSearch: React.FC<JobSearchProps> = () => {
  const { darkMode } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [voiceSearchText, setVoiceSearchText] = useState('');
  
  // Voice apply micro-states
  const [applyingJobId, setApplyingJobId] = useState<number | null>(null);
  const [isApplyingVoiceActive, setIsApplyingVoiceActive] = useState(false);
  const [applyVoiceText, setApplyVoiceText] = useState('Say "I want to apply" to submit...');
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const categories = ['All', 'Agriculture', 'Carpenter', 'Painter', 'Electrician', 'Plumber', 'Driver', 'Daily Wage'];

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.employer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesVerified = !onlyVerified || job.verified;
    return matchesSearch && matchesCat && matchesVerified;
  });

  const handleVoiceSearch = () => {
    setIsVoiceSearchActive(!isVoiceSearchActive);
    if (!isVoiceSearchActive) {
      setVoiceSearchText('Say a skill like "electrician"...');
      setTimeout(() => {
        setVoiceSearchText('Recognized: "kheti ka kaam" (Agriculture)');
      }, 1500);
      setTimeout(() => {
        setSelectedCategory('Agriculture');
        setIsVoiceSearchActive(false);
        setVoiceSearchText('');
      }, 3000);
    }
  };

  const handleVoiceApply = (jobId: number) => {
    setApplyingJobId(jobId);
    setIsApplyingVoiceActive(true);
    setApplyVoiceText('Say "Mujhe kaam chahiye" or "I want to apply"...');
    
    setTimeout(() => {
      setApplyVoiceText('Recognizing: "Mujhe kheti wala kaam chahiye, kal se"...');
    }, 1500);

    setTimeout(() => {
      setApplyVoiceText('Perfect! Applied using voice profile.');
      setAppliedJobs((prev) => [...prev, jobId]);
    }, 3200);

    setTimeout(() => {
      setIsApplyingVoiceActive(false);
      setApplyingJobId(null);
    }, 4500);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Explore Local Work Opportunities
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Browse and apply to scam-free daily wages jobs, farm support, and handyman tasks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <UserCheck className="w-3.5 h-3.5" />
            100% Aadhaar Inspected
          </span>
        </div>
      </div>

      {/* Search and Filters Box */}
      <div className={`${darkMode ? 'glass-card-dark' : 'glass-card'} p-5 space-y-4 border border-slate-200/50 dark:border-slate-800`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by work type, employer name, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-12 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-govBlue-500 ${
                darkMode ? 'bg-slate-800/50 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            />
            <button
              onClick={handleVoiceSearch}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isVoiceSearchActive ? 'bg-teal-500 text-white animate-pulse' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`px-4 py-3 rounded-xl border font-semibold text-sm flex items-center gap-2 transition-all ${
                onlyVerified
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Verified Employers Only
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-govBlue-500 text-white shadow-md'
                  : darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Search Feedback Box */}
      {isVoiceSearchActive && (
        <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/25 flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-teal-500 animate-pulse" />
          <span className="text-sm font-semibold italic text-teal-600 dark:text-teal-400">{voiceSearchText}</span>
        </div>
      )}

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`${darkMode ? 'glass-card-dark' : 'glass-card'} p-6 border flex flex-col justify-between hover:shadow-xl hover:border-govBlue-500/20 transition-all ${
                job.verified ? 'border-slate-200/50 dark:border-slate-800' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                    {job.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Employer Trust:</span>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">{job.trustScore}%</span>
                  </div>
                </div>

                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{job.title}</h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Employer: <span className="font-bold">{job.employer}</span></p>
                  {job.verified && (
                    <span className="inline-flex items-center text-[9px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      <ShieldCheck className="w-2.5 h-2.5 mr-0.5" />
                      Govt OK
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-5 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-slate-900 dark:text-white">{job.pay}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{job.distance} away</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{job.location} • {job.date}</span>
                  </div>
                </div>
              </div>

              {/* Application CTA */}
              <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex gap-3">
                {appliedJobs.includes(job.id) ? (
                  <button className="flex-1 py-2.5 rounded-lg bg-emerald-500 text-white font-bold text-sm cursor-default flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                    Application Submitted
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleVoiceApply(job.id)}
                      className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-govBlue-500 to-teal-600 hover:shadow-lg text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 group"
                    >
                      <Mic className="w-4 h-4 animate-pulse" />
                      Apply by Voice
                    </button>
                    <button
                      onClick={() => setAppliedJobs((prev) => [...prev, job.id])}
                      className={`px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-colors ${
                        darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      Apply Manual
                    </button>
                  </>
                )}
              </div>

              {/* Voice Apply Modal Overlay Simulation Inside Card */}
              {applyingJobId === job.id && isApplyingVoiceActive && (
                <div className="mt-3 p-3 rounded-lg bg-teal-500/10 border border-teal-500/35 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-pulse" />
                    <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 italic">{applyVoiceText}</span>
                  </div>
                  <div className="flex gap-0.5 justify-center">
                    {[1, 2, 3, 4].map((b) => (
                      <div key={b} className="w-0.5 h-3 bg-teal-500 rounded-full animate-wave" style={{ animationDelay: `${b * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-400">
            No matching jobs found. Try adjusting your query or category filters.
          </div>
        )}
      </div>

    </section>
  );
};
export default JobSearch;
