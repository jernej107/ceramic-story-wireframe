import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent border-t border-primary/20">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-primary/20">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-accent-foreground">
              Stay Connected
            </h3>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Subscribe to our newsletter for studio updates, new collections, and exclusive ceramic insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="flex-1 border-primary/30"
                type="email"
              />
              <Button className="bg-[hsl(var(--button-dark))] text-[hsl(var(--button-dark-foreground))] hover:bg-[hsl(var(--button-dark))]/90 ceramic-shadow">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h4 className="text-2xl font-bold text-primary mb-4">TFstudio</h4>
              <p className="text-foreground/70 mb-6 leading-relaxed max-w-md">
                Handcrafted ceramic art that brings warmth and character to your home. 
                Each piece tells a story of craftsmanship and creativity.
              </p>
              <div className="flex space-x-4">
                <Button size="icon" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Instagram size={20} />
                </Button>
                <Button size="icon" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Mail size={20} />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold text-foreground mb-4">Quick Links</h5>
              <ul className="space-y-3 text-foreground/70">
                <li><a href="#featured" className="hover:text-primary ceramic-transition">Featured</a></li>
                <li><a href="#journal" className="hover:text-primary ceramic-transition">Journal</a></li>
                <li><a href="#about" className="hover:text-primary ceramic-transition">About</a></li>
                <li><a href="#second-chance" className="hover:text-primary ceramic-transition">Second Chance</a></li>
                <li>
                  <a 
                    href="https://shop.tfstudio.website" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary ceramic-transition"
                  >
                    Shop
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-lg font-semibold text-foreground mb-4">Contact</h5>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="text-sm">Artisan District</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="text-sm">hello@tfstudio.website</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/70">
              © 2024 TFstudio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-foreground/70">
              <a href="#" className="hover:text-primary ceramic-transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary ceramic-transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;