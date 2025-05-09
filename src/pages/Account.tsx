
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Example past orders data
const pastOrders = [
  {
    id: "ORD-12345",
    date: "May 15, 2023",
    status: "Delivered",
    total: "₹4,950.00",
    items: [
      {
        id: 2,
        name: "SunShade SPF 50++ with Vitamin C Sunscreen",
        price: "₹1,500.00",
        quantity: 2,
        image: "https://sallyssoultherapy.com/wp-content/uploads/2024/04/SunShade-SPF-50-Vitamin-C-Sunscreen-1-1024x1024.webp"
      },
      {
        id: 4,
        name: "The Secret Glow Night Cream",
        price: "₹2,500.00",
        quantity: 1,
        image: "https://sallyssoultherapy.com/wp-content/uploads/2024/04/The-Secret-Glow-Night-Cream-1024x1024.webp"
      }
    ]
  },
  {
    id: "ORD-12344",
    date: "April 3, 2023",
    status: "Delivered",
    total: "₹2,449.00",
    items: [
      {
        id: 1,
        name: "Timeless Skin Foaming Face Wash",
        price: "₹699.00",
        quantity: 1,
        image: "https://sallyssoultherapy.com/wp-content/uploads/2022/07/Timeless-Skin-Foaming-Facewash-3-1024x1024.webp"
      },
      {
        id: 3,
        name: "Acne Arrest Face Serum",
        price: "₹1,750.00",
        quantity: 1,
        image: "https://sallyssoultherapy.com/wp-content/uploads/2024/07/Acne-Arrest-Face-Serum-1024x1024.webp"
      }
    ]
  }
];

const Account = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('You have been logged out');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-32">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-gray-600">Welcome back, Sarah Johnson!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="details">Account Details</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Order History</h2>
              
              {pastOrders.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Button asChild>
                    <a href="/#products">Browse Products</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {pastOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="border-b p-6">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Order Number</p>
                            <p className="font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                              {order.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-semibold">{order.total}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <p className="font-medium mb-4">Items</p>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={`${order.id}-${item.id}`} className="flex items-center">
                              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="ml-4 flex-grow">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-gray-600 text-sm">
                                  {item.price} x {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Account Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input value="Sarah" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input value="Johnson" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input value="sarah.johnson@example.com" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input value="+91 98765 43210" className="w-full" />
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <Button>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="addresses">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Your Addresses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Home Address</h3>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Default</span>
                  </div>
                  <p className="text-gray-600">
                    Sarah Johnson<br />
                    123 Green Valley Road<br />
                    Apartment 4B<br />
                    Mumbai, Maharashtra 400001<br />
                    India<br />
                    +91 98765 43210
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-gray-500">Remove</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 border-dashed flex items-center justify-center">
                  <Button variant="outline">
                    + Add New Address
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
