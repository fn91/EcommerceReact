import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardFooter } from '../../components/ui/Card';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&q=80';

export function ProductCard({ product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [imageError, setImageError] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem(product);
        toast.success('Added to cart');
    };

    return (
        <Link to={`/products/${product.id}`} className="group block h-full">
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                        src={imageError ? FALLBACK_IMAGE : product.image}
                        alt={product.name}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                            {product.name}
                        </h3>
                        <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    <div className="mt-2 text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button
                        className="w-full gap-2"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
