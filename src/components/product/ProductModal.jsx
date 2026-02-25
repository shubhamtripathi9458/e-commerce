// import { useState, useEffect, useRef, useCallback } from 'react';
// import { FiX, FiHeart, FiShare2, FiMinus, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { MdDeliveryDining, MdStar } from 'react-icons/md';

// const ProductModal = ({ product, isOpen, onClose, allProducts = [], onNavigate }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showSimilar, setShowSimilar] = useState(false);

//   // Swipe state
//   const [swipeOffset, setSwipeOffset] = useState(0);
//   const [isSwiping, setIsSwiping] = useState(false);
//   const touchStartX = useRef(0);
//   const touchStartY = useRef(0);
//   const swipeAxis = useRef(null); // 'x' | 'y' | null

//   const contentRef = useRef(null);
//   const modalRef = useRef(null);

//   // Current index within allProducts
//   const currentIndex = allProducts.findIndex(p => p.id === product?.id);
//   const hasPrev = currentIndex > 0;
//   const hasNext = currentIndex < allProducts.length - 1;

//   const productImages = product
//     ? [product.image, product.image, product.image, product.image]
//     : [];

//   // Lock body scroll when open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//       // Reset state on close
//       setIsFullScreen(false);
//       setSwipeOffset(0);
//       setCurrentImageIndex(0);
//       setQuantity(1);
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [isOpen]);

//   // Reset image index when product changes
//   useEffect(() => {
//     setCurrentImageIndex(0);
//     setQuantity(1);
//   }, [product?.id]);

//   /* ─────────────────── Scroll → modal ↔ fullscreen ─────────────────── */
//   const handleScroll = useCallback((e) => {
//     const scrollTop = e.target.scrollTop;
//     if (scrollTop > 80 && !isFullScreen) setIsFullScreen(true);
//     if (scrollTop < 20 && isFullScreen) setIsFullScreen(false);
//   }, [isFullScreen]);

//   /* ─────────────────── Horizontal swipe navigation ─────────────────── */
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//     touchStartY.current = e.touches[0].clientY;
//     swipeAxis.current = null;
//   };

//   const handleTouchMove = (e) => {
//     const dx = e.touches[0].clientX - touchStartX.current;
//     const dy = e.touches[0].clientY - touchStartY.current;

//     // Determine axis on first significant movement
//     if (!swipeAxis.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
//       swipeAxis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
//     }

//     if (swipeAxis.current === 'x') {
//       e.preventDefault(); // prevent scroll while swiping horizontally
//       const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
//       setSwipeOffset(clamp(dx, -120, 120));
//       setIsSwiping(true);
//     }
//   };

//   const handleTouchEnd = () => {
//     if (swipeAxis.current === 'x') {
//       if (swipeOffset < -60 && hasNext) {
//         onNavigate?.(allProducts[currentIndex + 1]);
//       } else if (swipeOffset > 60 && hasPrev) {
//         onNavigate?.(allProducts[currentIndex - 1]);
//       }
//       setSwipeOffset(0);
//       setIsSwiping(false);
//     }
//     swipeAxis.current = null;
//   };

//   /* ─────────────────── Image carousel ─────────────────── */
//   const nextImage = () => setCurrentImageIndex(p => (p + 1) % productImages.length);
//   const prevImage = () => setCurrentImageIndex(p => (p - 1 + productImages.length) % productImages.length);

//   if (!isOpen || !product) return null;

//   const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id);

//   return (
//     <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* ── Modal / Full-page panel ── */}
//       <div
//         ref={modalRef}
//         style={{
//           transform: `translateX(${swipeOffset}px)`,
//           transition: isSwiping ? 'none' : 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
//         }}
//         className={`
//           relative bg-[#0E0E16] w-full shadow-2xl
//           transition-[height,border-radius] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
//           ${isFullScreen
//             ? 'h-[100dvh] rounded-none md:rounded-2xl md:max-w-2xl md:h-[90vh]'
//             : 'h-[92dvh] rounded-t-2xl md:rounded-2xl md:max-w-2xl md:h-[90vh]'
//           }
//         `}
//       >
//         {/* Drag handle (mobile) */}
//         <div className="md:hidden sticky top-0 z-20 pt-2.5 pb-1 flex justify-center bg-[#0E0E16]/95 backdrop-blur-sm">
//           <div className="w-10 h-1 bg-[#3A3A48] rounded-full" />
//         </div>

//         {/* Desktop close button */}
//         <button
//           onClick={onClose}
//           className="hidden md:flex absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1E1E28] hover:bg-[#2A2A35] items-center justify-center transition-colors border border-[#2A2A35]"
//         >
//           <FiX className="text-[#f2f2f5]" size={16} />
//         </button>

//         {/* Scrollable content */}
//         <div
//           ref={contentRef}
//           className="h-full overflow-y-auto pb-28 overscroll-contain"
//           onScroll={handleScroll}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           {/* ── Image gallery ── */}
//           <div className="relative h-72 md:h-80 select-none">
//             {/* Prev product hint */}
//             {hasPrev && (
//               <div
//                 className="absolute left-0 top-0 bottom-0 w-12 z-10 flex items-center justify-start pl-2 pointer-events-none"
//                 style={{ opacity: swipeOffset > 20 ? Math.min(swipeOffset / 60, 1) : 0, transition: 'opacity 0.15s' }}
//               >
//                 <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
//                   <FiChevronLeft className="text-white" size={20} />
//                 </div>
//               </div>
//             )}
//             {/* Next product hint */}
//             {hasNext && (
//               <div
//                 className="absolute right-0 top-0 bottom-0 w-12 z-10 flex items-center justify-end pr-2 pointer-events-none"
//                 style={{ opacity: swipeOffset < -20 ? Math.min(-swipeOffset / 60, 1) : 0, transition: 'opacity 0.15s' }}
//               >
//                 <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
//                   <FiChevronRight className="text-white" size={20} />
//                 </div>
//               </div>
//             )}

//             <img
//               src={productImages[currentImageIndex]}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />

//             {/* Veg badge */}
//             <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm
//               ${product.isVeg
//                 ? 'bg-green-500/20 text-green-400 border border-green-500/30'
//                 : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
//             >
//               {product.isVeg ? '🌱 Pure Veg' : '🍖 Non-Veg'}
//             </div>

//             {/* Action buttons */}
//             <div className="absolute top-4 right-4 flex gap-2">
//               <button
//                 onClick={() => setIsLiked(!isLiked)}
//                 className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md shadow-md flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10"
//               >
//                 <FiHeart className={isLiked ? 'text-red-500 fill-red-500' : 'text-white'} size={15} />
//               </button>
//               <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md shadow-md flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10">
//                 <FiShare2 className="text-white" size={15} />
//               </button>
//             </div>

//             {/* Image nav arrows */}
//             <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
//               <FiChevronLeft className="text-white" size={16} />
//             </button>
//             <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
//               <FiChevronRight className="text-white" size={16} />
//             </button>

//             {/* Image dots */}
//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
//               {productImages.map((_, i) => (
//                 <button key={i} onClick={() => setCurrentImageIndex(i)}
//                   className={`rounded-full transition-all ${i === currentImageIndex ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
//                 />
//               ))}
//             </div>

//             {/* Price badge */}
//             <div className="absolute bottom-3 right-4 bg-[#6B8CFF] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
//               ${product.price}
//             </div>

//             {/* Desktop prev/next product navigation */}
//             <div className="hidden md:flex absolute bottom-3 left-4 gap-1">
//               <button
//                 onClick={() => hasPrev && onNavigate?.(allProducts[currentIndex - 1])}
//                 disabled={!hasPrev}
//                 className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center disabled:opacity-30 hover:bg-black/60 transition-colors"
//               >
//                 <FiChevronLeft className="text-white" size={14} />
//               </button>
//               <button
//                 onClick={() => hasNext && onNavigate?.(allProducts[currentIndex + 1])}
//                 disabled={!hasNext}
//                 className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center disabled:opacity-30 hover:bg-black/60 transition-colors"
//               >
//                 <FiChevronRight className="text-white" size={14} />
//               </button>
//             </div>
//           </div>

//           {/* ── Product info ── */}
//           <div className="px-5 pt-5">
//             <div className="flex justify-between items-start mb-3">
//               <div className="flex-1 pr-4">
//                 <h2 className="text-xl font-bold text-[#f2f2f5] mb-1">{product.name}</h2>
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1">
//                     <MdStar className="text-yellow-400" size={15} />
//                     <span className="text-sm font-medium text-[#f2f2f5]">{product.rating}</span>
//                   </div>
//                   <span className="text-xs text-[#3A3A48]">•</span>
//                   <span className="text-xs text-[#8E8E9D]">320+ reviews</span>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-xl font-bold text-[#6B8CFF]">${product.price}</div>
//                 {product.originalPrice && (
//                   <div className="text-xs text-[#6B6B7B] line-through">${product.originalPrice}</div>
//                 )}
//               </div>
//             </div>

//             <p className="text-sm text-[#8E8E9D] mb-4 leading-relaxed">
//               {product.description}. Made with fresh ingredients and authentic recipes. Served hot and fresh.
//             </p>

//             {/* Delivery info */}
//             <div className="flex items-center gap-4 p-3 bg-[#1A1A23] border border-[#2A2A35] rounded-xl mb-4">
//               <div className="flex items-center gap-2">
//                 <MdDeliveryDining className="text-[#6B8CFF]" size={18} />
//                 <span className="text-xs text-[#f2f2f5]">Free delivery</span>
//               </div>
//               <div className="w-px h-4 bg-[#2A2A35]" />
//               <span className="text-xs text-[#8E8E9D]">20-25 min</span>
//             </div>

//             {/* Nutritional info */}
//             <div className="mb-5">
//               <h3 className="text-sm font-semibold text-[#f2f2f5] mb-3">Nutritional Information</h3>
//               <div className="grid grid-cols-4 gap-2">
//                 {[
//                   { label: 'Calories', value: '450' },
//                   { label: 'Protein', value: '25g' },
//                   { label: 'Carbs', value: '35g' },
//                   { label: 'Fat', value: '18g' },
//                 ].map((item) => (
//                   <div key={item.label} className="text-center p-2.5 bg-[#1A1A23] rounded-xl border border-[#2A2A35]">
//                     <div className="text-xs text-[#6B8CFF] font-bold">{item.value}</div>
//                     <div className="text-[10px] text-[#8E8E9D] mt-0.5">{item.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Similar items */}
//             {relatedProducts.length > 0 && (
//               <div className="mb-5">
//                 <button
//                   onClick={() => setShowSimilar(!showSimilar)}
//                   className="flex items-center justify-between w-full p-3 bg-[#1A1A23] rounded-xl hover:bg-[#22222E] transition-colors border border-[#2A2A35]"
//                 >
//                   <span className="text-sm font-semibold text-[#f2f2f5]">Similar Items</span>
//                   <span className={`text-[#8E8E9D] text-xs transition-transform duration-200 ${showSimilar ? 'rotate-180' : ''}`}>▼</span>
//                 </button>
//                 {showSimilar && (
//                   <div className="mt-2 space-y-2">
//                     {relatedProducts.slice(0, 3).map((item) => (
//                       <button
//                         key={item.id}
//                         onClick={() => onNavigate?.(item)}
//                         className="flex items-center gap-3 w-full p-2.5 bg-[#1A1A23] rounded-xl hover:bg-[#22222E] transition-colors border border-[#2A2A35]"
//                       >
//                         <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover flex-shrink-0" />
//                         <div className="flex-1 text-left">
//                           <h4 className="text-sm font-medium text-[#f2f2f5]">{item.name}</h4>
//                           <p className="text-xs text-[#6B8CFF]">${item.price}</p>
//                         </div>
//                         <span className="px-3 py-1 bg-[#6B8CFF] text-white rounded-lg text-xs font-medium hover:bg-[#5A7AE0] transition-colors">
//                           View
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Reviews */}
//             <div className="pb-4">
//               <h3 className="text-sm font-semibold text-[#f2f2f5] mb-3">Customer Reviews</h3>
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="mb-3 pb-3 border-b border-[#2A2A35] last:border-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <div className="w-6 h-6 rounded-full bg-[#2A2A35] flex items-center justify-center">
//                       <span className="text-[10px] text-[#f2f2f5] font-medium">JD</span>
//                     </div>
//                     <span className="text-xs font-medium text-[#f2f2f5]">John Doe</span>
//                     <span className="text-[10px] text-[#6B6B7B]">2 days ago</span>
//                   </div>
//                   <div className="flex items-center gap-0.5 mb-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <MdStar key={star} className={star <= 4 ? 'text-yellow-400' : 'text-[#2A2A35]'} size={11} />
//                     ))}
//                   </div>
//                   <p className="text-xs text-[#8E8E9D]">Amazing taste! Will order again.</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Bottom action bar ── */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0E0E16]/95 backdrop-blur-md border-t border-[#2A2A35]">
//           <div className="flex items-center gap-3 max-w-lg mx-auto">
//             {/* Quantity */}
//             <div className="flex items-center bg-[#1A1A23] rounded-xl border border-[#2A2A35]">
//               <button
//                 onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                 className="w-10 h-10 flex items-center justify-center text-[#f2f2f5] hover:text-[#6B8CFF] transition-colors"
//               >
//                 <FiMinus size={15} />
//               </button>
//               <span className="w-8 text-center text-[#f2f2f5] font-semibold text-sm">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(q => q + 1)}
//                 className="w-10 h-10 flex items-center justify-center text-[#f2f2f5] hover:text-[#6B8CFF] transition-colors"
//               >
//                 <FiPlus size={15} />
//               </button>
//             </div>

//             {/* Add to cart */}
//             <button className="flex-1 bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-lg">
//               Add to Cart • ${(product.price * quantity).toFixed(2)}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;











import { useState, useEffect, useRef, useCallback } from 'react';
import { FiX, FiHeart, FiShare2, FiMinus, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdDeliveryDining, MdStar } from 'react-icons/md';

const ProductModal = ({ product, isOpen, onClose, allProducts = [], onNavigate }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSimilar, setShowSimilar] = useState(false);

  // Swipe state
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const swipeAxis = useRef(null); // 'x' | 'y' | null

  const contentRef = useRef(null);
  const modalRef = useRef(null);

  // Bottom nav height (adjust this value based on your bottom nav height)
  const BOTTOM_NAV_HEIGHT = 80; // pixels

  // Current index within allProducts
  const currentIndex = allProducts.findIndex(p => p.id === product?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allProducts.length - 1;

  const productImages = product
    ? [product.image, product.image, product.image, product.image]
    : [];

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset state on close
      setIsFullScreen(false);
      setSwipeOffset(0);
      setCurrentImageIndex(0);
      setQuantity(1);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setQuantity(1);
  }, [product?.id]);

  /* ─────────────────── Scroll → modal ↔ fullscreen ─────────────────── */
  const handleScroll = useCallback((e) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop > 80 && !isFullScreen) setIsFullScreen(true);
    if (scrollTop < 20 && isFullScreen) setIsFullScreen(false);
  }, [isFullScreen]);

  /* ─────────────────── Horizontal swipe navigation ─────────────────── */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipeAxis.current = null;
  };

  const handleTouchMove = (e) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    // Determine axis on first significant movement
    if (!swipeAxis.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      swipeAxis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }

    if (swipeAxis.current === 'x') {
      e.preventDefault(); // prevent scroll while swiping horizontally
      const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
      setSwipeOffset(clamp(dx, -120, 120));
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = () => {
    if (swipeAxis.current === 'x') {
      if (swipeOffset < -60 && hasNext) {
        onNavigate?.(allProducts[currentIndex + 1]);
      } else if (swipeOffset > 60 && hasPrev) {
        onNavigate?.(allProducts[currentIndex - 1]);
      }
      setSwipeOffset(0);
      setIsSwiping(false);
    }
    swipeAxis.current = null;
  };

  /* ─────────────────── Image carousel ─────────────────── */
  const nextImage = () => setCurrentImageIndex(p => (p + 1) % productImages.length);
  const prevImage = () => setCurrentImageIndex(p => (p - 1 + productImages.length) % productImages.length);

  if (!isOpen || !product) return null;

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id);

  // Calculate bottom padding for content to account for bottom nav and action bar
  const contentBottomPadding = BOTTOM_NAV_HEIGHT + 80; // 80px for action bar + bottom nav

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Modal / Full-page panel ── */}
      <div
        ref={modalRef}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: isSwiping ? 'none' : 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
        }}
        className={`
          relative bg-[#0E0E16] w-full shadow-2xl
          transition-[height,border-radius] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isFullScreen
            ? 'h-[100dvh] rounded-none md:rounded-2xl md:max-w-2xl md:h-[90vh]'
            : 'h-[92dvh] rounded-t-2xl md:rounded-2xl md:max-w-2xl md:h-[90vh]'
          }
        `}
      >
        {/* Drag handle (mobile) */}
        <div className="md:hidden sticky top-0 z-20 pt-2.5 pb-1 flex justify-center bg-[#0E0E16]/95 backdrop-blur-sm">
          <div className="w-10 h-1 bg-[#3A3A48] rounded-full" />
        </div>

        {/* Desktop close button */}
        <button
          onClick={onClose}
          className="hidden md:flex absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1E1E28] hover:bg-[#2A2A35] items-center justify-center transition-colors border border-[#2A2A35]"
        >
          <FiX className="text-[#f2f2f5]" size={16} />
        </button>

        {/* Scrollable content */}
        <div
          ref={contentRef}
          className="h-full overflow-y-auto overscroll-contain"
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            paddingBottom: isFullScreen ? `${contentBottomPadding}px` : '0',
          }}
        >
          {/* ── Image gallery ── */}
          <div className="relative h-72 md:h-80 select-none">
            {/* Prev product hint */}
            {hasPrev && (
              <div
                className="absolute left-0 top-0 bottom-0 w-12 z-10 flex items-center justify-start pl-2 pointer-events-none"
                style={{ opacity: swipeOffset > 20 ? Math.min(swipeOffset / 60, 1) : 0, transition: 'opacity 0.15s' }}
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                  <FiChevronLeft className="text-white" size={20} />
                </div>
              </div>
            )}
            {/* Next product hint */}
            {hasNext && (
              <div
                className="absolute right-0 top-0 bottom-0 w-12 z-10 flex items-center justify-end pr-2 pointer-events-none"
                style={{ opacity: swipeOffset < -20 ? Math.min(-swipeOffset / 60, 1) : 0, transition: 'opacity 0.15s' }}
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                  <FiChevronRight className="text-white" size={20} />
                </div>
              </div>
            )}

            <img
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Veg badge */}
            <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm
              ${product.isVeg
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
            >
              {product.isVeg ? '🌱 Pure Veg' : '🍖 Non-Veg'}
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md shadow-md flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10"
              >
                <FiHeart className={isLiked ? 'text-red-500 fill-red-500' : 'text-white'} size={15} />
              </button>
              <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md shadow-md flex items-center justify-center hover:bg-black/60 transition-colors border border-white/10">
                <FiShare2 className="text-white" size={15} />
              </button>
            </div>

            {/* Image nav arrows */}
            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
              <FiChevronLeft className="text-white" size={16} />
            </button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors">
              <FiChevronRight className="text-white" size={16} />
            </button>

            {/* Image dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {productImages.map((_, i) => (
                <button key={i} onClick={() => setCurrentImageIndex(i)}
                  className={`rounded-full transition-all ${i === currentImageIndex ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
                />
              ))}
            </div>

            {/* Price badge */}
            <div className="absolute bottom-3 right-4 bg-[#6B8CFF] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
              ${product.price}
            </div>

            {/* Desktop prev/next product navigation */}
            <div className="hidden md:flex absolute bottom-3 left-4 gap-1">
              <button
                onClick={() => hasPrev && onNavigate?.(allProducts[currentIndex - 1])}
                disabled={!hasPrev}
                className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center disabled:opacity-30 hover:bg-black/60 transition-colors"
              >
                <FiChevronLeft className="text-white" size={14} />
              </button>
              <button
                onClick={() => hasNext && onNavigate?.(allProducts[currentIndex + 1])}
                disabled={!hasNext}
                className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center disabled:opacity-30 hover:bg-black/60 transition-colors"
              >
                <FiChevronRight className="text-white" size={14} />
              </button>
            </div>
          </div>

          {/* ── Product info ── */}
          <div className="px-5 pt-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 pr-4">
                <h2 className="text-xl font-bold text-[#f2f2f5] mb-1">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <MdStar className="text-yellow-400" size={15} />
                    <span className="text-sm font-medium text-[#f2f2f5]">{product.rating || '4.5'}</span>
                  </div>
                  <span className="text-xs text-[#3A3A48]">•</span>
                  <span className="text-xs text-[#8E8E9D]">320+ reviews</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#6B8CFF]">${product.price}</div>
                {product.originalPrice && (
                  <div className="text-xs text-[#6B6B7B] line-through">${product.originalPrice}</div>
                )}
              </div>
            </div>

            <p className="text-sm text-[#8E8E9D] mb-4 leading-relaxed">
              {product.description || 'Made with fresh ingredients and authentic recipes. Served hot and fresh.'}
            </p>

            {/* Delivery info */}
            <div className="flex items-center gap-4 p-3 bg-[#1A1A23] border border-[#2A2A35] rounded-xl mb-4">
              <div className="flex items-center gap-2">
                <MdDeliveryDining className="text-[#6B8CFF]" size={18} />
                <span className="text-xs text-[#f2f2f5]">Free delivery</span>
              </div>
              <div className="w-px h-4 bg-[#2A2A35]" />
              <span className="text-xs text-[#8E8E9D]">20-25 min</span>
            </div>

            {/* Nutritional info */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#f2f2f5] mb-3">Nutritional Information</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Calories', value: '450' },
                  { label: 'Protein', value: '25g' },
                  { label: 'Carbs', value: '35g' },
                  { label: 'Fat', value: '18g' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-2.5 bg-[#1A1A23] rounded-xl border border-[#2A2A35]">
                    <div className="text-xs text-[#6B8CFF] font-bold">{item.value}</div>
                    <div className="text-[10px] text-[#8E8E9D] mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar items */}
            {relatedProducts.length > 0 && (
              <div className="mb-5">
                <button
                  onClick={() => setShowSimilar(!showSimilar)}
                  className="flex items-center justify-between w-full p-3 bg-[#1A1A23] rounded-xl hover:bg-[#22222E] transition-colors border border-[#2A2A35]"
                >
                  <span className="text-sm font-semibold text-[#f2f2f5]">Similar Items</span>
                  <span className={`text-[#8E8E9D] text-xs transition-transform duration-200 ${showSimilar ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {showSimilar && (
                  <div className="mt-2 space-y-2">
                    {relatedProducts.slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onNavigate?.(item)}
                        className="flex items-center gap-3 w-full p-2.5 bg-[#1A1A23] rounded-xl hover:bg-[#22222E] transition-colors border border-[#2A2A35]"
                      >
                        <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <h4 className="text-sm font-medium text-[#f2f2f5]">{item.name}</h4>
                          <p className="text-xs text-[#6B8CFF]">${item.price}</p>
                        </div>
                        <span className="px-3 py-1 bg-[#6B8CFF] text-white rounded-lg text-xs font-medium hover:bg-[#5A7AE0] transition-colors">
                          View
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews */}
            <div className="pb-4">
              <h3 className="text-sm font-semibold text-[#f2f2f5] mb-3">Customer Reviews</h3>
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-3 pb-3 border-b border-[#2A2A35] last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-[#2A2A35] flex items-center justify-center">
                      <span className="text-[10px] text-[#f2f2f5] font-medium">JD</span>
                    </div>
                    <span className="text-xs font-medium text-[#f2f2f5]">John Doe</span>
                    <span className="text-[10px] text-[#6B6B7B]">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <MdStar key={star} className={star <= 4 ? 'text-yellow-400' : 'text-[#2A2A35]'} size={11} />
                    ))}
                  </div>
                  <p className="text-xs text-[#8E8E9D]">Amazing taste! Will order again.</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom action bar ── */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-[#0E0E16]/95 backdrop-blur-md border-t border-[#2A2A35]"
          style={{
            // Add extra bottom padding in fullscreen mode to account for bottom nav
            paddingBottom: isFullScreen ? `calc(1rem + ${BOTTOM_NAV_HEIGHT}px)` : '1rem',
          }}
        >
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            {/* Quantity */}
            <div className="flex items-center bg-[#1A1A23] rounded-xl border border-[#2A2A35]">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#f2f2f5] hover:text-[#6B8CFF] transition-colors"
              >
                <FiMinus size={15} />
              </button>
              <span className="w-8 text-center text-[#f2f2f5] font-semibold text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#f2f2f5] hover:text-[#6B8CFF] transition-colors"
              >
                <FiPlus size={15} />
              </button>
            </div>

            {/* Add to cart */}
            <button className="flex-1 bg-gradient-to-r from-[#6B8CFF] to-[#9F7AEA] text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-lg">
              Add to Cart • ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>

        {/* Safe area spacer for bottom nav (only visible in fullscreen mode) */}
        {isFullScreen && (
          <div 
            className="hidden md:block"
            style={{ height: `${BOTTOM_NAV_HEIGHT}px` }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductModal;