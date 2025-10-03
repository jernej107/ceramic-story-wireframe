import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="TFStudio Logo" className="h-16 w-16 hover:opacity-80 ceramic-transition" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/journal" className="text-white hover:text-white/80 transition-colors font-medium text-sm uppercase tracking-wider">
              Journal
            </Link>
            <Link to="/about" className="text-white hover:text-white/80 transition-colors font-medium text-sm uppercase tracking-wider">
              About
            </Link>
            <Link to="/second-chance" className="text-white hover:text-white/80 transition-colors font-medium text-sm uppercase tracking-wider">
              Second Chance
            </Link>
            <a 
              href="https://shop.tfstudio.website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors font-medium text-sm uppercase tracking-wider"
            >
              Shop
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-white/5 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <Link to="/journal" className="text-white hover:text-white/80 ceramic-transition font-medium text-sm uppercase tracking-wide">
                Journal
              </Link>
              <Link to="/about" className="text-white hover:text-white/80 ceramic-transition font-medium text-sm uppercase tracking-wide">
                About
              </Link>
              <Link to="/second-chance" className="text-white hover:text-white/80 ceramic-transition font-medium text-sm uppercase tracking-wide">
                Second Chance
              </Link>
              <a 
                href="https://shop.tfstudio.website" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 ceramic-transition font-medium text-sm uppercase tracking-wide w-fit"
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