

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiSearch,
  FiGrid,
  FiTrendingUp,
  FiChevronRight,
  FiFilter,
  FiStar
} from 'react-icons/fi';
import { categories } from '../data/categories';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-28">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-4 max-w-5xl mx-auto">
          
          <h1 className="text-2xl font-bold text-black">Categories</h1>
          <p className="text-sm text-gray-500">
            Discover dishes from {categories.length}+ categories
          </p>

          {/* Search */}
          <div className="flex gap-2 mt-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl
                         text-sm focus:outline-none focus:border-black"
              />
            </div>

            <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-100">
              <FiFilter size={18} />
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-500">
              {filteredCategories.length} results
            </p>

            <div className="flex border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid' ? 'bg-black text-white' : ''
                }`}
              >
                <FiGrid size={16} />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' ? 'bg-black text-white' : ''
                }`}
              >
                ≡
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-5xl mx-auto">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No categories found
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              : "space-y-3"
          }>
            {filteredCategories.map(category => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group"
              >
                {viewMode === 'grid' ? (
                  <div className="border border-gray-200 rounded-2xl p-3
                                hover:shadow-lg transition-all bg-white">
                    
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full aspect-square object-cover
                                 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="mt-2">
                      <h3 className="text-sm font-semibold text-black">
                        {category.name}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiStar size={12} />
                        4.5 • {category.count}+ items
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 border border-gray-200
                                rounded-xl p-3 hover:bg-gray-50 transition">
                    
                    <img
                      src={category.image}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{category.name}</h3>
                      <p className="text-xs text-gray-500">
                        {category.count}+ items
                      </p>
                    </div>

                    <FiChevronRight className="text-gray-400" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
