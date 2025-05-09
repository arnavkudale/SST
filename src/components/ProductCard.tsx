import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, link }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image });
  };

  return (
    <Card className="product-card overflow-hidden h-full flex flex-col group hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img 
          src={image} 
          alt={name} 
          className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </a>
      <CardHeader className="pb-2">
        <CardTitle className="font-montserrat text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-accent-foreground transition-colors duration-300">
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground transition">
            {name}
          </a>
        </CardTitle>
        <CardDescription className="font-montserrat text-sm font-medium text-accent-foreground">
          {price}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 mt-auto flex flex-col sm:flex-row gap-2 w-full">
        <Button 
          className="w-full sm:flex-1 min-w-0 whitespace-nowrap font-montserrat text-xs font-semibold tracking-wide uppercase py-2 px-3 hover:bg-accent/10 transition-colors duration-300" 
          variant="outline" 
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Details
          </a>
        </Button>
        <Button 
          className="w-full sm:flex-1 min-w-0 whitespace-nowrap font-montserrat text-xs font-semibold tracking-wide uppercase py-2 px-3 hover:bg-accent-foreground/90 transition-colors duration-300" 
          onClick={handleAddToCart}
          variant="default"
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
