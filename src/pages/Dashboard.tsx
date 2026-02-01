import { ArrowRight, Star, Play, Trophy, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 md:p-20 text-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#FFD700]/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#32CD32]/30 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white font-bold text-sm mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span>New World Unlocked: Math Mountains!</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-xl tracking-tight leading-tight">
            Ready for your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-white">Next Adventure?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Join 10,000+ explorers solving puzzles, earning badges, and mastering new skills every day!
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/map" className="w-full md:w-auto group relative px-8 py-4 bg-white text-[#FF6F61] rounded-2xl font-black text-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Play className="w-6 h-6 fill-current" />
              Start Playing
            </Link>
            <button className="w-full md:w-auto px-8 py-4 bg-white/10 text-white border border-white/30 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
              <Star className="w-6 h-6" />
              My Progress
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats / Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Brain, title: "Smart Puzzles", desc: "Logic, Math & Patterns", color: "bg-purple-500" },
          { icon: Trophy, title: "Daily Challenges", desc: "Earn Double XP", color: "bg-blue-500" },
          { icon: Star, title: "Epic Rewards", desc: "Collect Rare Badges", color: "bg-orange-500" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/60 font-medium text-lg">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Featured World Preview */}
      <section className="rounded-[2.5rem] bg-gradient-to-r from-[#2C3E50] to-[#4CA1AF] p-1 shadow-2xl overflow-hidden">
        <div className="bg-white/10 backdrop-blur-lg rounded-[2.3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white">Featured World: <br/>The Forest of Logic</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Navigate through the whispering trees and solve the ancient riddles of the forest guardians. Perfect for beginners to sharpen their critical thinking!
            </p>
            <Link to="/map" className="inline-flex items-center gap-2 text-[#FFD700] font-bold text-xl hover:translate-x-2 transition-transform">
              Explore this World <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <div className="flex-1 relative">
             {/* Abstract representation of game world */}
             <div className="aspect-square rounded-full bg-gradient-to-br from-[#32CD32] to-[#228B22] p-2 animate-[spin_20s_linear_infinite] opacity-80 blur-xl absolute -top-10 -right-10 w-full h-full" />
             <div className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 aspect-video flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                <span className="text-6xl">🌲🦉🍄</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
