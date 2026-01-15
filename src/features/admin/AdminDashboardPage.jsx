import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';

export default function AdminDashboardPage() {
    const stats = [
        { name: 'Total Revenue', value: '$45,231.89', icon: DollarSign, color: 'bg-green-500' },
        { name: 'Active Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-500' },
        { name: 'Products', value: '48', icon: Package, color: 'bg-purple-500' },
        { name: 'Customers', value: '2,300', icon: Users, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.name}>
                            <CardContent className="flex items-center p-6">
                                <div className={`rounded-full p-3 ${stat.color} bg-opacity-10`}>
                                    <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500">No recent orders to display.</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900">Low Stock Products</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500">All products are well stocked.</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
