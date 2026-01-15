import { useParams } from 'react-router-dom';
import { useProduct } from '../features/products/useProduct';
import { Button } from '../components/ui/Button';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&q=80';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const addItem = useCartStore((state) => state.addItem);
    const [imageError, setImageError] = useState(false);

    if (loading) return <div className="p-10 text-center">Loading product...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;
    if (!product) return <div className="p-10 text-center">Product not found</div>;

    const handleAddToCart = () => {
        addItem(product);
        toast.success('Added to cart');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/products" className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-blue-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="overflow-hidden rounded-2xl bg-gray-100">
                    <img
                        src={imageError ? FALLBACK_IMAGE : product.image}
                        alt={product.name}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                {/* Product Info */}
                <div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="mt-2 text-lg text-gray-500">{product.category}</p>
                    </div>

                    <div className="mb-6 flex items-center">
                        <div className="flex items-center text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="ml-2 text-lg font-medium text-gray-900">{product.rating}</span>
                        </div>
                        <span className="mx-4 text-gray-300">|</span>
                        <span className="text-sm text-gray-500">120 reviews</span>
                    </div>

                    <div className="mb-8">
                        <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-gray-900">Description</h3>
                        <div className="mt-4 prose prose-sm text-gray-500">
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline">
                            Add to Wishlist
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
