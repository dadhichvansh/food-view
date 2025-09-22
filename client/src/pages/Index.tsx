import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Search,
  Star,
  Clock,
  Truck,
  ChefHat,
  Smartphone,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-food.jpg';

const Index = () => {
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your food in 30 minutes or less',
    },
    {
      icon: ChefHat,
      title: 'Quality Food',
      description: 'From the best restaurants in town',
    },
    {
      icon: Smartphone,
      title: 'Easy Ordering',
      description: 'Order with just a few taps',
    },
    {
      icon: Users,
      title: 'Join as Partner',
      description: 'Grow your restaurant business with us',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gradient-primary"></div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FoodView
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
              Delicious Food
              <br />
              Delivered Fast
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Order from your favorite restaurants and get fresh, hot food
              delivered to your doorstep in minutes
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-scale-in">
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-card rounded-xl shadow-food border">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Enter your delivery location"
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search for restaurants or dishes"
                    className="pl-10 border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                <Button className="bg-gradient-primary text-primary-foreground px-8 hover:opacity-90 transition-opacity">
                  Find Food
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-bounce-in">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity px-8"
                >
                  Order Now
                </Button>
              </Link>
              <Link to="/reels">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Watch Food Reels
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 relative">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Delicious food spread"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-overlay opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FoodView?</h2>
            <p className="text-xl text-muted-foreground">
              Experience the best food delivery service in your city
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-food bg-gradient-card hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Ordering?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FoodView for their
            daily meals
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8"
              >
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded bg-gradient-primary"></div>
              <span className="text-xl font-bold">FoodView</span>
            </div>
            <p className="text-muted-foreground">
              &copy; 2025 FoodView. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
