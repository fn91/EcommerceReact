import { useAuthStore } from '../store/useAuthStore';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Package, User as UserIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Mock orders
    const orders = [
        {
            id: 'ORD-12345',
            date: '2025-05-15',
            total: 299.97,
            status: 'Delivered',
            items: 3,
        },
        {
            id: 'ORD-12346',
            date: '2025-06-02',
            total: 79.99,
            status: 'Processing',
            items: 1,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Profile Info */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <UserIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-md bg-gray-50 p-4">
                                    <p className="text-sm font-medium text-gray-500">Member since</p>
                                    <p className="text-base text-gray-900">May 2025</p>
                                </div>
                                <div className="rounded-md bg-gray-50 p-4">
                                    <p className="text-sm font-medium text-gray-500">Account Type</p>
                                    <p className="text-base capitalize text-gray-900">{user.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order History */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Order History
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900">{order.id}</p>
                                            <p className="text-sm text-gray-500">Placed on {order.date}</p>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between gap-6 sm:mt-0">
                                            <div>
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="font-medium text-gray-900">${order.total}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Status</p>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.status === 'Delivered'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
