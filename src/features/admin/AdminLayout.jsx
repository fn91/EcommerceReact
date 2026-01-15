import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

export function AdminLayout() {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Users', href: '/admin/users', icon: Users },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden w-64 flex-col bg-white shadow-lg md:flex">
                <div className="flex h-16 items-center justify-center border-b px-4">
                    <h1 className="text-xl font-bold text-blue-600">ShopReact Admin</h1>
                </div>
                <nav className="flex-1 space-y-1 px-2 py-4">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                <Icon
                                    className={cn(
                                        'mr-3 h-5 w-5 flex-shrink-0',
                                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="border-t p-4">
                    <button
                        onClick={logout}
                        className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm md:hidden">
                    <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                    {/* Mobile menu button could go here */}
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
