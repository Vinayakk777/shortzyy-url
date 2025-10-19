import { useState } from "react";
import {
  Link2,
  Zap,
  BarChart3,
  Shield,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [openAccordion, setOpenAccordion] = useState([]);

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl.trim()) {
      window.location.href = `/auth?createNew=${encodeURIComponent(longUrl)}`;
    }
  };

  const toggleAccordion = (value) => {
    setOpenAccordion((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-60 -right-20 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center px-4">
        {/* Badge */}
        <div className="mt-14 mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
          <span className="text-sm text-blue-200 font-medium">
            Shorten. Track. Optimize.
          </span>
        </div>

        {/* Hero Section */}
        <h1 className="my-8 sm:my-14 text-4xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold leading-tight">
          The ultimate URL Shortener <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
            Shortzyy is all you'll ever need! 👇
          </span>
        </h1>

        {/* URL Input */}
        <form
          onSubmit={handleShorten}
          className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 mb-10"
        >
          <div
            className={`relative flex-1 transition-all duration-300 ${
              isFocused ? "scale-[1.02]" : ""
            }`}
          >
            <input
              type="url"
              placeholder="Enter your long URL..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full h-full py-4 px-4 bg-slate-900/50 backdrop-blur-xl border-2 text-white placeholder:text-slate-400 rounded-md transition-all duration-300 ${
                isFocused
                  ? "border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            />
          </div>
          <button
            type="submit"
            className="h-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-md shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Shorten
          </button>
        </form>

        {/* Banner */}
        <div className="relative w-full md:px-11 mb-16 group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
          <img
            src="/banner1.jpg"
            alt="Shortzyy Banner"
            className="w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Features */}
        <div className="w-full md:px-11 mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Link2 className="w-6 h-6 text-blue-400" />,
              title: "Lightning Fast",
              desc: "Generate short URLs in milliseconds with Shortzyy's optimized system",
              hover:
                "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
              title: "Detailed Analytics",
              desc: "Track clicks, locations, and device types in real-time",
              hover:
                "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
            },
            {
              icon: <Shield className="w-6 h-6 text-indigo-400" />,
              title: "Secure & Reliable",
              desc: "Links protected with enterprise-grade security",
              hover:
                "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
            },
          ].map((f, i) => (
            <div
              key={i}
              className={`bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 transition-all duration-300 group ${f.hover}`}
            >
              <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-700/50 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="w-full md:px-11 mb-20">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 md:p-8">
            <h3 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h3>

            {[
              {
                key: "item-1",
                question: "How does Shortzyy work?",
                answer:
                  "Enter a long URL, and Shortzyy generates a shorter version that redirects instantly.",
              },
              {
                key: "item-2",
                question: "Do I need an account?",
                answer:
                  "Yes, create an account to manage links, track analytics, and customize URLs.",
              },
              {
                key: "item-3",
                question: "What analytics are available?",
                answer:
                  "View clicks, geolocation data, and device type for each link.",
              },
            ].map((item) => (
              <div key={item.key} className="border-b border-slate-700">
                <button
                  onClick={() => toggleAccordion(item.key)}
                  className="w-full flex justify-between items-center py-4 text-white hover:text-blue-400 transition-colors text-left font-medium"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openAccordion.includes(item.key) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openAccordion.includes(item.key)
                      ? "max-h-40 pb-4"
                      : "max-h-0"
                  }`}
                >
                  <p className="text-slate-300">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
