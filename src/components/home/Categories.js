


import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { categories } from '../../data/categories';

const Categories = () => {
  // Extended categories for better scrolling experience
  const displayCategories = [...categories, ...categories.slice(0, 4)];

  return (
    <section className="py-4">
      <div className="mobile-container">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#000000]">Categories</h2>
          <Link href="/categories" className="flex items-center gap-1 text-sm text-[#6B8CFF]">
            See All
            <FiChevronRight size={16} />
          </Link>
        </div>

        {/* Horizontal Scrollable Categories */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-2">
            {displayCategories.map((category, index) => (
              <Link
                key={`${category.id}-${index}`}
                href={`/category/${category.slug}`}
                className="flex-shrink-0 w-20 group"
              >
                <div className="relative">
                  {/* Category Image with Gradient Border */}
                  <div className="w-20 h-20 rounded-full overflow-hidden 
                                border-2 border-transparent group-hover:border-[#6B8CFF] 
                                transition-all duration-300 shadow-lg
                                bg-gradient-to-br from-[#000000] to-[#14141C]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Category Name */}
                  <span className="block text-xs font-medium text-center mt-2 text-[#000000] group-hover:text-[#6B8CFF] transition-colors line-clamp-2">
                              
                    {category.name}
                  </span>
                  
                  {/* Item Count */}
                  <span className="block text-[10px] text-center text-[#6B6B7B]">
                    {category.count}+ items
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;