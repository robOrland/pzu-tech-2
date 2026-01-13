# PZU (Plataforma de Zeladoria Urbana) - MVP

Este projeto é uma GovTech focada em permitir que cidadãos reportem problemas urbanos diretamente para a prefeitura, facilitando a gestão e manutenção da infraestrutura municipal.

## 🚀 Tecnologias

O projeto utiliza uma stack moderna e de alta performance:

### Backend
- **Bun**: Runtime e gerenciador de pacotes.
- **ElysiaJS**: Framework web rápido e focado em produtividade.
- **Prisma**: ORM para modelagem e acesso ao banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Clean Architecture**: Estrutura orientada a domínio, desacoplada e testável.

### Frontend
- **React (Vite)**: Framework principal com TypeScript.
- **Tailwind CSS**: Estilização responsiva e moderna.
- **Shadcn/UI**: Biblioteca de componentes acessíveis.
- **Axios**: Comunicação eficiente com a API.
- **Lucide React**: Ícones premium.

## 📁 Estrutura do Projeto

```text
/
├── client/          # Frontend (React + Vite)
├── prisma/          # Schemas e migrações do banco de dados
├── src/             # Backend (ElysiaJS)
│   ├── application/ # Casos de uso
│   ├── domain/      # Entidades e interfaces
│   ├── infrastructure/ # Implementações (DB, Repositórios)
│   └── presentation/   # Controladores e Rotas
└── index.ts         # Ponto de entrada do servidor
```

## 🛠️ Como Executar

### Pré-requisitos
- [Bun](https://bun.sh/) instalado.
- Banco de dados PostgreSQL rodando.

### Passo 1: Configuração do Backend
1. Na raiz do projeto, instale as dependências:
   ```bash
   bun install
   ```
2. Configure o arquivo `.env` com sua `DATABASE_URL`.
3. Gere o cliente Prisma e rode as migrações:
   ```bash
   bun run db:generate
   bun run deploy
   ```
4. Inicie o servidor:
   ```bash
   bun dev
   ```

### Passo 2: Configuração do Frontend
1. Entre na pasta `client`:
   ```bash
   cd client
   bun install
   ```
2. Inicie o ambiente de desenvolvimento:
   ```bash
   bun dev
   ```

## 🧹 Manutenção e Limpeza
Para manter o projeto organizado, removemos arquivos redundantes como `package-lock.json` (favoring `bun.lock`) e centralizamos a documentação.

---
Desenvolvido como um protótipo para melhoria dos serviços urbanos.
