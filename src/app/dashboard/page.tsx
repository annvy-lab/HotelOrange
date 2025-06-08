import NavBar from "@/components/shared/home/navbar";
import BannerHome from "@/components/shared/home/banner-home";
import SearchCard from "@/components/shared/home/search-card/page";
import RoomCard from "@/components/shared/home/room-card/page";

export default function Dashboard() {
  return (
    <div className="max-w-screen min-h-full p-8 md:px-16">
      <NavBar />
      <BannerHome />
      <SearchCard />
      <RoomCard />
    </div>
  );
}
