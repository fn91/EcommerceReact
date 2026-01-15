import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import { ProductCard } from '../features/products/ProductCard';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';

export default function ProductListPage() {
    const { products, loading, error } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [sort, setSort] = useState('default');

    useEffect(() => {
        const querySearch = searchParams.get('search');
        const queryCategory = searchParams.get('category');
        if (querySearch !== null) setSearch(querySearch);
        if (queryCategory !== null) setCategory(queryCategory);
    }, [searchParams]);

    const categories = useMemo(() => {
        return ['All', ...new Set(products.map((p) => p.category))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== 'All') {
            result = result.filter((p) => p.category === category);
        }

        if (sort === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, search, category, sort]);

    if (loading) return <div className="p-10 text-center">Loading products...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold">Products</h1>

                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9 w-full md:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <select
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <select
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="default">Sort by</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500">No products found.</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
