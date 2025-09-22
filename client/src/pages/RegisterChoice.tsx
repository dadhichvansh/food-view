import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Store, Truck, Star } from 'lucide-react';

const RegisterChoice = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-primary-foreground hover:opacity-80 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <div className="h-8 w-8 rounded bg-gradient-secondary"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">
            Join FoodView
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Choose how you'd like to be part of our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customer Registration */}
          <Card className="bg-card/95 backdrop-blur border-0 shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">I'm a Customer</CardTitle>
              <CardDescription className="text-base">
                Order delicious food from your favorite restaurants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Fast delivery to your doorstep</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Rate and review restaurants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Track your orders in real-time</span>
                </div>
              </div>
              <Link to="/register/user" className="block">
                <Button className="w-full h-12 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  Sign Up as Customer
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Restaurant Partner Registration */}
          <Card className="bg-card/95 backdrop-blur border-0 shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Store className="w-10 h-10 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">I'm a Restaurant</CardTitle>
              <CardDescription className="text-base">
                Partner with us to grow your business and reach more customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <Store className="w-4 h-4 text-secondary" />
                  <span>Manage your restaurant profile</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-secondary" />
                  <span>Reach thousands of customers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-4 h-4 text-secondary" />
                  <span>Boost sales with promotions</span>
                </div>
              </div>
              <Link to="/register/partner" className="block">
                <Button className="w-full h-12 bg-gradient-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
                  Sign Up as Partner
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-primary-foreground/80">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-foreground font-medium hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoice;
