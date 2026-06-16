"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService, AuthError } from "@/services/auth.service";

function mapAuthMessage(msg: string): string {
  if (msg === "blocked") return "Conta aguardando ativação pelo administrador.";
  if (msg === "inactive")
    return "Conta inativa. Entre em contato com o administrador.";
  if (msg === "Credenciais inválidas") return "E-mail ou senha incorretos.";
  return msg;
}

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      sessionStorage.setItem("admin_token", data.token);
      router.push(data.redirect);
    } catch (err) {
      if (err instanceof AuthError) {
        setErrors(err.messages.map(mapAuthMessage));
      } else {
        setErrors(["Erro inesperado. Tente novamente."]);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    loading,
    handleSubmit,
  };
}
