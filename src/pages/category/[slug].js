
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FiArrowLeft, FiFilter, FiStar } from 'react-icons/fi';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import ProductModal from '../../components/product/ProductModal';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  const category = categories.find(c => c.slug === slug);

  useEffect(() => {
    if (category) {
      let filtered = products.filter(p => p.category === category.slug);
      if (sortBy === 'popular') filtered = [...filtered].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      else if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
      else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      setFilteredProducts(filtered);
    }
  }, [category, sortBy]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProduct(null), 350);
  };

  const handleNavigate = (product) => {
    setSelectedProduct(product);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="px-4 py-3 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiArrowLeft className="text-gray-700" size={20} />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{category.name}</h1>
                  <p className="text-xs text-gray-500">{filteredProducts.length} items available</p>
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
              {[
                { id: 'popular', label: '🔥 Popular' },
                { id: 'price-low', label: '💰 Low to High' },
                { id: 'price-high', label: '💰 High to Low' },
                { id: 'rating', label: '⭐ Rating' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all
                    ${sortBy === option.id
                      ? 'bg-[#6B8CFF] text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-4 py-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 
                           active:scale-95 transition-transform shadow-sm hover:shadow-md text-left"
                >
                  <div className="relative h-32">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    {product.isVeg
                      ? <span className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                      : <span className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
                    }
                    {product.popular && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                        🔥 Popular
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm text-gray-800 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-1 line-clamp-1">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#6B8CFF] text-sm">${product.price}</span>
                      <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        <FiStar className="text-yellow-400" size={10} />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={showModal}
          onClose={handleCloseModal}
          allProducts={filteredProducts}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}