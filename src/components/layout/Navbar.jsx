import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { Button } from '../ui/Button';
import { useState } from 'react';

export function Navbar() {
    const navigate = useNavigate();
    const totalItems = useCartStore((state) => state.totalItems());
    const { user, logout } = useAuthStore();
    const { isSidebarOpen, toggleSidebar } = useUIStore();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        ShopReact
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Products
                        </Link>
                        <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                            Categories
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden lg:flex relative flex-1 max-w-md mx-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-gray-100 border-transparent rounded-full px-4 py-2 pl-10 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600">
                        <ShoppingCart className="h-6 w-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/profile" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                Hi, {user.name}
                            </Link>
                            <Button variant="ghost" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-gray-700" onClick={toggleSidebar}>
                        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
