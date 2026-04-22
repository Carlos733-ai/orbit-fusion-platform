import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-30 w-full"
    >
      <div className="absolute inset-0 bg-[#151a29]/80 backdrop-blur-md border-b border-white/10" />
      <div className="relative max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0">
            <Icons.BookOpen size={18} className="text-indigo-400" strokeWidth={1.8} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-inter select-none">
            book-reader-scale
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <span className="text-sm font-medium text-white/50 tracking-wide font-inter cursor-default select-none">
            Home
          </span>
        </nav>
      </div>
    </motion.header>
  );
}
