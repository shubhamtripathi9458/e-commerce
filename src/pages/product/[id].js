// // import { useRouter } from "next/router";
// // import { useState, useEffect, useRef } from "react";
// // import {
// //   FiArrowLeft,
// //   FiHeart,
// //   FiShare2,
// //   FiMinus,
// //   FiPlus,
// // } from "react-icons/fi";
// // import { MdDeliveryDining, MdStar } from "react-icons/md";
// // import { products } from "../../data/products";

// // export default function ProductPage() {
// //   const router = useRouter();
// //   const { id } = router.query;

// //   const [currentProductIndex, setCurrentProductIndex] = useState(0);
// //   const [quantity, setQuantity] = useState(1);
// //   const [isLiked, setIsLiked] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [isExpanded, setIsExpanded] = useState(false);
  
// //   const touchStartX = useRef(0);
// //   const touchEndX = useRef(0);
// //   const scrollContainerRef = useRef(null);
// //   const cardRef = useRef(null);
// //   const lastScrollY = useRef(0);

// //   useEffect(() => {
// //     // Check if mobile
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };
    
// //     checkMobile();
// //     window.addEventListener("resize", checkMobile);
// //     return () => window.removeEventListener("resize", checkMobile);
// //   }, []);

// //   useEffect(() => {
// //     if (id) {
// //       const productId = parseInt(id);
// //       const foundIndex = products.findIndex((p) => p.id === productId);
      
// //       if (foundIndex === -1) {
// //         router.push("/404");
// //       } else {
// //         setCurrentProductIndex(foundIndex);
// //       }
// //     }
// //   }, [id, router]);

// //   const product = products[currentProductIndex];

// //   if (!product) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center">
// //         <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //       </div>
// //     );
// //   }

// //   // Handle horizontal swipe
// //   const handleTouchStart = (e) => {
// //     touchStartX.current = e.targetTouches[0].clientX;
// //   };

// //   const handleTouchEnd = (e) => {
// //     touchEndX.current = e.changedTouches[0].clientX;
// //     handleSwipe();
// //   };

// //   const handleSwipe = () => {
// //     const swipeThreshold = 50;
// //     const diff = touchStartX.current - touchEndX.current;

// //     if (Math.abs(diff) > swipeThreshold) {
// //       if (diff > 0) {
// //         // Swiped left - next product
// //         if (currentProductIndex < products.length - 1) {
// //           setCurrentProductIndex(currentProductIndex + 1);
// //           setQuantity(1);
// //         }
// //       } else {
// //         // Swiped right - previous product
// //         if (currentProductIndex > 0) {
// //           setCurrentProductIndex(currentProductIndex - 1);
// //           setQuantity(1);
// //         }
// //       }
// //     }
// //   };

// //   // Handle vertical scroll to expand card
// //   const handleCardScroll = (e) => {
// //     if (!isMobile) return;

// //     const scrollTop = e.target.scrollTop;
    
// //     if (scrollTop > 100 && !isExpanded) {
// //       setIsExpanded(true);
// //     } else if (scrollTop < 50 && isExpanded) {
// //       setIsExpanded(false);
// //     }
// //   };

// //   const handleBackClick = () => {
// //     if (isMobile && isExpanded) {
// //       setIsExpanded(false);
// //       if (scrollContainerRef.current) {
// //         scrollContainerRef.current.scrollTop = 0;
// //       }
// //     } else {
// //       router.back();
// //     }
// //   };

// //   // MOBILE VIEW - Card Design
// //   if (isMobile) {
// //     return (
// //       <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center">
// //         {/* Card Container */}
// //         <div
// //           ref={cardRef}
// //           className={`w-full bg-white text-black rounded-t-3xl md:rounded-2xl transition-all duration-300 ${
// //             isExpanded
// //               ? "h-screen rounded-t-none md:rounded-2xl"
// //               : "h-screen md:h-auto"
// //           } flex flex-col`}
// //           onTouchStart={handleTouchStart}
// //           onTouchEnd={handleTouchEnd}
// //         >
// //           {/* Header */}
// //           <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-3xl">
// //             <button
// //               onClick={handleBackClick}
// //               className="p-2 rounded-lg hover:bg-gray-100 transition"
// //             >
// //               <FiArrowLeft size={20} />
// //             </button>

// //             <h1 className="text-sm font-semibold text-gray-800">
// //               {currentProductIndex + 1} of {products.length}
// //             </h1>

// //             <div className="flex gap-2">
// //               <button
// //                 onClick={() => setIsLiked(!isLiked)}
// //                 className="p-2 rounded-lg hover:bg-gray-100 transition"
// //               >
// //                 <FiHeart
// //                   size={18}
// //                   className={isLiked ? "text-red-500 fill-red-500" : ""}
// //                 />
// //               </button>

// //               <button className="p-2 rounded-lg hover:bg-gray-100 transition">
// //                 <FiShare2 size={18} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* Scrollable Content */}
// //           <div
// //             ref={scrollContainerRef}
// //             onScroll={handleCardScroll}
// //             className="flex-1 overflow-y-auto overflow-x-hidden"
// //           >
// //             {/* Product Image */}
// //             <div className="relative w-full h-64 flex-shrink-0">
// //               <img
// //                 src={product.image}
// //                 alt={product.name}
// //                 className="w-full h-full object-cover"
// //               />

// //               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

// //               <div
// //                 className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-md border
// //                 ${
// //                   product.isVeg
// //                     ? "bg-white/20 text-green-600 border-green-400/50"
// //                     : "bg-white/20 text-red-600 border-red-400/50"
// //                 }`}
// //               >
// //                 {product.isVeg ? "🌱 Pure Veg" : "🍖 Non-Veg"}
// //               </div>

// //               <div className="absolute bottom-4 right-4 text-3xl font-bold text-gray-800">
// //                 ₹{product.price}
// //               </div>
// //             </div>

// //             {/* Content */}
// //             <div className="px-4 py-6 pb-32 space-y-6">
// //               {/* Title + Rating */}
// //               <div>
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //                   {product.name}
// //                 </h2>

// //                 <div className="flex items-center gap-3 text-sm text-gray-600">
// //                   <div className="flex items-center gap-1">
// //                     <MdStar className="text-yellow-400" size={16} />
// //                     <span className="font-semibold text-gray-800">
// //                       {product.rating}
// //                     </span>
// //                   </div>
// //                   <span>•</span>
// //                   <span>320+ reviews</span>
// //                 </div>
// //               </div>

// //               {/* Description */}
// //               <p className="text-gray-600 leading-relaxed">
// //                 {product.description}. Crafted using premium ingredients and
// //                 freshly prepared to deliver the best taste and quality.
// //               </p>

// //               {/* Info Cards */}
// //               <div className="space-y-2">
// //                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
// //                   <div className="flex items-center gap-2 text-sm">
// //                     <MdDeliveryDining size={18} className="text-blue-500" />
// //                     <span className="font-semibold">Free Delivery</span>
// //                   </div>
// //                   <p className="text-xs text-gray-500 mt-1">
// //                     Delivered within 20-25 mins
// //                   </p>
// //                 </div>

// //                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
// //                   <div className="text-sm font-semibold">Freshly Prepared</div>
// //                   <p className="text-xs text-gray-500 mt-1">
// //                     Hot & hygienic servings
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Nutrition */}
// //               <div>
// //                 <h3 className="text-sm font-semibold mb-3 text-gray-800">
// //                   Nutritional Information
// //                 </h3>

// //                 <div className="grid grid-cols-4 gap-2">
// //                   {[
// //                     { label: "Calories", value: "450" },
// //                     { label: "Protein", value: "25g" },
// //                     { label: "Carbs", value: "35g" },
// //                     { label: "Fat", value: "18g" },
// //                   ].map((item) => (
// //                     <div
// //                       key={item.label}
// //                       className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center"
// //                     >
// //                       <div className="text-sm font-semibold text-gray-800">
// //                         {item.value}
// //                       </div>
// //                       <div className="text-[10px] text-gray-500">
// //                         {item.label}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Reviews */}
// //               <div>
// //                 <h3 className="text-sm font-semibold mb-3 text-gray-800">
// //                   Customer Reviews
// //                 </h3>

// //                 {[1, 2, 3].map((i) => (
// //                   <div key={i} className="border-b border-gray-200 py-3">
// //                     <div className="flex items-center gap-2 mb-1">
// //                       <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
// //                         JD
// //                       </div>
// //                       <span className="text-xs font-semibold text-gray-800">
// //                         John Doe
// //                       </span>
// //                       <span className="text-[10px] text-gray-400">
// //                         2 days ago
// //                       </span>
// //                     </div>

// //                     <div className="flex gap-1 mb-1">
// //                       {[1, 2, 3, 4, 5].map((star) => (
// //                         <MdStar
// //                           key={star}
// //                           size={12}
// //                           className={
// //                             star <= 4
// //                               ? "text-yellow-400"
// //                               : "text-gray-300"
// //                           }
// //                         />
// //                       ))}
// //                     </div>

// //                     <p className="text-xs text-gray-600">
// //                       Excellent taste and quality. Highly recommended.
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Floating CTA */}
// //           <div className="sticky bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-2">
// //             <div className="flex items-center bg-gray-100 rounded-xl">
// //               <button
// //                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                 className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
// //               >
// //                 <FiMinus size={14} />
// //               </button>

// //               <span className="w-6 text-center text-sm font-semibold">
// //                 {quantity}
// //               </span>

// //               <button
// //                 onClick={() => setQuantity(quantity + 1)}
// //                 className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
// //               >
// //                 <FiPlus size={14} />
// //               </button>
// //             </div>

// //             <button className="flex-1 bg-green-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-green-600 transition">
// //               Add to Cart • ₹{(product.price * quantity).toFixed(0)}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Close on background click */}
// //         <div
// //           className="absolute inset-0 -z-10"
// //           onClick={() => router.back()}
// //         />
// //       </div>
// //     );
// //   }

// //   // DESKTOP VIEW - Original Full Page Design
// //   return (
// //     <div className="min-h-screen bg-black text-white pb-24">
// //       {/* HEADER */}
// //       <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/70 border-b border-white/10">
// //         <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
// //           <button
// //             onClick={() => router.back()}
// //             className="p-2 rounded-lg hover:bg-white/10 transition"
// //           >
// //             <FiArrowLeft size={20} />
// //           </button>

// //           <h1 className="text-sm md:text-base font-semibold">
// //             Product Details
// //           </h1>

// //           <div className="flex gap-2">
// //             <button
// //               onClick={() => setIsLiked(!isLiked)}
// //               className="p-2 rounded-lg hover:bg-white/10 transition"
// //             >
// //               <FiHeart
// //                 size={18}
// //                 className={isLiked ? "text-red-500 fill-red-500" : ""}
// //               />
// //             </button>

// //             <button className="p-2 rounded-lg hover:bg-white/10 transition">
// //               <FiShare2 size={18} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* HERO IMAGE */}
// //       <div className="relative w-full h-[320px] md:h-[440px]">
// //         <img
// //           src={product.image}
// //           alt={product.name}
// //           className="w-full h-full object-cover"
// //         />

// //         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

// //         <div
// //           className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-md border
// //           ${
// //             product.isVeg
// //               ? "bg-white/10 text-green-400 border-green-400/30"
// //               : "bg-white/10 text-red-400 border-red-400/30"
// //           }`}
// //         >
// //           {product.isVeg ? "🌱 Pure Veg" : "🍖 Non-Veg"}
// //         </div>

// //         <div className="absolute bottom-6 right-6 text-3xl md:text-4xl font-bold">
// //           ${product.price}
// //         </div>
// //       </div>

// //       {/* CONTENT */}
// //       <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8 -mt-6 md:-mt-10 relative z-10">
// //         {/* TITLE + RATING */}
// //         <div>
// //           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
// //             {product.name}
// //           </h2>

// //           <div className="flex items-center gap-3 text-sm text-white/60">
// //             <div className="flex items-center gap-1">
// //               <MdStar className="text-yellow-400" size={16} />
// //               <span className="text-white">{product.rating}</span>
// //             </div>
// //             <span>•</span>
// //             <span>320+ reviews</span>
// //           </div>
// //         </div>

// //         {/* DESCRIPTION */}
// //         <p className="text-white/60 leading-relaxed max-w-2xl">
// //           {product.description}. Crafted using premium ingredients and freshly
// //           prepared to deliver the best taste and quality.
// //         </p>

// //         {/* INFO CARDS */}
// //         <div className="grid md:grid-cols-2 gap-3">
// //           <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
// //             <div className="flex items-center gap-2 text-sm">
// //               <MdDeliveryDining size={18} />
// //               <span>Free Delivery</span>
// //             </div>
// //             <p className="text-xs text-white/40 mt-1">
// //               Delivered within 20-25 mins
// //             </p>
// //           </div>

// //           <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
// //             <div className="text-sm">Freshly Prepared</div>
// //             <p className="text-xs text-white/40 mt-1">
// //               Hot & hygienic servings
// //             </p>
// //           </div>
// //         </div>

// //         {/* NUTRITION */}
// //         <div>
// //           <h3 className="text-sm font-semibold mb-3 text-white/80">
// //             Nutritional Information
// //           </h3>

// //           <div className="grid grid-cols-4 gap-2">
// //             {[
// //               { label: "Calories", value: "450" },
// //               { label: "Protein", value: "25g" },
// //               { label: "Carbs", value: "35g" },
// //               { label: "Fat", value: "18g" },
// //             ].map((item) => (
// //               <div
// //                 key={item.label}
// //                 className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-2 text-center"
// //               >
// //                 <div className="text-sm font-semibold">{item.value}</div>
// //                 <div className="text-[10px] text-white/40">
// //                   {item.label}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* DESKTOP CTA */}
// //         <div className="hidden md:flex items-center justify-between mt-6 p-5 rounded-2xl bg-white text-black shadow-xl">
// //           <div>
// //             <div className="text-sm text-black/60">Total Price</div>
// //             <div className="text-3xl font-bold">
// //               ${(product.price * quantity).toFixed(2)}
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3">
// //             <div className="flex items-center bg-black text-white rounded-xl">
// //               <button
// //                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                 className="w-10 h-10 flex items-center justify-center"
// //               >
// //                 <FiMinus size={14} />
// //               </button>

// //               <span className="w-8 text-center text-sm">{quantity}</span>

// //               <button
// //                 onClick={() => setQuantity(quantity + 1)}
// //                 className="w-10 h-10 flex items-center justify-center"
// //               >
// //                 <FiPlus size={14} />
// //               </button>
// //             </div>

// //             <button className="bg-black text-white px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition">
// //               Add to Cart
// //             </button>
// //           </div>
// //         </div>

// //         {/* REVIEWS */}
// //         <div>
// //           <h3 className="text-sm font-semibold mb-3 text-white/80">
// //             Customer Reviews
// //           </h3>

// //           {[1, 2, 3].map((i) => (
// //             <div key={i} className="border-b border-white/10 py-3">
// //               <div className="flex items-center gap-2 mb-1">
// //                 <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">
// //                   JD
// //                 </div>
// //                 <span className="text-xs text-white/80">John Doe</span>
// //                 <span className="text-[10px] text-white/30">
// //                   2 days ago
// //                 </span>
// //               </div>

// //               <div className="flex gap-1 mb-1">
// //                 {[1, 2, 3, 4, 5].map((star) => (
// //                   <MdStar
// //                     key={star}
// //                     size={12}
// //                     className={
// //                       star <= 4 ? "text-yellow-400" : "text-white/10"
// //                     }
// //                   />
// //                 ))}
// //               </div>

// //               <p className="text-xs text-white/50">
// //                 Excellent taste and quality. Highly recommended.
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }












// import { useRouter } from "next/router";
// import { useState, useEffect, useRef } from "react";
// import {
//   FiArrowLeft,
//   FiHeart,
//   FiShare2,
//   FiMinus,
//   FiPlus,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import { MdDeliveryDining, MdStar } from "react-icons/md";
// import { products } from "../../data/products";

// export default function ProductPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);
//   const scrollContainerRef = useRef(null);
//   const cardRef = useRef(null);
//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     // Check if mobile
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     if (id) {
//       const productId = parseInt(id);
//       const foundIndex = products.findIndex((p) => p.id === productId);
      
//       if (foundIndex === -1) {
//         router.push("/404");
//       } else {
//         setCurrentProductIndex(foundIndex);
//       }
//     }
//   }, [id, router]);

//   const product = products[currentProductIndex];

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // Handle product navigation
//   const goToPreviousProduct = () => {
//     if (currentProductIndex > 0) {
//       setCurrentProductIndex(currentProductIndex - 1);
//       setQuantity(1);
//     }
//   };

//   const goToNextProduct = () => {
//     if (currentProductIndex < products.length - 1) {
//       setCurrentProductIndex(currentProductIndex + 1);
//       setQuantity(1);
//     }
//   };

//   // Handle horizontal swipe
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.targetTouches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     touchEndX.current = e.changedTouches[0].clientX;
//     handleSwipe();
//   };

//   const handleSwipe = () => {
//     const swipeThreshold = 50;
//     const diff = touchStartX.current - touchEndX.current;

//     if (Math.abs(diff) > swipeThreshold) {
//       if (diff > 0) {
//         goToNextProduct();
//       } else {
//         goToPreviousProduct();
//       }
//     }
//   };

//   // Handle vertical scroll to expand card
//   const handleCardScroll = (e) => {
//     if (!isMobile) return;

//     const scrollTop = e.target.scrollTop;
    
//     if (scrollTop > 100 && !isExpanded) {
//       setIsExpanded(true);
//     } else if (scrollTop < 50 && isExpanded) {
//       setIsExpanded(false);
//     }
//   };

//   const handleBackClick = () => {
//     if (isMobile && isExpanded) {
//       setIsExpanded(false);
//       if (scrollContainerRef.current) {
//         scrollContainerRef.current.scrollTop = 0;
//       }
//     } else {
//       router.back();
//     }
//   };

//   // MOBILE VIEW - Card Design
//   if (isMobile) {
//     return (
//       <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center">
//         {/* Card Container */}
//         <div
//           ref={cardRef}
//           className={`w-full bg-white text-black rounded-t-3xl md:rounded-2xl transition-all duration-300 ${
//             isExpanded
//               ? "h-screen rounded-t-none md:rounded-2xl"
//               : "h-screen md:h-auto"
//           } flex flex-col`}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {/* Header */}
//           <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-3xl">
//             <button
//               onClick={handleBackClick}
//               className="p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <FiArrowLeft size={20} />
//             </button>

//             <h1 className="text-sm font-semibold text-gray-800">
//               {currentProductIndex + 1} of {products.length}
//             </h1>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setIsLiked(!isLiked)}
//                 className="p-2 rounded-lg hover:bg-gray-100 transition"
//               >
//                 <FiHeart
//                   size={18}
//                   className={isLiked ? "text-red-500 fill-red-500" : ""}
//                 />
//               </button>

//               <button className="p-2 rounded-lg hover:bg-gray-100 transition">
//                 <FiShare2 size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Horizontal Navigation Arrows for Mobile */}
//           {!isExpanded && (
//             <>
//               {currentProductIndex > 0 && (
//                 <button
//                   onClick={goToPreviousProduct}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200"
//                 >
//                   <FiChevronLeft size={20} />
//                 </button>
//               )}
//               {currentProductIndex < products.length - 1 && (
//                 <button
//                   onClick={goToNextProduct}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200"
//                 >
//                   <FiChevronRight size={20} />
//                 </button>
//               )}
//             </>
//           )}

//           {/* Scrollable Content */}
//           <div
//             ref={scrollContainerRef}
//             onScroll={handleCardScroll}
//             className="flex-1 overflow-y-auto overflow-x-hidden"
//           >
//             {/* Product Image */}
//             <div className="relative w-full h-64 flex-shrink-0">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

//               <div
//                 className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-md border
//                 ${
//                   product.isVeg
//                     ? "bg-white/20 text-green-600 border-green-400/50"
//                     : "bg-white/20 text-red-600 border-red-400/50"
//                 }`}
//               >
//                 {product.isVeg ? "🌱 Pure Veg" : "🍖 Non-Veg"}
//               </div>

//               <div className="absolute bottom-4 right-4 text-3xl font-bold text-gray-800">
//                 ₹{product.price}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="px-4 py-6 pb-40 space-y-6">
//               {/* Title + Rating */}
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   {product.name}
//                 </h2>

//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <div className="flex items-center gap-1">
//                     <MdStar className="text-yellow-400" size={16} />
//                     <span className="font-semibold text-gray-800">
//                       {product.rating}
//                     </span>
//                   </div>
//                   <span>•</span>
//                   <span>320+ reviews</span>
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 leading-relaxed">
//                 {product.description}. Crafted using premium ingredients and
//                 freshly prepared to deliver the best taste and quality.
//               </p>

//               {/* Info Cards */}
//               <div className="space-y-2">
//                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
//                   <div className="flex items-center gap-2 text-sm">
//                     <MdDeliveryDining size={18} className="text-blue-500" />
//                     <span className="font-semibold">Free Delivery</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Delivered within 20-25 mins
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
//                   <div className="text-sm font-semibold">Freshly Prepared</div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Hot & hygienic servings
//                   </p>
//                 </div>
//               </div>

//               {/* Nutrition */}
//               <div>
//                 <h3 className="text-sm font-semibold mb-3 text-gray-800">
//                   Nutritional Information
//                 </h3>

//                 <div className="grid grid-cols-4 gap-2">
//                   {[
//                     { label: "Calories", value: "450" },
//                     { label: "Protein", value: "25g" },
//                     { label: "Carbs", value: "35g" },
//                     { label: "Fat", value: "18g" },
//                   ].map((item) => (
//                     <div
//                       key={item.label}
//                       className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center"
//                     >
//                       <div className="text-sm font-semibold text-gray-800">
//                         {item.value}
//                       </div>
//                       <div className="text-[10px] text-gray-500">
//                         {item.label}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Reviews */}
//               <div>
//                 <h3 className="text-sm font-semibold mb-3 text-gray-800">
//                   Customer Reviews
//                 </h3>

//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="border-b border-gray-200 py-3">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
//                         JD
//                       </div>
//                       <span className="text-xs font-semibold text-gray-800">
//                         John Doe
//                       </span>
//                       <span className="text-[10px] text-gray-400">
//                         2 days ago
//                       </span>
//                     </div>

//                     <div className="flex gap-1 mb-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <MdStar
//                           key={star}
//                           size={12}
//                           className={
//                             star <= 4
//                               ? "text-yellow-400"
//                               : "text-gray-300"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <p className="text-xs text-gray-600">
//                       Excellent taste and quality. Highly recommended.
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Floating CTA - Adjusted for bottom nav */}
//           <div className="sticky bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
//             <div className="flex items-center bg-gray-100 rounded-xl flex-shrink-0">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
//               >
//                 <FiMinus size={14} />
//               </button>

//               <span className="w-6 text-center text-sm font-semibold">
//                 {quantity}
//               </span>

//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
//               >
//                 <FiPlus size={14} />
//               </button>
//             </div>

//             <button className="flex-1 bg-green-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-green-600 transition min-w-0">
//               Add to Cart • ₹{(product.price * quantity).toFixed(0)}
//             </button>
//           </div>
//         </div>

//         {/* Close on background click */}
//         <div
//           className="absolute inset-0 -z-10"
//           onClick={() => router.back()}
//         />
//       </div>
//     );
//   }

//   // DESKTOP VIEW - Original Full Page Design
//   return (
//     <div className="min-h-screen bg-black text-white pb-24">
//       {/* HEADER */}
//       <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/70 border-b border-white/10">
//         <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
//           <button
//             onClick={() => router.back()}
//             className="p-2 rounded-lg hover:bg-white/10 transition"
//           >
//             <FiArrowLeft size={20} />
//           </button>

//           <h1 className="text-sm md:text-base font-semibold">
//             Product Details
//           </h1>

//           <div className="flex gap-2">
//             <button
//               onClick={() => setIsLiked(!isLiked)}
//               className="p-2 rounded-lg hover:bg-white/10 transition"
//             >
//               <FiHeart
//                 size={18}
//                 className={isLiked ? "text-red-500 fill-red-500" : ""}
//               />
//             </button>

//             <button className="p-2 rounded-lg hover:bg-white/10 transition">
//               <FiShare2 size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* HERO IMAGE with desktop navigation arrows */}
//       <div className="relative w-full h-[320px] md:h-[440px] group">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-full object-cover"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

//         {/* Desktop Navigation Arrows */}
//         {currentProductIndex > 0 && (
//           <button
//             onClick={goToPreviousProduct}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <FiChevronLeft size={24} />
//           </button>
//         )}
//         {currentProductIndex < products.length - 1 && (
//           <button
//             onClick={goToNextProduct}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
//           >
//             <FiChevronRight size={24} />
//           </button>
//         )}

//         <div
//           className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-md border
//           ${
//             product.isVeg
//               ? "bg-white/10 text-green-400 border-green-400/30"
//               : "bg-white/10 text-red-400 border-red-400/30"
//           }`}
//         >
//           {product.isVeg ? "🌱 Pure Veg" : "🍖 Non-Veg"}
//         </div>

//         <div className="absolute bottom-6 right-6 text-3xl md:text-4xl font-bold">
//           ₹{product.price}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8 -mt-6 md:-mt-10 relative z-10">
//         {/* TITLE + RATING */}
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
//             {product.name}
//           </h2>

//           <div className="flex items-center gap-3 text-sm text-white/60">
//             <div className="flex items-center gap-1">
//               <MdStar className="text-yellow-400" size={16} />
//               <span className="text-white">{product.rating}</span>
//             </div>
//             <span>•</span>
//             <span>320+ reviews</span>
//           </div>
//         </div>

//         {/* DESCRIPTION */}
//         <p className="text-white/60 leading-relaxed max-w-2xl">
//           {product.description}. Crafted using premium ingredients and freshly
//           prepared to deliver the best taste and quality.
//         </p>

//         {/* INFO CARDS */}
//         <div className="grid md:grid-cols-2 gap-3">
//           <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
//             <div className="flex items-center gap-2 text-sm">
//               <MdDeliveryDining size={18} />
//               <span>Free Delivery</span>
//             </div>
//             <p className="text-xs text-white/40 mt-1">
//               Delivered within 20-25 mins
//             </p>
//           </div>

//           <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
//             <div className="text-sm">Freshly Prepared</div>
//             <p className="text-xs text-white/40 mt-1">
//               Hot & hygienic servings
//             </p>
//           </div>
//         </div>

//         {/* NUTRITION */}
//         <div>
//           <h3 className="text-sm font-semibold mb-3 text-white/80">
//             Nutritional Information
//           </h3>

//           <div className="grid grid-cols-4 gap-2">
//             {[
//               { label: "Calories", value: "450" },
//               { label: "Protein", value: "25g" },
//               { label: "Carbs", value: "35g" },
//               { label: "Fat", value: "18g" },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-2 text-center"
//               >
//                 <div className="text-sm font-semibold">{item.value}</div>
//                 <div className="text-[10px] text-white/40">
//                   {item.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* DESKTOP CTA */}
//         <div className="hidden md:flex items-center justify-between mt-6 p-5 rounded-2xl bg-white text-black shadow-xl">
//           <div>
//             <div className="text-sm text-black/60">Total Price</div>
//             <div className="text-3xl font-bold">
//               ₹{(product.price * quantity).toFixed(2)}
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="flex items-center bg-black text-white rounded-xl">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="w-10 h-10 flex items-center justify-center"
//               >
//                 <FiMinus size={14} />
//               </button>

//               <span className="w-8 text-center text-sm">{quantity}</span>

//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="w-10 h-10 flex items-center justify-center"
//               >
//                 <FiPlus size={14} />
//               </button>
//             </div>

//             <button className="bg-black text-white px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition">
//               Add to Cart
//             </button>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div>
//           <h3 className="text-sm font-semibold mb-3 text-white/80">
//             Customer Reviews
//           </h3>

//           {[1, 2, 3].map((i) => (
//             <div key={i} className="border-b border-white/10 py-3">
//               <div className="flex items-center gap-2 mb-1">
//                 <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">
//                   JD
//                 </div>
//                 <span className="text-xs text-white/80">John Doe</span>
//                 <span className="text-[10px] text-white/30">
//                   2 days ago
//                 </span>
//               </div>

//               <div className="flex gap-1 mb-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <MdStar
//                     key={star}
//                     size={12}
//                     className={
//                       star <= 4 ? "text-yellow-400" : "text-white/10"
//                     }
//                   />
//                 ))}
//               </div>

//               <p className="text-xs text-white/50">
//                 Excellent taste and quality. Highly recommended.
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


















import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import {
  FiArrowLeft,
  FiHeart,
  FiShare2,
  FiMinus,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { MdDeliveryDining, MdStar } from "react-icons/md";
import { products } from "../../data/products";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const scrollContainerRef = useRef(null);
  const cardRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundIndex = products.findIndex((p) => p.id === productId);
      
      if (foundIndex === -1) {
        router.push("/404");
      } else {
        setCurrentProductIndex(foundIndex);
      }
    }
  }, [id, router]);

  const product = products[currentProductIndex];

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Handle product navigation
  const goToPreviousProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(currentProductIndex - 1);
      setQuantity(1);
    }
  };

  const goToNextProduct = () => {
    if (currentProductIndex < products.length - 1) {
      setCurrentProductIndex(currentProductIndex + 1);
      setQuantity(1);
    }
  };

  // Handle horizontal swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNextProduct();
      } else {
        goToPreviousProduct();
      }
    }
  };

  // Handle vertical scroll to expand card
  const handleCardScroll = (e) => {
    if (!isMobile) return;

    const scrollTop = e.target.scrollTop;
    
    if (scrollTop > 100 && !isExpanded) {
      setIsExpanded(true);
    } else if (scrollTop < 50 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleBackClick = () => {
    if (isMobile && isExpanded) {
      setIsExpanded(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      router.back();
    }
  };

  // MOBILE VIEW - Card Design
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center">
        {/* Card Container */}
        <div
          ref={cardRef}
          className={`w-full bg-white text-black rounded-t-3xl md:rounded-2xl transition-all duration-300 ${
            isExpanded
              ? "h-screen rounded-t-none md:rounded-2xl"
              : "h-screen md:h-auto"
          } flex flex-col`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-3xl">
            <button
              onClick={handleBackClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiArrowLeft size={20} />
            </button>

            <h1 className="text-sm font-semibold text-gray-800">
              {currentProductIndex + 1} of {products.length}
            </h1>

            <div className="flex gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <FiHeart
                  size={18}
                  className={isLiked ? "text-red-500 fill-red-500" : ""}
                />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <FiShare2 size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal Navigation Arrows for Mobile */}
          {!isExpanded && (
            <>
              {currentProductIndex > 0 && (
                <button
                  onClick={goToPreviousProduct}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200"
                >
                  <FiChevronLeft size={20} />
                </button>
              )}
              {currentProductIndex < products.length - 1 && (
                <button
                  onClick={goToNextProduct}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200"
                >
                  <FiChevronRight size={20} />
                </button>
              )}
            </>
          )}

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            onScroll={handleCardScroll}
            className="flex-1 overflow-y-auto overflow-x-hidden"
          >
            {/* Product Image */}
            <div className="relative w-full h-64 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

              <div
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-md border
                ${
                  product.isVeg
                    ? "bg-white/20 text-green-600 border-green-400/50"
                    : "bg-white/20 text-red-600 border-red-400/50"
                }`}
              >
                {product.isVeg ? "🌱 Pure Veg" : "🍖 Non-Veg"}
              </div>

              <div className="absolute bottom-4 right-4 text-3xl font-bold text-gray-800">
                ₹{product.price}
              </div>
            </div>

            {/* Content - Added extra bottom padding for bottom nav */}
            <div className="px-4 py-6 pb-32 space-y-6">
              {/* Title + Rating */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MdStar className="text-yellow-400" size={16} />
                    <span className="font-semibold text-gray-800">
                      {product.rating}
                    </span>
                  </div>
                  <span>•</span>
                  <span>320+ reviews</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}. Crafted using premium ingredients and
                freshly prepared to deliver the best taste and quality.
              </p>

              {/* Info Cards */}
              <div className="space-y-2">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MdDeliveryDining size={18} className="text-blue-500" />
                    <span className="font-semibold">Free Delivery</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Delivered within 20-25 mins
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="text-sm font-semibold">Freshly Prepared</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Hot & hygienic servings
                  </p>
                </div>
              </div>

              {/* Nutrition */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-800">
                  Nutritional Information
                </h3>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Calories", value: "450" },
                    { label: "Protein", value: "25g" },
                    { label: "Carbs", value: "35g" },
                    { label: "Fat", value: "18g" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center"
                    >
                      <div className="text-sm font-semibold text-gray-800">
                        {item.value}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-800">
                  Customer Reviews
                </h3>

                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-gray-200 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                        JD
                      </div>
                      <span className="text-xs font-semibold text-gray-800">
                        John Doe
                      </span>
                      <span className="text-[10px] text-gray-400">
                        2 days ago
                      </span>
                    </div>

                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <MdStar
                          key={star}
                          size={12}
                          className={
                            star <= 4
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-600">
                      Excellent taste and quality. Highly recommended.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating CTA - Added bottom padding for bottom nav */}
          <div className="sticky bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-2 pb-[calc(0.75rem+70px)]">
            <div className="flex items-center bg-gray-100 rounded-xl flex-shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
              >
                <FiMinus size={14} />
              </button>

              <span className="w-6 text-center text-sm font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
              >
                <FiPlus size={14} />
              </button>
            </div>

            <button className="flex-1 bg-green-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-green-600 transition min-w-0">
              Add to Cart • ₹{(product.price * quantity).toFixed(0)}
            </button>
          </div>
        </div>

        {/* Close on background click */}
        <div
          className="absolute inset-0 -z-10"
          onClick={() => router.back()}
        />
      </div>
    );
  }

  // DESKTOP VIEW - Original Full Page Design
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* HEADER */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/70 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <FiArrowLeft size={20} />
          </button>

          <h1 className="text-sm md:text-base font-semibold">
            Product Details
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <FiHeart
                size={18}
                className={isLiked ? "text-red-500 fill-red-500" : ""}
              />
            </button>

            <button className="p-2 rounded-lg hover:bg-white/10 transition">
              <FiShare2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* HERO IMAGE with desktop navigation arrows */}
      <div className="relative w-full h-[320px] md:h-[440px] group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Desktop Navigation Arrows */}
        {currentProductIndex > 0 && (
          <button
            onClick={goToPreviousProduct}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiChevronLeft size={24} />
          </button>
        )}
        {currentProductIndex < products.length - 1 && (
          <button
            onClick={goToNextProduct}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiChevronRight size={24} />
          </button>
        )}

        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-md border
          ${
            product.isVeg
              ? "bg-white/10 text-green-400 border-green-400/30"
              : "bg-white/10 text-red-400 border-red-400/30"
          }`}
        >
          {product.isVeg ? "🌱 Pure Veg" : "🍖 Non-Veg"}
        </div>

        <div className="absolute bottom-6 right-6 text-3xl md:text-4xl font-bold">
          ₹{product.price}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8 -mt-6 md:-mt-10 relative z-10">
        {/* TITLE + RATING */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {product.name}
          </h2>

          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <MdStar className="text-yellow-400" size={16} />
              <span className="text-white">{product.rating}</span>
            </div>
            <span>•</span>
            <span>320+ reviews</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-white/60 leading-relaxed max-w-2xl">
          {product.description}. Crafted using premium ingredients and freshly
          prepared to deliver the best taste and quality.
        </p>

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm">
              <MdDeliveryDining size={18} />
              <span>Free Delivery</span>
            </div>
            <p className="text-xs text-white/40 mt-1">
              Delivered within 20-25 mins
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
            <div className="text-sm">Freshly Prepared</div>
            <p className="text-xs text-white/40 mt-1">
              Hot & hygienic servings
            </p>
          </div>
        </div>

        {/* NUTRITION */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-white/80">
            Nutritional Information
          </h3>

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Calories", value: "450" },
              { label: "Protein", value: "25g" },
              { label: "Carbs", value: "35g" },
              { label: "Fat", value: "18g" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-2 text-center"
              >
                <div className="text-sm font-semibold">{item.value}</div>
                <div className="text-[10px] text-white/40">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center justify-between mt-6 p-5 rounded-2xl bg-white text-black shadow-xl">
          <div>
            <div className="text-sm text-black/60">Total Price</div>
            <div className="text-3xl font-bold">
              ₹{(product.price * quantity).toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-black text-white rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center"
              >
                <FiMinus size={14} />
              </button>

              <span className="w-8 text-center text-sm">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center"
              >
                <FiPlus size={14} />
              </button>
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* REVIEWS */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-white/80">
            Customer Reviews
          </h3>

          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-white/10 py-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">
                  JD
                </div>
                <span className="text-xs text-white/80">John Doe</span>
                <span className="text-[10px] text-white/30">
                  2 days ago
                </span>
              </div>

              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MdStar
                    key={star}
                    size={12}
                    className={
                      star <= 4 ? "text-yellow-400" : "text-white/10"
                    }
                  />
                ))}
              </div>

              <p className="text-xs text-white/50">
                Excellent taste and quality. Highly recommended.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}