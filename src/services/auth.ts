import { api } from "@/lib/api";

export interface SignInDTO { email: string; senha: string }
export interface SignUpDTO { nome: string; email: string; senha: string }
export interface AuthTokens { accessToken: string; user: { name: string; email: string } }

export async function signIn(dto: SignInDTO): Promise<AuthTokens> {
  const response = await api.post("/auth/signin", dto);
  return {
    accessToken: response.data.token,
    user: {
      name: response.data.cliente.nome,
      email: response.data.cliente.email,
    },
  };
}

export async function signUp(dto: SignUpDTO): Promise<AuthTokens> {
  const response = await api.post("/auth/signup", dto);
  return {
    accessToken: response.data.token,
    user: {
      name: response.data.cliente.nome,
      email: response.data.cliente.email,
    },
  };
}
