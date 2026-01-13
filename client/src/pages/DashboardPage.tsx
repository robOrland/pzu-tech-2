import { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ticketService } from "@/services/ticket.service";
import type { Ticket } from "@/services/ticket.service";

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

const DashboardPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketService.getMyTickets();
        setTickets(data);
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status !== "RESOLVIDO").length;
  const resolvedTickets = tickets.filter(t => t.status === "RESOLVIDO").length;

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Seus Chamados</h1>
            <p className="text-slate-500">Acompanhe o andamento das suas solicitações de zeladoria.</p>
          </div>
          <Button onClick={() => navigate("/report")} className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
            <Plus className="w-5 h-5" />
            Novo Chamado
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden group hover:border-primary/50 transition-all">
            <CardHeader className="pb-2 space-y-0">
              <CardDescription className="text-xs uppercase font-bold tracking-wider">Total de Chamados</CardDescription>
              <CardTitle className="text-3xl font-black">{totalTickets}</CardTitle>
            </CardHeader>
            <div className="h-1 w-full bg-slate-100 mt-2">
              <div className="h-full bg-slate-900 w-full opacity-10" />
            </div>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden group hover:border-amber-200 transition-all">
            <CardHeader className="pb-2 space-y-0">
              <CardDescription className="text-xs uppercase font-bold tracking-wider">Em Aberto</CardDescription>
              <CardTitle className="text-3xl font-black text-amber-600">{openTickets}</CardTitle>
            </CardHeader>
            <div className="h-1 w-full bg-amber-50 mt-2">
              <div className="h-full bg-amber-500 w-[66%] opacity-30" />
            </div>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden group hover:border-emerald-200 transition-all">
            <CardHeader className="pb-2 space-y-0">
              <CardDescription className="text-xs uppercase font-bold tracking-wider">Resolvidos</CardDescription>
              <CardTitle className="text-3xl font-black text-emerald-600">{resolvedTickets}</CardTitle>
            </CardHeader>
            <div className="h-1 w-full bg-emerald-50 mt-2">
              <div className="h-full bg-emerald-500 w-[33%] opacity-30" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-slate-900">Histórico Recente</h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-tighter">
              {tickets.length} itens
            </span>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 mb-6 font-medium">Você ainda não possui nenhum chamado registrado.</p>
              <Button onClick={() => navigate("/report")} variant="default" className="px-8 shadow-lg shadow-primary/20">
                Criar meu primeiro chamado
              </Button>
            </div>
          ) : (
            tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:border-primary/50 transition-all cursor-pointer group shadow-sm hover:shadow-md active:scale-[0.99]" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-5 sm:p-6 flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">
                          {ticket.category}
                        </span>
                        {getStatusBadge(ticket.status)}
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                          {ticket.description}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-slate-500">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            <span className="truncate">{ticket.address}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 sm:w-16 flex items-center justify-center border-t sm:border-t-0 sm:border-l border-slate-200 group-hover:bg-primary/5 transition-colors p-4 sm:p-0">
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;

