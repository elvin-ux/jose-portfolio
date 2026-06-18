import HeroSection from "@/components/Hero/HeroSection";
import StoriesGallery from "@/components/Gallery/StoriesGallery";
import AboutSection from "@/components/About/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StoriesGallery />
      <AboutSection />
    </main>
  );
}
