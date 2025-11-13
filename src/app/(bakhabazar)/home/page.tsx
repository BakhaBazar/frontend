import { podcast } from "@/types/models/podcast";
import HomeMain from "@/components/home/home-main";
import SpotlightSlider from "@/components/home/image-slider";
import Footer from "@/components/layout/footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

export default async function Home() {
  let rows: podcast[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/story/?number=20`, {
      next: { revalidate: 30 }
    });
    rows = await res.json();
  } catch (error) {
    console.log("Backend is not working: " + error);
  }

  return (
    <div className="lg:col-span-2 flex flex-col gap-6 min-w-[300px] h-[calc(100vh-16rem)] overflow-y-auto scroll-smooth no-scroll mt-3 lg:mt-0">
      <HomeMain
        rows={rows || []}
        type="story"
      />

      <SpotlightSlider />

      <Footer />
    </div>
  );
}