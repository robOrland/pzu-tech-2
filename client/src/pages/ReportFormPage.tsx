import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Send, ArrowLeft } from "lucide-react";
import { ticketService } from "@/services/ticket.service";

const ReportFormPage = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await ticketService.create({
        category,
        description,
        address,
        photoUrl: null, // TODO: Implement upload
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Ocorreu um erro ao enviar o relato.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex px-1 sm:px-0">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary p-0 h-auto font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        <Card className="shadow-xl border-slate-200 overflow-hidden rounded-2xl">
          <CardHeader className="bg-primary/5 border-b border-slate-100 p-6 sm:p-8">
            <CardTitle className="text-xl sm:text-2xl text-slate-900 font-black">Relatar Novo Problema</CardTitle>
            <CardDescription className="text-sm font-medium">
              Forneça os detalhes do problema urbano para que possamos encaminhar à prefeitura.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 p-6 sm:p-8">
              {error && (
                <div className="p-3 text-sm text-white bg-red-500 rounded-lg animate-in fade-in zoom-in duration-200">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-sm font-bold uppercase tracking-wider text-slate-500">Categoria</Label>
                <select
                  id="category"
                  className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Iluminação Pública">Iluminação Pública</option>
                  <option value="Vias Públicas">Vias Públicas (Buracos, Calçadas)</option>
                  <option value="Limpeza Urbana">Limpeza Urbana / Lixo</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-bold uppercase tracking-wider text-slate-500">Descrição do Problema</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o problema encontrado..."
                  className="min-h-[120px] rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address" className="text-sm font-bold uppercase tracking-wider text-slate-500">Endereço / Localização</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="address"
                    placeholder="Rua, Número, Bairro..."
                    className="pl-12 h-12 rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">Foto (Opcional)</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-primary/50 transition-all cursor-pointer group">
                  <Camera className="w-10 h-10 text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all mb-3" />
                  <span className="text-sm text-slate-900 font-bold">Clique para capturar ou anexar</span>
                  <span className="text-xs text-slate-500 mt-1">PNG, JPG até 5MB</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 sm:p-8 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
              <Button type="button" variant="outline" className="w-full sm:w-auto h-12 rounded-xl font-bold" onClick={() => navigate("/dashboard")} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-10 rounded-xl font-bold shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? "Enviando..." : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Relato
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReportFormPage;

