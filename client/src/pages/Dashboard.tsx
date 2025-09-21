import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  ShoppingCart, 
  User,
  Heart,
  Plus,
  Minus
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [cartItems, setCartItems] = useState<number>(0);
  
  const categories = [
    { name: "Pizza", emoji: "🍕" },
    { name: "Burgers", emoji: "🍔" },
    { name: "Sushi", emoji: "🍣" },
    { name: "Indian", emoji: "🍛" },
    { name: "Chinese", emoji: "🥡" },
    { name: "Mexican", emoji: "🌮" },
    { name: "Desserts", emoji: "🍰" },
    { name: "Drinks", emoji: "🥤" },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "25-30",
      deliveryFee: 2.99,
      image: "/placeholder.svg",
      isPopular: true,
      distance: "1.2 km"
    },
    {
      id: 2,
      name: "Burger Hub",
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "20-25",
      deliveryFee: 1.99,
      image: "/placeholder.svg",
      isPopular: false,
      distance: "0.8 km"
    },
    {
      id: 3,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "30-35",
      deliveryFee: 3.49,
      image: "/placeholder.svg",
      isPopular: true,
      distance: "2.1 km"
    },
    {
      id: 4,
      name: "Sushi Express",
      cuisine: "Japanese",
      rating: 4.4,
      deliveryTime: "35-40",
      deliveryFee: 4.99,
      image: "/placeholder.svg",
      isPopular: false,
      distance: "1.5 km"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-gradient-primary"></div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">FoodieHub</span>
            </Link>
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Deliver to Home - 123 Main St</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/reels">
              <Button variant="ghost" className="hidden md:inline-flex">
                Food Reels
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for restaurants, dishes, or cuisines..." 
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <span className="text-2xl">{category.emoji}</span>
                <span className="text-xs font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Restaurants</h2>
            <Link to="/reels">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                Watch Food Reels
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-food transition-shadow cursor-pointer group">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-card flex items-center justify-center">
                    <span className="text-4xl">{restaurant.cuisine === "Italian" ? "🍕" : 
                                                  restaurant.cuisine === "American" ? "🍔" : 
                                                  restaurant.cuisine === "Indian" ? "🍛" : "🍣"}</span>
                  </div>
                  {restaurant.isPopular && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Delivery: ${restaurant.deliveryFee}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCartItems(prev => Math.max(0, prev - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{Math.max(0, cartItems)}</span>
                      <Button
                        size="sm"
                        className="bg-gradient-primary text-primary-foreground"
                        onClick={() => setCartItems(prev => prev + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;