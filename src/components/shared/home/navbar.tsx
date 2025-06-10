"use client";
import Link from "next/link";
import { ShoppingBag, Menu, CircleUserRound, List, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <div className="w-fit flex items-center gap-6">
        <Link href="/cart" className="relative flex items-center gap-1 text-sm">
          <ShoppingBag strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link
          href="/my-reservations"
          className="relative flex items-center gap-1 text-sm"
        >
          <Moon strokeWidth={1.5} />
        </Link>
        <Link
          href="/auth/profile"
          className="relative flex items-center gap-1 text-sm"
        >
          <CircleUserRound strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
