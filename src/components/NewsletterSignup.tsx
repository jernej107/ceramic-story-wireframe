import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email,
          name: name || null,
          source: 'website'
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter."
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter."
        });
        
        // Reset form
        setEmail('');
        setName('');
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Mail className="w-12 h-12 text-background/80" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for studio updates, new collection launches, 
            and behind-the-scenes stories from the ceramic world.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
              <Label htmlFor="newsletter-name" className="sr-only">Name (optional)</Label>
              <Input
                id="newsletter-name"
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="newsletter-email" className="sr-only">Email address</Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background text-foreground"
              />
            </div>
            <Button 
              type="submit" 
              variant="outline"
              className="w-full border-background text-background hover:bg-background hover:text-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
            </Button>
          </form>
          
          <p className="text-sm text-background/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;