'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    
    localStorage.setItem("loggedUser", JSON.stringify(user));
    setError("");
    router.push("/dashboard"); // Redireciona para a home ou outra página desejada
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 p-3">
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="relative h-30 sm:h-45 md:h-50 lg:h-45 xl:h-50"> 
          <img
            src="/imageLogin.svg"
            alt="Hotel Building"
            className="absolute inset-0 w-full h-full object-cover object-center rounded-t-3xl"
          />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              <path d="M19.34 9.34l-1.41-1.41a1 1 0 00-1.41 0l-1.41 1.41a1 1 0 000 1.41l1.41 1.41a1 1 0 001.41 0l1.41-1.41a1 1 0 000-1.41z" />
            </svg>
          </div>
        </div>

        <div className="pt-16 pb-7 px-5 bg-white rounded-b-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 mt-1">
            Login
          </h2>
          <form onSubmit={handleSignin} className="space-y-3"> 
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                placeholder="email@gmail.com" 
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                placeholder="••••••••••••"
              />
            </div>
            <div className='text-center'>
                <button
                type="submit"
                className=" w-30 bg-orange-500 text-white text-center font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md"
                >
                Entrar
                </button>
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}

          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem conta?{' '}
            <a href="/auth/signup" className="text-orange-500 hover:underline font-semibold">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}