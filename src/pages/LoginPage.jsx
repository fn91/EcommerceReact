import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';

export default function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // In a real app, this would be a POST to /login
            // For json-server simulation, we'll try to find the user
            const response = await api.get(`/users?email=${data.email}`);
            const users = response.data;

            if (users.length === 0) {
                toast.error('User not found');
                return;
            }

            const user = users[0];

            // Simulate password check (In a real app, the backend does this)
            if (data.password !== 'password123' && user.email !== 'admin@example.com') {
                // In a real simulation we'd probably have passwords in DB, 
                // but for now let's allow password123 or just skip check for demo
            }

            login(user, 'mock-jwt-token-' + Math.random());
            toast.success('Welcome back!');
            navigate(user.role === 'admin' ? '/admin' : '/');
        } catch {
            toast.error('Login failed. Make sure the server is running.');
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to your account to continue
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center border-t border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
