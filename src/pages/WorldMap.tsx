import { Lock, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorldMap() {
  const worlds = [
    { id: 1, name: "Forest of Logic", status: "unlocked", stars: "3/15", color: "from-green-400 to-emerald-600", icon: "🌲" },
    { id: 2, name: "Math Mountains", status: "locked", stars: "0/15", color: "from-blue-400 to-indigo-600", icon: "🏔️" },
    { id: 3, name: "Pattern Plains", status: "locked", stars: "0/15", color: "from-yellow-400 to-orange-600", icon: "🦁" },
    { id: 4, name: "Code Canyon", status: "locked", stars: "0/15", color: "from-purple-400 to-pink-600", icon: "👾" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">Select a World</h1>
        <p className="text-xl text-white/80">Where will your adventure take you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {worlds.map((world, idx) => (
          <motion.div
            key={world.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative group overflow-hidden rounded-3xl p-1 ${world.status === 'locked' ? 'opacity-80 grayscale' : ''}`}
          >
            {/* Card Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${world.color} opacity-90`} />
            
            <div className="relative h-full bg-white/10 backdrop-blur-md rounded-[1.3rem] p-8 flex flex-col items-center text-center border border-white/20 transition-transform duration-300 group-hover:-translate-y-2">
              <div className="text-6xl mb-6 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                {world.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{world.name}</h3>
              
              <div className="flex items-center gap-2 mb-6 bg-black/20 px-4 py-1 rounded-full">
                <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                <span className="text-white font-bold text-sm">{world.stars} Stars</span>
              </div>

              {world.status === 'locked' ? (
                <button className="w-full py-3 bg-black/30 text-white/70 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock className="w-5 h-5" /> Locked
                </button>
              ) : (
                <button className="w-full py-3 bg-white text-emerald-600 rounded-xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 fill-current" /> Enter World
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
