import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Users, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isPartner = location.pathname.includes("/partner");
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    restaurantName: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    // Mock registration - in real app, this would connect to backend
    toast({
      title: "Registration Successful!",
      description: `Welcome to FoodieHub! Redirecting to ${isPartner ? 'partner' : 'customer'} dashboard...`,
    });
    
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/register" className="inline-flex items-center text-primary-foreground hover:opacity-80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration Options
          </Link>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              {isPartner ? (
                <Store className="w-6 h-6 text-primary-foreground" />
              ) : (
                <Users className="w-6 h-6 text-primary-foreground" />
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            {isPartner ? "Restaurant Registration" : "Customer Registration"}
          </h1>
          <p className="text-primary-foreground/80">
            {isPartner ? "Join our restaurant partner network" : "Create your FoodieHub account"}
          </p>
        </div>

        <Card className="bg-card/95 backdrop-blur border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">
              {isPartner ? "Partner Registration" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isPartner 
                ? "Fill in your restaurant details to get started" 
                : "Fill in your details to create your account"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{isPartner ? "Owner Name" : "Full Name"}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={isPartner ? "Enter owner name" : "Enter your full name"}
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12"
                  required
                />
              </div>

              {isPartner && (
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Restaurant Name</Label>
                  <Input
                    id="restaurantName"
                    name="restaurantName"
                    type="text"
                    placeholder="Enter restaurant name"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    className="h-12"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{isPartner ? "Restaurant Address" : "Address"}</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder={isPartner ? "Enter restaurant address" : "Enter your address"}
                  value={formData.address}
                  onChange={handleChange}
                  className="h-12"
                  required
                />
              </div>

              {isPartner && (
                <div className="space-y-2">
                  <Label htmlFor="description">Restaurant Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell us about your restaurant, cuisine type, specialties..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                className={`w-full h-12 ${
                  isPartner 
                    ? "bg-gradient-secondary text-secondary-foreground" 
                    : "bg-gradient-primary text-primary-foreground"
                } hover:opacity-90 transition-opacity`}
              >
                {isPartner ? "Register Restaurant" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;