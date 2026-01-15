import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import api from '../../lib/axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function AdminProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [loading, setLoading] = useState(isEditMode);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const response = await api.get(`/products/${id}`);
                    reset(response.data);
                } catch {
                    toast.error('Failed to load product');
                    navigate('/admin/products');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode, navigate, reset]);

    const onSubmit = async (data) => {
        try {
            // Convert types
            const payload = {
                ...data,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                rating: parseFloat(data.rating || 0),
            };

            if (isEditMode) {
                await api.put(`/products/${id}`, payload);
                toast.success('Product updated successfully');
            } else {
                await api.post('/products', payload);
                toast.success('Product created successfully');
            }
            navigate('/admin/products');
        } catch {
            toast.error('Failed to save product');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/products">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit Product' : 'New Product'}
                </h1>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <Input
                                    {...register('name', { required: 'Name is required' })}
                                    error={errors.name?.message}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Price ($)
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: { value: 0, message: 'Price must be positive' },
                                    })}
                                    error={errors.price?.message}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <Input
                                    type="number"
                                    {...register('stock', {
                                        required: 'Stock is required',
                                        min: { value: 0, message: 'Stock must be positive' },
                                    })}
                                    error={errors.stock?.message}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register('category', { required: 'Category is required' })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Home">Home</option>
                                    <option value="Sports">Sports</option>
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Image URL
                                </label>
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    {...register('image', { required: 'Image URL is required' })}
                                    error={errors.image?.message}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register('description', { required: 'Description is required' })}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isSubmitting} className="gap-2">
                                <Save className="h-4 w-4" />
                                {isSubmitting ? 'Saving...' : 'Save Product'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
