import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">TFstudio</h1>
            <span className="text-sm text-muted-foreground hidden sm:block">ceramic art</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#featured" className="text-foreground hover:text-primary ceramic-transition">
              Featured
            </a>
            <a href="#journal" className="text-foreground hover:text-primary ceramic-transition">
              Journal
            </a>
            <a href="#about" className="text-foreground hover:text-primary ceramic-transition">
              About
            </a>
            <a href="#second-chance" className="text-foreground hover:text-primary ceramic-transition">
              Second Chance
            </a>
            <Button asChild variant="default" className="ceramic-shadow">
              <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                Shop
              </a>
            </Button>
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
              <a href="#featured" className="text-foreground hover:text-primary ceramic-transition">
                Featured
              </a>
              <a href="#journal" className="text-foreground hover:text-primary ceramic-transition">
                Journal
              </a>
              <a href="#about" className="text-foreground hover:text-primary ceramic-transition">
                About
              </a>
              <a href="#second-chance" className="text-foreground hover:text-primary ceramic-transition">
                Second Chance
              </a>
              <Button asChild variant="default" className="w-fit ceramic-shadow">
                <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                  Shop
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;