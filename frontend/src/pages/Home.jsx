import { useState, useCallback, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { books } from './Books.js';
import Header from '../components/Header.jsx';
import BookCard from '../components/BookCard.jsx';
import Footer from '../components/Footer.jsx';

const BookReaderModal = lazy(() => import('../components/BookReaderModal.jsx'));

const BOOK_CONTENT_MAP = {
  'book-001': () => import('./book-001.txt?raw'),
  'book-002': () => import('./book-002.txt?raw'),
  'book-003': () => import('./book-003.txt?raw'),
  'book-004': () => import('./book-004.txt?raw'),
  'book-005': () => import('./book-005.txt?raw'),
  'book-006': () => import('./book-006.txt?raw'),
  'book-007': () => import('./book-007.txt?raw'),
  'book-008': () => import('./book-008.txt?raw'),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
        <p className="font-inter text-sm text-white/50">Opening book...</p>
      </div>
    </div>
  );
}

function GenreFilter({ genres, activeGenre, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {genres.map((genre) => (
        <motion.button
          key={genre}
          onClick={() => onSelect(genre)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          aria-pressed={activeGenre === genre}
          className={`px-4 py-1.5 rounded-full font-inter font-medium text-xs tracking-wide transition-all duration-200 border ${
            activeGenre === genre
              ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/25'
              : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/80'
          }`}
        >
          {genre}
        </motion.button>
      ))}
    </div>
  );
}

function HeroSection() {
  const BookStackIcon = Icons?.Library || Icons.HelpCircle;
  const SparklesIcon = Icons?.Sparkles || Icons.HelpCircle;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/[0.07] px-8 py-12 md:px-14 md:py-16 mb-10"
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/6 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col gap-4 max-w-xl">
          <motion.div variants={itemVariants} className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/25">
              <SparklesIcon size={11} className="text-indigo-400" strokeWidth={2} />
              <span className="font-inter text-xs font-semibold text-indigo-300 tracking-widest uppercase">Digital Library</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-inter text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Your books,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-300"> anywhere.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="font-inter text-base text-white/50 leading-relaxed max-w-md">
            A curated collection of essential reads. Open any book instantly and lose yourself in the text.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex-shrink-0 hidden md:flex items-center justify-center">
          <div className="w-24 h-24 rounded-[24px] bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center">
            <BookStackIcon size={40} className="text-indigo-400/70" strokeWidth={1.3} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Home() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(false);

  const SearchIcon = Icons?.Search || Icons.HelpCircle;

  const allGenres = ['All', ...Array.from(new Set(books.map((b) => b.genre)))];

  const filteredBooks = books.filter((book) => {
    const matchesGenre = activeGenre === 'All' || book.genre === activeGenre;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
    return matchesGenre && matchesSearch;
  });

  const handleRead = useCallback(async (bookId) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    setLoadingBook(true);

    let content = '';
    const loader = BOOK_CONTENT_MAP[bookId];

    if (loader) {
      try {
        const mod = await loader();
        content = mod?.default ?? '';
      } catch {
        content = '';
      }
    }

    setSelectedBook({ ...book, content });
    setLoadingBook(false);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedBook(null), 400);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0e1120] font-inter">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-800/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={undefined}
        />
      </div>

      <Header />

      <main className="relative flex-1 w-full mx-auto max-w-screen-xl px-6 md:px-8 pt-10 pb-8">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex flex-col gap-1">
            <h2 className="font-inter text-lg font-bold text-white tracking-tight">
              Library
              <span className="ml-2 text-sm font-medium text-white/30">({filteredBooks.length} books)</span>
            </h2>
          </div>

          <div className="relative flex-shrink-0">
            <SearchIcon
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
              strokeWidth={2}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              placeholder="Search title or author..."
              aria-label="Search books"
              className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 font-inter focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/50 transition-all duration-200"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.28 }}
          className="mb-8"
        >
          <GenreFilter
            genres={allGenres}
            activeGenre={activeGenre}
            onSelect={setActiveGenre}
          />
        </motion.div>

        {filteredBooks.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {filteredBooks.map((book, index) => (
              <motion.div key={book.id} variants={itemVariants} custom={index}>
                <BookCard
                  bookId={book.id}
                  title={book.title}
                  author={book.author}
                  coverImg={book.coverImg}
                  onRead={handleRead}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center py-24 gap-5"
          >
            <div className="w-14 h-14 rounded-[16px] bg-white/5 border border-white/10 flex items-center justify-center">
              <Icons.BookX size={24} className="text-white/25" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="font-inter text-base font-semibold text-white/40">No books found</p>
              <p className="font-inter text-sm text-white/25">Try adjusting your search or filter.</p>
            </div>
            <motion.button
              onClick={() => { setSearchQuery(''); setActiveGenre('All'); }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="px-5 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/25 text-indigo-300 text-sm font-inter font-medium hover:bg-indigo-500/30 transition-all duration-200"
            >
              Clear filters
            </motion.button>
          </motion.div>
        )}
      </main>

      <div className="relative pb-6">
        <Footer />
      </div>

      {loadingBook && <LoadingSpinner />}

      <Suspense fallback={null}>
        <BookReaderModal
          isOpen={modalOpen}
          book={selectedBook}
          onClose={handleCloseModal}
        />
      </Suspense>
    </div>
  );
}

export default Home;
