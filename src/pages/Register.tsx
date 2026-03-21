import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { motion } from "framer-motion";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-card border border-border rounded-2xl p-8 relative z-10"
      >
        <Link to="/" className="flex items-center gap-2.5 mb-10 justify-center">
          <span className="font-bold text-xl">NewsFlow</span>
        </Link>

        <h1 className="text-2xl font-bold mb-2 text-center">Crie sua conta</h1>
        <p className="text-muted-foreground mb-8 text-center text-sm">
          Comece sua newsletter profissional em minutos.
        </p>

        <button className="w-full flex items-center justify-center gap-3 border border-border rounded-lg h-11 text-sm font-medium hover:bg-secondary transition-colors mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar com Google
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">Nome completo</Label>
            <div className="relative">
              <Input id="name" placeholder="Seu nome" className="h-11 rounded-lg pl-10 bg-secondary border-border focus:border-accent" />
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">E-mail</Label>
            <div className="relative">
              <Input id="email" type="email" placeholder="seu@email.com" className="h-11 rounded-lg pl-10 bg-secondary border-border focus:border-accent" />
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-muted-foreground">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 caracteres"
                className="h-11 rounded-lg pr-10 bg-secondary border-border focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">Criar conta grátis</Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tem conta?{" "}
          <Link to="/login" className="text-accent hover:text-accent-hover font-medium">Entrar</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
