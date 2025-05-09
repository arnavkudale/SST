
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Explore our products and add something to your cart.</p>
            <Button asChild className="animate-pulse-subtle">
              <Link to="/#products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Browse Products
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold mb-12 mt-4">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="hidden md:flex border-b pb-4 mb-4 font-medium text-gray-600">
                  <div className="w-2/5">Product</div>
                  <div className="w-1/5 text-center">Price</div>
                  <div className="w-1/5 text-center">Quantity</div>
                  <div className="w-1/5 text-right">Total</div>
                </div>
                
                {cart.map((item) => {
                  // Parse the price
                  const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
                  const currencySymbol = item.price.replace(/[\d,.]/g, '').trim();
                  const itemTotal = priceValue * item.quantity;
                  
                  return (
                    <div key={item.id} className="flex flex-col md:flex-row items-center py-6 border-b">
                      <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="mt-2 text-sm text-accent-foreground hover:text-red-500 flex items-center"
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                        <div className="md:hidden text-gray-600 mb-1">Price:</div>
                        <span>{item.price}</span>
                      </div>
                      
                      <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                        <div className="md:hidden text-gray-600 mb-1">Quantity:</div>
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="p-1 rounded-md hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/5 text-right">
                        <div className="md:hidden text-gray-600 mb-1">Total:</div>
                        <span className="font-semibold">{currencySymbol}{itemTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                <Button variant="outline" onClick={clearCart} className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
                </Button>
                <Link to="/#products">
                  <Button variant="outline" className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-accent-foreground">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Need help? <Link to="/#contact" className="text-accent-foreground hover:underline">Contact us</Link></p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
