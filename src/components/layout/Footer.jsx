import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">ShopReact</h3>
                        <p className="mt-4 text-sm text-gray-500">
                            Your one-stop shop for everything modern and cool. Built with React & Tailwind.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Shop</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            <li><Link to="/products" className="hover:text-blue-600">All Products</Link></li>
                            <li><Link to="/categories" className="hover:text-blue-600">Categories</Link></li>
                            <li><Link to="/deals" className="hover:text-blue-600">Deals</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Support</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-600">FAQs</Link></li>
                            <li><Link to="/shipping" className="hover:text-blue-600">Shipping</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">Legal</h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-500">
                            <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} ShopReact. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
