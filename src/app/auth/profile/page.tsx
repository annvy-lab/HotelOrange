"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
    if (!loggedUser) {
      router.push("/auth/signin");
      return;
    }
    setName(loggedUser.name);
    setEmail(loggedUser.email);
    setPassword(loggedUser.password);
  }, [router]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
    if (!loggedUser) {
      toast.error("Usuário não autenticado.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Verifica se o novo e-mail já existe para outro usuário
    const emailExistente = users.some(
      (user: any) => user.email === email && user.email !== loggedUser.email
    );

    if (emailExistente) {
      toast.error("E-mail já cadastrado por outro usuário.");
      return;
    }

    // Atualiza usuário na lista
    users = users.map((user: any) =>
      user.email === loggedUser.email
        ? { ...user, name, email, password }
        : user
    );
    localStorage.setItem("users", JSON.stringify(users));

    // Atualiza usuário logado
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({ name, email, password })
    );

    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-3">
      <Card className="bg-card rounded-3xl shadow-xl w-full max-w-sm p-8">
        <Button
          variant="ghost"
          className="w-3/12 flex items-center gap-2"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-base font-semibold">Voltar</span>
        </Button>

        <h2 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4 pb-0">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
          />
          <Button type="submit" className="w-full">
            Salvar Alterações
          </Button>
          <Button
            variant="ghost"
            className="w-4/12 flex gap-2 items-center hover:text-red-700 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("loggedUser");
              toast("Logout realizado!");
              router.push("/auth/signin");
            }}
          >
            <LogOut />
            Logout
          </Button>
        </form>
      </Card>
    </div>
  );
}
