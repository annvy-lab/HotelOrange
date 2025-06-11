"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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
    if (!loggedUser) return;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (
      users.some(
        (user: any) => user.email === email && user.email !== loggedUser.email
      )
    ) {
      setError("E-mail já cadastrado por outro usuário.");
      return;
    }

    users = users.map((user: any) =>
      user.email === loggedUser.email
        ? { ...user, name, email, password }
        : user
    );
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({ name, email, password })
    );
    setSuccess(true);
    setError("");
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-3">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-8">

              <button
          className="flex items-center gap-2 mb-4"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          <span className="text-lg font-semibold">Voltar</span>
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
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
          {success && (
            <p className="text-green-600 text-center">
              Dados atualizados com sucesso!
            </p>
          )}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}