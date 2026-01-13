import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, LayoutDashboard, PlusCircle, User, Shield, Menu, X } from "lucide-react";
import { authService } from "@/services/auth.service";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentUser = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-xl">P</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 truncate">PZU Tech</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link to="/dashboard">
                                <Button variant="ghost" className="flex items-center gap-2 font-medium">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Link to="/report">
                                <Button variant="ghost" className="flex items-center gap-2 font-medium">
                                    <PlusCircle className="w-4 h-4" />
                                    Novo Chamado
                                </Button>
                            </Link>
                            {currentUser?.role === 'ADMIN' && (
                                <Link to="/admin">
                                    <Button variant="ghost" className="flex items-center gap-2 text-primary font-bold">
                                        <Shield className="w-4 h-4" />
                                        Painel Admin
                                    </Button>
                                </Link>
                            )}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2 text-sm">
                            <span className="font-semibold text-slate-900 leading-tight">{currentUser?.name || 'Cidadão'}</span>
                            <span className="text-slate-500 text-xs">{currentUser?.role}</span>
                        </div>
                        <div className="hidden sm:flex gap-2">
                            <Button variant="outline" size="icon" className="rounded-full shrink-0">
                                <User className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair" className="shrink-0">
                                <LogOut className="w-5 h-5 text-slate-500 hover:text-red-500 transition-colors" />
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-slate-100 bg-white animate-in slide-in-from-top duration-200">
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg sm:hidden mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                    <User className="w-6 h-6 text-slate-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{currentUser?.name}</p>
                                    <p className="text-xs text-slate-500">{currentUser?.email}</p>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-1">
                                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-base font-medium">
                                        <LayoutDashboard className="w-5 h-5 text-slate-500" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Link to="/report" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-base font-medium">
                                        <PlusCircle className="w-5 h-5 text-slate-500" />
                                        Novo Chamado
                                    </Button>
                                </Link>
                                {currentUser?.role === 'ADMIN' && (
                                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-base font-bold text-primary">
                                            <Shield className="w-5 h-5" />
                                            Painel Admin
                                        </Button>
                                    </Link>
                                )}
                                <div className="pt-2 border-t border-slate-100 mt-2">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-4 h-12 text-base text-red-500 font-medium"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Sair da Conta
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
                {children}
            </main>

            <footer className="footer-bg-white border-t border-slate-200 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="bg-slate-900 w-6 h-6 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-xs">P</span>
                            </div>
                            <span className="font-bold tracking-tight text-slate-900">PZU Tech</span>
                        </div>
                        <p className="text-sm text-slate-500">
                            &copy; 2026 PZU Tech - Plataforma de Zeladoria Urbana. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

