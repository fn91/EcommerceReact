import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&q=80';

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
                <Link to="/products" className="mt-6 inline-block">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                                        <div className="flex-1">
                                            <h3 className="text-base font-medium text-gray-900">
                                                <Link to={`/products/${item.id}`} className="hover:text-blue-600">
                                                    {item.name}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                            <p className="mt-1 text-sm font-medium text-gray-900">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:gap-6">
                                            <div className="flex items-center rounded-md border border-gray-300">
                                                <button
                                                    className="p-1 hover:bg-gray-100"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <span className="px-2 text-sm font-medium text-gray-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="p-1 hover:bg-gray-100"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4 text-gray-500" />
                                                </button>
                                            </div>

                                            <button
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Clear Cart
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <div className="text-base font-medium text-gray-900">Order Total</div>
                                    <div className="text-base font-medium text-gray-900">
                                        ${totalPrice().toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <Link to="/checkout" className="mt-6 block w-full">
                                <Button className="w-full gap-2" size="lg">
                                    Proceed to Checkout
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
