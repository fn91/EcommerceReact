import { Link } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import { useMemo } from 'react';
import { LayoutGrid, ShoppingBag, Laptop, Shirt, Home, Trophy } from 'lucide-react';

const categoryIcons = {
    Electronics: Laptop,
    Fashion: Shirt,
    Clothing: Shirt,
    Home: Home,
    Sports: Trophy,
    Default: ShoppingBag
};

export default function CategoriesPage() {
    const { products, loading } = useProducts();

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        return uniqueCategories.map(cat => ({
            name: cat,
            count: products.filter(p => p.category === cat).length,
            icon: categoryIcons[cat] || categoryIcons.Default
        }));
    }, [products]);

    if (loading) return <div className="p-10 text-center">Loading categories...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Categories</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Link
                            key={cat.name}
                            to={`/products?category=${cat.name}`}
                            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                                        {cat.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {cat.count} {cat.count === 1 ? 'Product' : 'Products'}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-blue-50 p-4 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon className="h-8 w-8" />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center text-sm font-medium text-blue-600">
                                Browse Category
                                <LayoutGrid className="ml-2 h-4 w-4" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
