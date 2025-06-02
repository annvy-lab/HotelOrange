import { Button } from "@/components/ui/button";
export default function BannerHome() {
  return (
    <div className="flex flex-col md:items-center">
      <div className="w-full h-30 md:h-[70vh] md:mb-14 mt-8 flex justify-center gap-1 items-center md:gap-20">
        <div className="flex flex-col md:gap-6">
          <h1 className="text-[2.4rem] md:text-6xl font-abhaya-extrabold whitespace-nowrap leading-none">
            Sua jornada <br className="flex md:hidden" />
            começa aqui...
          </h1>
          <p className="hidden md:flex text-base md:text-xl font-medium mt-[-1rem] tracking-wide whitespace-nowrap ml-[-0.6rem]">
            - Reserve o conforto que você merece!
          </p>
          <a href="#rooms" className="hidden md:flex w-4/12 mt-[-0.5rem]">
          <Button className="w-full rounded-full cursor-pointer">Visualizar Quartos</Button>
          </a>
        </div>
        <img
          src="/figureHome.svg"
          alt="Figura de Hotéis"
          className="h-24 md:h-46 mb-8"
        />
      </div>
      <p className="md:hidden text-base font-medium mt-[-1rem] tracking-wide whitespace-nowrap ml-[-0.6rem]">
        - Reserve o conforto que você merece!
      </p>
    </div>
  );
}
