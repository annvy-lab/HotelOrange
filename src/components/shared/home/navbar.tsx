import { ShoppingBag, Menu, CircleUserRound, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-fit flex items-center gap-2">
        <div className="h-4 w-4 bg-primary rounded-full">
          <br />
        </div>
        <div className="h-2 w-20 bg-primary rounded-xl">
          <br />
        </div>
      </div>
      <div className="w-fit flex items-center gap-4">
        <ShoppingBag strokeWidth={1.5} />
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Menu size={28} strokeWidth={1.4} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex gap-2 items-center">
              <CircleUserRound
                strokeWidth={2}
                className="text-foreground"
              />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 items-center">
              <ShoppingBag
                size={17}
                strokeWidth={2}
                className="text-foreground"
              />
              Carrinho
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 items-center">
              <List size={17} strokeWidth={2} className="text-foreground" />
              Minhas Reservas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
