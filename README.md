# CPPEM HUB — Dashboard de Performance

Plataforma de acompanhamento de vendas e metas para o CPPEM. Cada vendedor faz login e visualiza **apenas os seus próprios dados**, alimentados diretamente por uma planilha do Google Sheets.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS (tema CPPEM) |
| Autenticação | Supabase Auth |
| Storage (fotos) | Supabase Storage |
| Dados | Google Sheets API v4 |
| Gráficos | Recharts |
| Deploy | Vercel |

---

## Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com) (plano gratuito funciona)
- Projeto no [Google Cloud Console](https://console.cloud.google.com) com Sheets API ativada
- Planilha Google Sheets com os dados de vendas

---

## Instalação local

```bash
# Clone o repositório
git clone <url-do-repo>
cd cppem-hub

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env.local

# Preencha as variáveis no .env.local (veja abaixo)

# Rode em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

---

## Configuração

### 1. Supabase

1. Crie um projeto em https://supabase.com
2. Vá em **Settings > API** e copie a URL e a chave anônima
3. Vá em **Authentication > Users** e crie os usuários (e-mail + senha)
   - O e-mail deve ser **exatamente igual** ao e-mail na coluna `email` da planilha
4. Vá em **Storage** e crie um bucket chamado `avatars` com acesso público

### 2. Google Sheets API

1. Acesse https://console.cloud.google.com
2. Crie um projeto novo
3. Ative a **Google Sheets API**
4. Vá em **Credenciais > Criar credenciais > Conta de serviço**
5. Crie a conta, vá em **Chaves > Adicionar chave > JSON**
6. Baixe o JSON e copie:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`
7. Abra a planilha e **compartilhe** com o e-mail da conta de serviço (permissão de Leitor)
8. Copie o ID da planilha da URL: `docs.google.com/spreadsheets/d/**ID_AQUI**/edit`

### 3. Estrutura da planilha

A planilha deve ter uma linha de cabeçalho. Os nomes das colunas são flexíveis (o sistema normaliza acentos e maiúsculas), mas idealmente:

| email | nome | cargo | data | produto | valor_venda | quantidade_vendas | meta_mensal |
|---|---|---|---|---|---|---|---|
| joao@cppem.com | João Silva | Consultor | 01/06/2025 | Produto A | R$ 1.500,00 | 2 | R$ 30.000,00 |

**Importante:** O campo `email` da planilha deve ser **idêntico** ao e-mail de login no Supabase.

O campo `data` aceita formatos: `DD/MM/YYYY`, `YYYY-MM-DD` ou número serial do Excel/Sheets.

O campo `valor_venda` aceita: `R$ 1.500,00`, `1500,00`, `1500`.

---

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```env
# Google Sheets
GOOGLE_SHEETS_ID=1ZzKYar--5x31ov0WSn-7Xmisv7Vw3FEhBN5IdGP-hgA
GOOGLE_SERVICE_ACCOUNT_EMAIL=minha-conta@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nCHAVE\n-----END RSA PRIVATE KEY-----"
GOOGLE_SHEETS_RANGE=Sheet1!A1:Z1000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> **Atenção:** No `GOOGLE_PRIVATE_KEY`, mantenha as quebras de linha como `\n` dentro das aspas. O Next.js/Vercel tratam isso corretamente.

---

## Deploy na Vercel

1. Faça push para o GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Vá em **Settings > Environment Variables** e adicione todas as variáveis do `.env.example`
4. Clique em **Deploy**

Pronto. A cada deploy ou `revalidate` (5 min), os dados da planilha são atualizados automaticamente.

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Landing page institucional |
| `/login` | Login com e-mail e senha |
| `/dashboard` | Dashboard principal do usuário |
| `/perfil` | Perfil e upload de foto |
| `/api/sheets` | API interna — busca dados da planilha |
| `/api/user` | API interna — dados do usuário autenticado |

---

## Segurança

- Credenciais do Google Sheets ficam **exclusivamente no servidor** (env vars sem `NEXT_PUBLIC_`)
- O middleware (`middleware.ts`) redireciona usuários não autenticados para `/login`
- Cada usuário só vê dados cujo campo `email` da planilha bate com seu e-mail de login
- A API `/api/sheets` verifica a sessão Supabase antes de retornar qualquer dado

---

## Calculações

| Métrica | Cálculo |
|---|---|
| Total Vendido | Soma de `valor_venda` do usuário |
| Meta Mensal | Primeiro valor `meta_mensal` encontrado |
| % da Meta | `(total_vendido / meta_mensal) * 100` |
| Ticket Médio | `total_vendido / total_quantidade` |
| Crescimento Diário | `((hoje - ontem) / ontem) * 100` |

---

Disciplina. Resultado. Missão.
