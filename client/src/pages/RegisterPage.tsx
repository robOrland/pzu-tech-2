import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await authService.register({
                name,
                email,
                password,
                role: 'CITIZEN'
            });
            // Após o registro, podemos logar automaticamente ou redirecionar para o login
            // O authService.register já retorna o token? Vamos conferir o service.
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.error || "Falha ao criar conta. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <form onSubmit={handleRegister}>
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-3xl font-bold">Criar Conta</CardTitle>
                        <CardDescription>
                            Junte-se à Zeladoria Urbana e ajude a sua cidade.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {error && (
                            <div className="p-3 text-sm text-white bg-red-500 rounded-md animate-pulse">
                                {error}
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Ex: João Silva"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="exemplo@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full h-11 text-lg font-semibold" type="submit" disabled={loading}>
                            {loading ? "Criando conta..." : "Registrar"}
                        </Button>
                        <p className="text-sm text-center text-slate-500">
                            Já tem uma conta?{" "}
                            <Link to="/" className="text-primary font-semibold hover:underline">
                                Acesse aqui
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;
