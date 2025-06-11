"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!user) router.push("/signin");
    else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Preencha nome e email corretamente.");
      return;
    }
    try {
      await updateProfile({ nome: name, email });
      toast.success("Perfil atualizado com sucesso!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao atualizar perfil.");
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast("Logout realizado!");
    router.push("/signin");
  };

  const hasChanged = !!user && (name !== user.name || email !== user.email);

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
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
          />
          {hasChanged && (
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Salvar Alterações
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-4/12 flex gap-2 items-center hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut /> Logout
          </Button>
        </form>
      </Card>
    </div>
  );
}