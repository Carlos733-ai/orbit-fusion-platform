import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

function BookCard({ bookId, title, author, coverImg, onRead }) {
  const BookOpenIcon = Icons?.BookOpen || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col rounded-2xl overflow-hidden shadow-sm mb-4 p-3 bg-white/5 backdrop-blur-xl border border-white/10"
      style={undefined}
    >
      <div className="flex justify-center mb-4">
        <img
          src={coverImg}
          alt={title}
          className="rounded-lg object-cover w-32 h-44 shadow-md"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/128x176/1e2340/6366f1?text=Book';
          }}
        />
      </div>

      <div className="flex flex-col flex-1 gap-1 px-1">
        <h3 className="font-inter font-bold text-base text-white leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="font-inter font-medium text-sm text-white/50 line-clamp-1">
          {author}
        </p>
      </div>

      <div className="mt-4 px-1">
        <motion.button
          onClick={() => onRead(bookId)}
          whileHover={{ boxShadow: '0 0 18px 4px rgba(99,102,241,0.55)', scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          aria-label={`Read ${title}`}
          className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 px-5 font-inter font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-400 hover:to-indigo-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          <BookOpenIcon size={15} strokeWidth={2.2} />
          Read
        </motion.button>
      </div>
    </motion.div>
  );
}

export default BookCard;
