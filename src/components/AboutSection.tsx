import { useStudioInfo } from "@/hooks/useStudioInfo";
import processImage from "@/assets/ceramic-process.jpg";

const AboutSection = () => {
  const { getSection, loading } = useStudioInfo();
  const aboutInfo = getSection('about');

  const title = aboutInfo?.title || "About TFstudio";
  const content = aboutInfo?.content || "At TFstudio, we believe in the beauty of handmade ceramics. Each piece is carefully crafted with attention to detail, blending traditional techniques with contemporary design. Our passion lies in creating functional art that brings warmth and character to everyday life.";

  return (
    <section id="about" className="py-12 ceramic-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ) : (
                title
              )}
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <p>{content}</p>
              )}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
                <p className="text-muted-foreground">Pieces Created</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">5</h3>
                <p className="text-muted-foreground">Years of Craft</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={processImage}
                alt="Ceramic artist working at pottery wheel"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl ceramic-shadow"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-foreground/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;