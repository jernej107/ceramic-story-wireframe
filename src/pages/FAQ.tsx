import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes your ceramics unique?",
      answer: "Each piece is handcrafted with care, making every item truly one-of-a-kind. We embrace the natural variations that occur during the ceramic process, celebrating the beauty of handmade artistry. Our pieces showcase unique glazes, textures, and forms that cannot be replicated by mass production."
    },
    {
      question: "How should I care for my ceramic pieces?",
      answer: "Most of our ceramics are dishwasher safe, but we recommend hand washing with mild soap to preserve the beauty and longevity of your pieces. Avoid sudden temperature changes and abrasive cleaners. For decorative pieces, simply dust regularly with a soft cloth."
    },
    {
      question: "What are Second Chance Ceramics?",
      answer: "Second Chance Ceramics are beautiful, functional pieces that have minor aesthetic variations or imperfections that occurred during the firing process. These pieces are fully functional and offer the same quality craftsmanship at a more accessible price point. Each imperfection adds character and makes your piece truly unique."
    },
    {
      question: "Do you offer custom orders?",
      answer: "Yes! We love working on custom projects. Please contact us through our shop to discuss your vision, preferred colors, sizes, and timeline. Custom orders typically take 4-6 weeks depending on the complexity of the piece and our current workload."
    },
    {
      question: "What is your return policy?",
      answer: "We want you to love your ceramic pieces! If you're not completely satisfied, you may return items within 14 days of delivery in their original condition. Please note that custom orders and Second Chance Ceramics are final sale. Contact us to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic orders typically arrive within 5-7 business days. International shipping times vary by location, usually 10-21 business days. All pieces are carefully packaged to ensure safe delivery. You'll receive tracking information once your order ships."
    },
    {
      question: "Are your ceramics food safe?",
      answer: "Yes, all our tableware and functional pieces are made with food-safe glazes and clays that are thoroughly tested. Our pieces are suitable for serving and consuming food and beverages. However, decorative pieces may not be food safe - check the product description or contact us if you're unsure."
    },
    {
      question: "Can I visit your studio?",
      answer: "We occasionally host studio visits and workshops! Follow our journal and social media for announcements about open studio days and upcoming events. We love sharing our creative process with fellow ceramic enthusiasts."
    },
    {
      question: "Do you offer wholesale pricing?",
      answer: "Yes, we work with select retailers and galleries. If you're interested in carrying our work, please reach out through our shop with details about your business. We'll send you our wholesale catalog and terms."
    },
    {
      question: "How do I know which size to choose?",
      answer: "Each product listing includes detailed dimensions and photos showing the piece from multiple angles. We also provide scale references when possible. If you need additional measurements or have questions about a specific piece, feel free to contact us - we're happy to help!"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-foreground hover:text-primary ceramic-transition mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                Frequently Asked
                <span className="block text-primary mt-2">Questions</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Find answers to common questions about our ceramics, orders, and studio practices.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6 bg-white ceramic-shadow"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 ceramic-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're here to help! Reach out to us through our shop and we'll get back to you as soon as possible.
            </p>
            <Button asChild size="lg" className="ceramic-shadow">
              <a href="https://shop.tfstudio.website" target="_blank" rel="noopener noreferrer">
                Contact Us
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
