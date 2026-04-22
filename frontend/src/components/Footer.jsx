import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mt-6 w-full"
    >
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[20px] px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 text-white/40 text-sm font-inter">
            <Icons.BookOpen size={14} className="text-indigo-400/60" />
            <span className="text-white/50 font-medium tracking-tight">book-reader-scale</span>
          </div>

          <p className="text-white/30 text-sm font-inter tracking-wide text-center">
            &copy; {currentYear} book-reader-scale. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-white/30 text-sm font-inter">
            <Icons.Heart size={12} className="text-indigo-400/50" />
            <span>Crafted for readers</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}