import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.05 },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    transition: { duration: 0.35, ease: 'easeIn' },
  },
};

function BookReaderModal({ isOpen, book, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const CloseIcon = Icons.X || Icons.HelpCircle;
  const BookIcon = Icons.BookOpen || Icons.HelpCircle;

  return (
    <AnimatePresence>
      {isOpen && book && (
        <motion.div
          key="book-reader-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={undefined}
          aria-modal="true"
          role="dialog"
          aria-label={`Reading: ${book.title}`}
        >
          <div
            className="absolute inset-0 bg-[#0b0f1e]/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="book-reader-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[20px] bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 rounded-[20px] pointer-events-none" aria-hidden="true">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-indigo-400/8 rounded-full blur-2xl" />
            </div>

            <div className="relative flex items-start justify-between gap-4 px-8 pt-8 pb-6 border-b border-white/[0.08] flex-shrink-0">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-[12px] bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                  <BookIcon className="w-5 h-5 text-indigo-300" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-inter text-xl font-bold text-white leading-tight tracking-tight">
                    {book.title}
                  </h2>
                  {book.author && (
                    <p className="font-inter text-sm font-medium text-indigo-300/80 tracking-wide">
                      {book.author}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close book reader"
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold font-inter tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 mt-0.5"
              >
                <CloseIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>Close</span>
              </button>
            </div>

            <div
              className="relative flex-1 overflow-y-auto px-8 py-8 min-h-0"
              tabIndex={0}
              aria-label="Book content"
            >
              {book.content ? (
                <pre className="font-mono text-sm leading-7 text-white/85 whitespace-pre-wrap break-words select-text">
                  {book.content}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-12 h-12 rounded-[14px] bg-white/5 border border-white/10 flex items-center justify-center">
                    <BookIcon className="w-6 h-6 text-white/30" strokeWidth={1.5} />
                  </div>
                  <p className="font-inter text-sm text-white/40 text-center">
                    No content available for this book.
                  </p>
                </div>
              )}
            </div>

            <div className="relative flex-shrink-0 px-8 py-4 border-t border-white/[0.06]">
              <p className="font-inter text-xs text-white/25 text-center tracking-wide">
                Press <kbd className="px-1.5 py-0.5 rounded-md bg-white/8 border border-white/10 text-white/40 font-mono">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BookReaderModal;
