import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiSearch,
  FiTag,
  FiLock,
  FiSmartphone,
  FiDatabase,
  FiCode,
  FiZap,
} from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="w-full flex-1">
      {/* HERO SECTION */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-[#00e5ff] border-[2.5px] border-black px-4 py-1.5 font-black text-xs uppercase mb-6 shadow-[3px_3px_0px_#000]">
          <FiZap className="text-base" />
          <span>CROSS-PLATFORM ARCHITECTURE • WEB & MOBILE REST API</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight max-w-5xl mb-6">
          MANAGE NOTES WITH SPEED, STYLE &{" "}
          <span className="bg-[#facc15] px-3 border-[3.5px] border-black inline-block shadow-[5px_5px_0px_#000] mt-1">
            PRECISION
          </span>
        </h1>

        <p className="text-base md:text-xl font-bold text-zinc-700 max-w-3xl mb-10 leading-relaxed">
          The developer-first notebook designed with bold neo-brutalist aesthetics, instant tag filtering, and a synchronized REST backend ready for your web and mobile apps.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xl mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto h-13 px-8 bg-[#22c55e] border-[3px] border-black font-black text-sm md:text-base uppercase inline-flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] whitespace-nowrap transition-all"
          >
            <span>EXPLORE DASHBOARD</span>
            <FiArrowRight className="text-xl stroke-[3]" />
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto h-13 px-8 bg-white border-[3px] border-black font-black text-sm md:text-base uppercase inline-flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-zinc-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] whitespace-nowrap transition-all"
          >
            SIGN UP FREE
          </Link>
        </div>

        {/* Preview Hero Mockup Card */}
        <div className="w-full max-w-4xl bg-white border-[4px] border-black p-4 md:p-6 shadow-[8px_8px_0px_#000] text-left">
          <div className="flex items-center justify-between border-b-[2.5px] border-black pb-3 mb-4">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-black bg-[#fb7185] inline-block" />
              <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-black bg-[#facc15] inline-block" />
              <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-black bg-[#22c55e] inline-block" />
            </div>
            <span className="text-xs font-black uppercase text-zinc-500 tracking-wider">
              preview: /dashboard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-[2.5px] border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_#000]">
              <h3 className="font-black text-sm uppercase">HYDRATION IN LAYOUTS</h3>
              <span className="text-[10px] font-bold text-zinc-500">JUN 16, 2026</span>
              <p className="text-xs text-zinc-700 mt-2 line-clamp-3">
                Avoid rendering mismatched markup between SSR and client state...
              </p>
              <div className="mt-3">
                <span className="bg-[#00e5ff] text-black border-[1.5px] border-black text-[10px] font-black px-2 py-0.5">
                  FRONTEND
                </span>
              </div>
            </div>

            <div className="border-[2.5px] border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_#000]">
              <h3 className="font-black text-sm uppercase">PRISMA CLIENT SINGLETON</h3>
              <span className="text-[10px] font-bold text-zinc-500">JUN 15, 2026</span>
              <p className="text-xs text-zinc-700 mt-2 line-clamp-3">
                Prevent development server from duplicate connection exhaustion...
              </p>
              <div className="mt-3 flex gap-1">
                <span className="bg-[#22c55e] text-black border-[1.5px] border-black text-[10px] font-black px-2 py-0.5">
                  PRISMA
                </span>
                <span className="bg-[#f97316] text-black border-[1.5px] border-black text-[10px] font-black px-2 py-0.5">
                  PERF
                </span>
              </div>
            </div>

            <div className="border-[2.5px] border-black p-4 bg-zinc-50 shadow-[3px_3px_0px_#000]">
              <h3 className="font-black text-sm uppercase">MONGODB REPLICA SET</h3>
              <span className="text-[10px] font-bold text-zinc-500">JUN 10, 2026</span>
              <p className="text-xs text-zinc-700 mt-2 line-clamp-3">
                Deploy cluster collections with Prisma schema relations...
              </p>
              <div className="mt-3">
                <span className="bg-[#facc15] text-black border-[1.5px] border-black text-[10px] font-black px-2 py-0.5">
                  DATABASE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section className="border-t-[3px] border-black bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              BUILT FOR EVERY PLATFORM
            </h2>
            <p className="text-sm md:text-base font-bold text-zinc-600">
              A complete stack designed so one developer builds the web app while another integrates mobile effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <FiSearch className="text-3xl text-black" />,
                title: "FAST FULL-TEXT SEARCH",
                description:
                  "Search notes instantly by keyword across titles and body contents without performance lag.",
                color: "bg-[#facc15]",
              },
              {
                icon: <FiTag className="text-3xl text-black" />,
                title: "TAG-BASED FILTERING",
                description:
                  "Categorize snippets by Frontend, Prisma, Database, or custom tags with real-time counters.",
                color: "bg-[#00e5ff]",
              },
              {
                icon: <FiSmartphone className="text-3xl text-black" />,
                title: "CROSS-PLATFORM REST API",
                description:
                  "Clean REST routes with global CORS enabled. Perfect for React Native, Flutter, or Android/iOS apps.",
                color: "bg-[#22c55e]",
              },
              {
                icon: <FiDatabase className="text-3xl text-black" />,
                title: "MONGODB & PRISMA 6 ORM",
                description:
                  "Flexible document storage with MongoDB Atlas backed by type-safe Prisma client models.",
                color: "bg-[#fb7185]",
              },
              {
                icon: <FiLock className="text-3xl text-black" />,
                title: "JWT AUTHENTICATION",
                description:
                  "Secure registration and login with bcryptjs password hashing and stateless JWT bearer tokens.",
                color: "bg-[#a855f7]",
              },
              {
                icon: <FiCode className="text-3xl text-black" />,
                title: "NEO-BRUTALIST DESIGN",
                description:
                  "High contrast borders, punchy saturated colors, and tactile micro-interactions that feel alive.",
                color: "bg-[#f97316]",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="border-[3px] border-black p-6 bg-[#fafaf9] shadow-[5px_5px_0px_#000] flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000] transition-all"
              >
                <div>
                  <div
                    className={`w-14 h-14 border-[2.5px] border-black flex items-center justify-center mb-5 shadow-[3px_3px_0px_#000] ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-black text-xl uppercase mb-3">{feature.title}</h3>
                  <p className="text-xs font-medium text-zinc-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / WORKFLOW SECTION */}
      <section className="border-t-[3px] border-black py-16 md:py-24 bg-[#fafaf9]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="bg-[#facc15] border-[2px] border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
              SIMPLE WORKFLOW
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-4">
              HOW IT WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "REGISTER / LOGIN",
                desc: "Create an account or sign in to obtain your secure token and access your personal notes.",
              },
              {
                step: "02",
                title: "CAPTURE & TAG NOTES",
                desc: "Draft articles, code ideas, and bugs. Assign colorful tags like PRISMA, DATABASE, or FRONTEND.",
              },
              {
                step: "03",
                title: "SYNC ACROSS DEVICES",
                desc: "Manage notes via the desktop web UI or let your team connect via mobile REST endpoints.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] relative"
              >
                <div className="font-black text-4xl text-zinc-300 mb-2">{item.step}</div>
                <h3 className="font-black text-lg uppercase mb-2">{item.title}</h3>
                <p className="text-xs font-medium text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REST API QUICK OVERVIEW SECTION FOR DEVELOPERS */}
      <section className="border-t-[3px] border-black bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              <span className="bg-[#22c55e] border-[2px] border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_#000]">
                MOBILE & APP INTEGRATION
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-4 mb-4">
                READY FOR YOUR MOBILE DEVELOPER
              </h2>
              <p className="text-sm font-medium text-zinc-700 leading-relaxed mb-6">
                All REST endpoints are documented with standardized JSON envelopes, CORS preflights, and token validation. Another developer can connect a Flutter or React Native client in minutes.
              </p>

              <div className="flex flex-col gap-2.5">
                {[
                  "POST /api/auth/register - Create account",
                  "POST /api/auth/login - Obtain Bearer token",
                  "GET /api/notes - Query by search & tag",
                  "POST /api/notes - Create new note",
                  "GET, PUT, DELETE /api/notes/:id - Full details & update",
                ].map((route, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-bold text-zinc-800"
                  >
                    <FiCheckCircle className="text-green-600" />
                    <code>{route}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Code Mockup */}
            <div className="w-full lg:w-96 bg-black text-green-400 p-5 border-[3.5px] border-black shadow-[6px_6px_0px_#000] text-xs font-mono">
              <div className="text-zinc-500 mb-2"># Test API Health</div>
              <div className="text-white">$ curl http://localhost:3000/api/health</div>
              <div className="mt-4 text-zinc-400">Response:</div>
              <pre className="text-green-400 mt-1 whitespace-pre-wrap">
{`{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "connected"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH CTA BANNER */}
      <section className="w-full bg-[#facc15] border-t-[3px] border-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            READY TO ORGANIZE YOUR CODE & THOUGHTS?
          </h2>
          <p className="text-sm md:text-base font-bold text-zinc-900 max-w-xl mx-auto mb-8">
            Open the dashboard right now or create a new account to test out the application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto h-13 px-8 bg-black text-white border-[3px] border-black font-black text-sm md:text-base uppercase inline-flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] hover:bg-zinc-800 whitespace-nowrap transition-all"
            >
              <span>OPEN DASHBOARD</span>
              <FiArrowRight className="text-xl stroke-[3]" />
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto h-13 px-8 bg-white text-black border-[3px] border-black font-black text-sm md:text-base uppercase inline-flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-zinc-100 whitespace-nowrap transition-all"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
