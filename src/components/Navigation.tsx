import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background sticky top-0 z-50 w-full border-b border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-end justify-between pb-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="TFStudio Logo" className="h-16 w-16 hover:opacity-80 ceramic-transition" style={{ filter: 'brightness(0) saturate(100%) invert(41%) sepia(90%) saturate(2078%) hue-rotate(201deg) brightness(97%) contrast(93%)' }} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/journal" className="text-foreground hover:text-foreground/80 transition-colors font-medium text-sm uppercase tracking-wider">
              Journal
            </Link>
            <Link to="/about" className="text-foreground hover:text-foreground/80 transition-colors font-medium text-sm uppercase tracking-wider">
              About
            </Link>
            <Link to="/second-chance" className="text-foreground hover:text-foreground/80 transition-colors font-medium text-sm uppercase tracking-wider">
              Second Chance
            </Link>
            <a 
              href="https://shop.tfstudio.website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground/80 transition-colors font-medium text-sm uppercase tracking-wider"
            >
              Shop
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-foreground/80 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20">
            <div className="flex flex-col space-y-4">
              <Link to="/journal" className="text-foreground hover:text-foreground/80 ceramic-transition font-medium text-sm uppercase tracking-wide">
                Journal
              </Link>
              <Link to="/about" className="text-foreground hover:text-foreground/80 ceramic-transition font-medium text-sm uppercase tracking-wide">
                About
              </Link>
              <Link to="/second-chance" className="text-foreground hover:text-foreground/80 ceramic-transition font-medium text-sm uppercase tracking-wide">
                Second Chance
              </Link>
              <a 
                href="https://shop.tfstudio.website" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-foreground/80 ceramic-transition font-medium text-sm uppercase tracking-wide w-fit"
              >
                Shop
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;