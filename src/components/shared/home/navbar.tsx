"use client";
import Link from "next/link";
import { ShoppingBag, Menu, CircleUserRound, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateCartCount = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(storedCart.length);
      };

      updateCartCount();

      window.addEventListener("storage", updateCartCount);

      const interval = setInterval(updateCartCount, 1000);

      return () => {
        window.removeEventListener("storage", updateCartCount);
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 p-4 md:p-5 px-6 md:px-16 w-screen max-w-full flex justify-between items-center z-50 bg-background shadow-xs">
      <a href="/home" className="w-fit flex items-center gap-2">
        <div className="h-4 w-4 bg-primary rounded-full">
          <br />
        </div>
        <div className="h-2 w-20 bg-primary rounded-xl">
          <br />
        </div>
      </a>
      <div className="w-fit flex items-center gap-4">
        <Link href="/cart" className="relative">
          <ShoppingBag strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              {cartCount}
            </span>
          )}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Menu size={28} strokeWidth={1.4} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href="/auth/profile" passHref>
              <DropdownMenuItem className="flex gap-2 items-center">
                <CircleUserRound strokeWidth={2} className="text-foreground" />
                Perfil
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/cart" passHref>
              <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                <ShoppingBag
                  size={17}
                  strokeWidth={2}
                  className="text-foreground"
                />
                Carrinho
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="flex gap-2 items-center">
              <List size={17} strokeWidth={2} className="text-foreground" />
              Minhas Reservas
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2 items-center text-red-600 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("loggedUser");
                router.push("/auth/signin");
              }}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
