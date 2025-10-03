import processImage from "@/assets/ceramic-process.jpg";
import { useStudioInfo } from "@/lib/hooks/useStudioInfo";
import { getDirectusImageUrl } from "@/lib/directus";

const AboutSection = () => {
  const { data: studioInfo, isLoading } = useStudioInfo();

  const aboutTitle = studioInfo?.about_title || "About TFstudio";
  const aboutDescription = studioInfo?.about_description || "Founded with a passion for handmade ceramics, TFstudio is more than just a pottery studio – it's a celebration of the ancient art of ceramics in the modern world.";
  const aboutImageUrl = studioInfo?.about_image ? getDirectusImageUrl(studioInfo.about_image) : processImage;
  const piecesCreated = studioInfo?.pieces_created || "500+";
  const yearsExperience = studioInfo?.years_experience || "5";

  if (isLoading) {
    return (
      <section className="py-12" style={{ backgroundColor: 'hsl(38 96% 91%)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-12" style={{ backgroundColor: 'hsl(38 96% 91%)' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(21 81% 54%)' }}>
              {aboutTitle}
            </h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'hsl(21 81% 54%)' }}>
              <p>{aboutDescription}</p>
              <p>
                Every piece that emerges from our kilns carries the mark of human hands, the 
                unpredictability of fire, and the story of clay transformed. We believe in the 
                beauty of imperfection, the warmth of handmade objects, and the joy of creating 
                functional art for everyday life.
              </p>
              <p>
                Our studio is a place where traditional techniques meet contemporary design, 
                where each ceramic piece is born from a dialogue between the potter, the clay, 
                and the creative spirit that guides our hands.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-2" style={{ color: 'hsl(21 81% 54%)' }}>{piecesCreated}</h3>
                <p style={{ color: 'hsl(21 81% 54%)' }}>Pieces Created</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2" style={{ color: 'hsl(21 81% 54%)' }}>{yearsExperience}</h3>
                <p style={{ color: 'hsl(21 81% 54%)' }}>Years of Craft</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={aboutImageUrl}
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