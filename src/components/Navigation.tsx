import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-end justify-between pb-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-primary font-display">TFstudio</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#featured" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
              Featured
            </a>
            <a href="#journal" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
              Journal
            </a>
            <a href="#about" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
              About
            </a>
            <a href="#second-chance" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
              Second Chance
            </a>
            <a 
              href="https://shop.tfstudio.website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide"
            >
              Shop
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary ceramic-transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col space-y-4">
              <a href="#featured" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
                Featured
              </a>
              <a href="#journal" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
                Journal
              </a>
              <a href="#about" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
                About
              </a>
              <a href="#second-chance" className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide">
                Second Chance
              </a>
              <a 
                href="https://shop.tfstudio.website" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary ceramic-transition font-medium text-sm uppercase tracking-wide w-fit"
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