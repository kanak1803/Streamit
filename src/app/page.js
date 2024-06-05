import HomeVideoSection from "./component/HomeVideoSection";
import VideoPlayer from "./component/VideoPlayer";

export default function Home() {
  return (
    <main className="flex  items-center justify-center min-h-screen w-full p-4 md:p-8 ">
      <div>
        <HomeVideoSection />
      </div>
    </main>
  );
}
