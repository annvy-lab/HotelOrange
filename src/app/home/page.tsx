"use client";
import NavBar from "@/components/shared/home/navbar";
import BannerHome from "@/components/shared/home/banner-home";
import SearchCard from "@/components/shared/home/search-card/page";
import RoomCard from "@/components/shared/home/room-card/page";
import Footer from "@/components/shared/footer";

export default function Dashboard() {
  return (
    <div className="max-w-screen min-h-screen">
      <div className="max-w-screen min-h-screen px-4 md:px-10 py-24 pb-0">
        <NavBar />
        <BannerHome />
        {/* <SearchCard /> */}
        <h1 className="text-3xl font-bold mb-10 ml-6">Nossos Quartos</h1>
        <RoomCard />
      </div>
      <Footer />
    </div>
  );
}
