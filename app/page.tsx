import MusicPromo from "@/components/music-promo";


export default function Home() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-1/2">
        <MusicPromo />
      </div>
      <div className="w-1/2">
      </div>
    </div>
  );
}
