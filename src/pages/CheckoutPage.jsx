import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { toast } from 'react-hot-toast';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    const onSubmit = (data) => {
        console.log('Order Data:', { ...data, items, total: totalPrice() });
        // Simulate API call
        setTimeout(() => {
            toast.success('Order placed successfully!');
            clearCart();
            navigate('/');
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Shipping Information</h2>
                        </CardHeader>
                        <CardContent>
                            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <Input
                                            {...register('firstName', { required: 'First name is required' })}
                                            error={errors.firstName?.message}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <Input
                                            {...register('lastName', { required: 'Last name is required' })}
                                            error={errors.lastName?.message}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        error={errors.email?.message}
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <Input
                                        {...register('address', { required: 'Address is required' })}
                                        error={errors.address?.message}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <Input
                                            {...register('city', { required: 'City is required' })}
                                            error={errors.city?.message}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            State / Province
                                        </label>
                                        <Input
                                            {...register('state', { required: 'State is required' })}
                                            error={errors.state?.message}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            ZIP / Postal Code
                                        </label>
                                        <Input
                                            {...register('zip', { required: 'ZIP code is required' })}
                                            error={errors.zip?.message}
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold">Order Summary</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>
                                            {item.name} x {item.quantity}
                                        </span>
                                        <span className="font-medium">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <span>Total</span>
                                        <span>${totalPrice().toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    form="checkout-form"
                                    className="w-full"
                                    size="lg"
                                >
                                    Place Order
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
