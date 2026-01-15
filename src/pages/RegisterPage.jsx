import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';

export default function RegisterPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const password = watch('password');

    const onSubmit = async (data) => {
        try {
            // Check if user already exists
            const existing = await api.get(`/users?email=${data.email}`);
            if (existing.data.length > 0) {
                toast.error('Email already registered');
                return;
            }

            const newUser = {
                name: data.name,
                email: data.email,
                role: 'user', // Default role
                createdAt: new Date().toISOString()
            };

            const response = await api.post('/users', newUser);
            const savedUser = response.data;

            login(savedUser, 'mock-jwt-token-' + Math.random());
            toast.success('Account created successfully!');
            navigate('/');
        } catch {
            toast.error('Registration failed. Make sure the server is running.');
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Join us to start shopping
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <Input
                                placeholder="John Doe"
                                {...register('name', { required: 'Name is required' })}
                                error={errors.name?.message}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="john@example.com"
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
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                                error={errors.password?.message}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match',
                                })}
                                error={errors.confirmPassword?.message}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center border-t border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
