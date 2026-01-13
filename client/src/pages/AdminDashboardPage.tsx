import { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, CheckCircle, RefreshCw } from "lucide-react";
import { adminService } from "@/services/admin.service";
import type { Ticket } from "@/services/ticket.service";
import type { User as UserType } from "@/services/auth.service";

const getStatusBadge = (status: string) => {
    switch (status) {
        case "PENDENTE":
            return <Badge variant="warning">Pendente</Badge>;
        case "EM_ANALISE":
            return <Badge variant="secondary">Em Análise</Badge>;
        case "RESOLVIDO":
            return <Badge variant="success">Resolvido</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

const AdminDashboardPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"tickets" | "users">("tickets");

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "tickets") {
                const data = await adminService.getAllTickets();
                setTickets(data);
            } else {
                const data = await adminService.getAllUsers();
                setUsers(data);
            }
        } catch (error) {
            console.error("Erro ao buscar dados administrativos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await adminService.updateTicketStatus(id, newStatus);
            const updatedTickets = tickets.map(t =>
                t.id === id ? { ...t, status: newStatus as any } : t
            );
            setTickets(updatedTickets);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel Administrativo</h1>
                    <p className="text-slate-500">Gerencie todos os chamados e usuários do sistema.</p>
                </div>

                <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-4 border-b border-slate-200 min-w-max">
                        <button
                            onClick={() => setActiveTab("tickets")}
                            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === "tickets" ? "text-primary" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Todos os Chamados
                            {activeTab === "tickets" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                        </button>
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === "users" ? "text-primary" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Usuários
                            {activeTab === "users" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                        </button>
                    </div>
                </div>

                {activeTab === "tickets" ? (
                    <div className="grid grid-cols-1 gap-4">
                        {loading ? (
                            <p className="text-center py-10 text-slate-500">Carregando chamados...</p>
                        ) : tickets.length === 0 ? (
                            <p className="text-center py-20 bg-slate-50 rounded-lg text-slate-500">Nenhum chamado encontrado.</p>
                        ) : (
                            tickets.map((ticket) => (
                                <Card key={ticket.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="p-4 sm:p-6 flex-1 space-y-4">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
                                                        {ticket.category}
                                                    </span>
                                                    {getStatusBadge(ticket.status)}
                                                </div>
                                                <div>
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{ticket.description}</h3>
                                                    <div className="flex flex-col sm:flex-row flex-wrap gap-y-2 gap-x-4 mt-3 text-xs sm:text-sm text-slate-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                            <span className="truncate">{ticket.address}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                            {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                                            <span className="truncate">Cidadão: {ticket.userId.split('-')[0]}...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 p-4 sm:p-6 md:w-56 border-t md:border-t-0 md:border-l border-slate-200 flex flex-row md:flex-col justify-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 gap-2 h-10 sm:h-9 bg-white"
                                                    onClick={() => handleUpdateStatus(ticket.id, "EM_ANALISE")}
                                                    disabled={ticket.status === "EM_ANALISE"}
                                                >
                                                    <RefreshCw className={`w-3.5 h-3.5 ${ticket.status === "EM_ANALISE" ? "" : "animate-spin-slow"}`} />
                                                    <span className="md:hidden lg:inline">Analisar</span>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 gap-2 h-10 sm:h-9 bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 hover:text-emerald-700"
                                                    onClick={() => handleUpdateStatus(ticket.id, "RESOLVIDO")}
                                                    disabled={ticket.status === "RESOLVIDO"}
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    <span className="md:hidden lg:inline">Resolver</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Tablet/Desktop Table */}
                        <div className="hidden sm:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Função</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-slate-400">Carregando usuários...</td>
                                        </tr>
                                    ) : users.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-slate-400">Nenhum usuário encontrado.</td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <Badge variant={user.role === 'ADMIN' ? 'default' : 'outline'} className="font-bold">
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile User Cards */}
                        <div className="sm:hidden space-y-3">
                            {users.map((user) => (
                                <Card key={user.id} className="border-slate-200 shadow-sm">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                            <Badge variant={user.role === 'ADMIN' ? 'default' : 'outline'} className="scale-90 origin-top-right font-bold">
                                                {user.role}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-semibold">
                                            <Clock className="w-3 h-3" />
                                            Desde {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default AdminDashboardPage;
