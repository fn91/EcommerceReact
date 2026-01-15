import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="rounded-2xl bg-blue-600 px-6 py-16 text-center text-white md:px-12 md:py-24">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Summer Collection 2025
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                    Discover the latest trends in fashion and electronics. Shop the best products at unbeatable prices.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <Link to="/products">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
