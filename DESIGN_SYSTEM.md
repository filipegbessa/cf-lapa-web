# 🏋️ CF Lapa Admin — Design System

**Versão:** 1.0  
**Data:** 26/05/2026  
**Status:** Pronto para Validação

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Layout & Navegação](#layout--navegação)
3. [Paleta de Cores](#paleta-de-cores)
4. [Tipografia](#tipografia)
5. [Grid & Espaçamento](#grid--espaçamento)
6. [Componentes](#componentes)
7. [Telas Principais](#telas-principais)
8. [Fluxos de Usuário](#fluxos-de-usuário)

---

## 🎯 Visão Geral

Sistema de admin para gestão completa de treinos do CrossFit Lapa. Interface moderna, intuitiva e responsiva.

### Objetivos de Design
- ✅ Interface clara e hierárquica
- ✅ Navegação consistente
- ✅ Feedback visual imediato
- ✅ Acessibilidade em mente
- ✅ Performance otimizada

---

## 🎨 Layout & Navegação

### Estrutura Geral

```
┌─────────────────────────────────────────┐
│           TOP BAR (Logo + Perfil)       │
├──────────────┬──────────────────────────┤
│              │                          │
│   SIDEBAR    │       MAIN CONTENT       │
│  (Nav Menu)  │                          │
│              │                          │
│              │                          │
└──────────────┴──────────────────────────┘
```

### Sidebar (Menu de Navegação)

**Posição:** Esquerda, fixo  
**Largura:** 280px (desktop), colapsa em mobile  
**Items:**

```
🏠 Dashboard
├─ Visão Geral
├─ Semana Atual
└─ Estatísticas

🏋️ Movimentos
├─ Listagem
├─ Por Data
└─ Novo Movimento

💪 Treinos
├─ Listagem
├─ Criar Treino
└─ Treinos da Semana

📊 Analytics
├─ Top Movimentos
├─ Top Tipos
└─ Movimentos Antigos

⚙️ Configurações
└─ Preferências
```

### Top Bar

- **Esquerda:** Logo "CF Lapa" + Breadcrumb
- **Direita:** Notificações + Avatar + Dropdown Menu

---

## 🎨 Paleta de Cores

### Cores Primárias

| Cor | Código | Uso |
|-----|--------|-----|
| **Vermelho (CF)** | `#E63946` | Principais, CTAs, Warmup |
| **Cinza Dark** | `#1B2833` | Backgrounds, Text primário |
| **Cinza Claro** | `#F0F2F5` | Backgrounds secundários |
| **Branco** | `#FFFFFF` | Cards, Form backgrounds |

### Cores Secundárias

| Cor | Código | Uso |
|-----|--------|-----|
| **Verde** | `#10B981` | Success, Skill |
| **Azul** | `#3B82F6` | Info, Secondary actions |
| **Laranja** | `#F59E0B` | Warning, WOD |
| **Cinza** | `#6B7280` | Disabled, Secondary text |

### Tons de Cinza

```
Cinza 50:   #F9FAFB
Cinza 100:  #F3F4F6
Cinza 200:  #E5E7EB
Cinza 300:  #D1D5DB
Cinza 400:  #9CA3AF
Cinza 500:  #6B7280
Cinza 600:  #4B5563
Cinza 700:  #374151
Cinza 800:  #1F2937
Cinza 900:  #111827
```

---

## 📝 Tipografia

### Fonte Principal
**Font Family:** Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'

### Escala Tipográfica

| Tamanho | Uso | Weight | Line Height |
|---------|-----|--------|-------------|
| **H1** | 32px | 700 (Bold) | 40px |
| **H2** | 24px | 600 (Semi) | 32px |
| **H3** | 20px | 600 (Semi) | 28px |
| **Body Large** | 16px | 400 (Regular) | 24px |
| **Body** | 14px | 400 (Regular) | 20px |
| **Small** | 12px | 400 (Regular) | 16px |
| **Label** | 12px | 600 (Semi) | 16px |

---

## 📏 Grid & Espaçamento

### Grid System
- **Desktop:** 12 colunas
- **Tablet:** 8 colunas
- **Mobile:** 4 colunas
- **Gutter:** 24px

### Escala de Espaçamento (REM)

```
xs: 4px   (0.25rem)
sm: 8px   (0.5rem)
md: 16px  (1rem)
lg: 24px  (1.5rem)
xl: 32px  (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
```

---

## 🧩 Componentes

### Buttons

**Variantes:**
- Primary (Vermelho)
- Secondary (Branco + Border)
- Tertiary (Ghost)
- Danger (Vermelho escuro)

**Estados:**
- Default
- Hover
- Active
- Disabled
- Loading

**Tamanhos:**
- Small (28px)
- Medium (36px)
- Large (44px)

### Input Fields

**Tipos:**
- Text
- Number
- Date
- Select
- Textarea
- Rich Editor (Tiptap)

**Estados:**
- Default
- Focus
- Filled
- Error
- Disabled

### Cards

**Tipos:**
- Info Card (Dashboard)
- Workout Card
- Movement Card
- Stats Card

**Elementos:**
- Header
- Content
- Footer (Actions)

### Tables

**Features:**
- Sorting
- Pagination
- Search
- Bulk Actions
- Responsive (scroll em mobile)

### Modals

**Tipos:**
- Confirm
- Form
- Alert
- Detail View

### Badges

**Tipos:**
- Section (Warmup, Skill, WOD)
- Status
- Category
- Type (AMRAP, EMOM, FOR_TIME, TABATA)

### Forms

**Features:**
- Validação em tempo real
- Error messages
- Help text
- Field groups
- Nested objects (arrays)

---

## 📱 Telas Principais

### 1. Dashboard

**Layout:** Grid 12 colunas

```
┌─ Boas-vindas ────────────────────────────────┐
│ Bem-vindo, Professor!                        │
│ Você tem 3 treinos esta semana               │
└──────────────────────────────────────────────┘

┌─ Semana Atual (7 cards) ──────────────────────┐
│ Seg │ Ter │ Qua │ Qui │ Sex │ Sab │ Dom      │
│ ❌ │ ✅ │ ❌ │ ✅ │ ❌ │ ✅ │ ❌ (Clicável)│
└──────────────────────────────────────────────┘

┌─ Top Movimentos (6 colunas) │ Top Tipos (6 colunas) ┐
│ Snatch        - 12x         │ AMRAP   - 8x          │
│ Clean & Jerk  - 10x         │ EMOM    - 6x          │
│ Deadlift      - 8x          │ FOR_TIME- 4x          │
│ Back Squat    - 7x          │ TABATA  - 2x          │
│ Bench Press   - 6x          │                       │
│ Box Jump      - 5x          │                       │
└─────────────────────────────┴───────────────────────┘

┌─ Movimentos Mais Antigos (full width) ────────┐
│ Movement         │ Ult. Uso      │ Dias Sem Usar│
│ Box Jump         │ Nunca         │ ∞           │
│ Rope Climb       │ 16 de maio    │ 10 dias     │
│ Deadlift         │ 21 de maio    │ 5 dias      │
└──────────────────────────────────────────────┘
```

**Componentes:**
- Header com boas-vindas
- Card da semana (7 days)
- Stats cards
- Tabelas
- Gráficos (opcional)

---

### 2. Lista de Movimentos

**Layout:** Full width

```
┌─ Header ─────────────────────────────────────────┐
│ Movimentos                    [Novo Movimento 🔴] │
└──────────────────────────────────────────────────┘

┌─ Filters/Search ─────────────────────────────────┐
│ [Buscar...] | Ordenar: Nome ▼ | Crescente ▼    │
└──────────────────────────────────────────────────┘

┌─ Table ──────────────────────────────────────────┐
│ Nome          │ Abr. │ Descrição │ Criado │ Ações│
├──────────────────────────────────────────────────┤
│ Snatch        │ SN   │ Olímpico  │ 19/5  │ ✏️ 🗑️│
│ Clean & Jerk  │ C&J  │ Olímpico  │ 19/5  │ ✏️ 🗑️│
│ Deadlift      │ DL   │ Levanta...│ 19/5  │ ✏️ 🗑️│
└──────────────────────────────────────────────────┘

[◄ 1 2 3 ... 10 ►] Mostrando 1-10 de 45
```

**Features:**
- Search bar
- Filters
- Sort options
- Pagination
- Bulk actions
- Row actions (edit, delete)

---

### 3. Criar/Editar Movimento

**Layout:** Modal ou Page

```
┌─ Movimento ──────────────────────┐
│ Novo Movimento           [X]     │
├──────────────────────────────────┤
│                                  │
│ Nome *                           │
│ [Snatch                        ] │
│                                  │
│ Abbreviation                     │
│ [SN        ]                     │
│                                  │
│ Descrição                        │
│ [Levantamento olímpico...]     ] │
│                                  │
│           [Cancelar] [Salvar 🔴] │
└──────────────────────────────────┘
```

**Validação:**
- Nome: obrigatório, único
- Abbreviation: opcional
- Descrição: opcional

---

### 4. Lista de Treinos

**Layout:** Grid ou List

```
Grid View (Cards):
┌─ 19 de Maio ─────────────┐ ┌─ 20 de Maio ──────────────┐
│ Força + Metcon            │ │ Técnica de Olimpicos       │
│ Warmup                    │ │ Warmup                     │
│ 10x Snatch                │ │ 5x Snatch (light)          │
│                           │ │                            │
│ Skill                     │ │ Skill                      │
│ Power Snatch x3           │ │ C&J singles                │
│                           │ │                            │
│ WOD                       │ │ WOD                        │
│ 12min AMRAP:              │ │ 5 rounds for time:         │
│ 10x C&J, 20x Box Jumps    │ │ 1km row, 500m run         │
│                           │ │                            │
│ [Editar] [Duplicar] [Deletar]  │ [Editar] [Duplicar] [Deletar]
└───────────────────────────┘ └────────────────────────────┘
```

**Filters:**
- Período (startDate/endDate)
- Ordenação
- Search by title

---

### 5. Criar/Editar Treino

**Layout:** Full page form

```
┌─ Novo Treino ────────────────────────────────┐
│                                              │
│ Data *                                       │
│ [19 de Maio de 2026        ]                │
│                                              │
│ Título                                       │
│ [Força + Metcon                            ] │
│                                              │
│ Notas                                        │
│ [Foco em core, não descer baixo             ] │
│                                              │
├─ WARMUP ─────────────────────────────────────┤
│                                              │
│ Tipo          Descrição                      │
│ [EMOM    ▼] [2 min EMOM: 5 snatches      ] │
│                                              │
│ Movimentos (opcional)                        │
│ [+ Adicionar Movimento]                      │
│ Snatch    [x]                                │
│ Box Jump  [x]                                │
│                                              │
├─ SKILL ──────────────────────────────────────┤
│                                              │
│ Tipo          Descrição                      │
│ [---     ▼] [                              ] │
│                                              │
│ Movimentos (opcional)                        │
│ [+ Adicionar Movimento]                      │
│                                              │
├─ WOD ────────────────────────────────────────┤
│                                              │
│ Tipo          Descrição                      │
│ [AMRAP   ▼] [12 min AMRAP: 10 C&J, 20 Box ] │
│                                              │
│ Movimentos (opcional)                        │
│ [+ Adicionar Movimento]                      │
│ Clean & Jerk  [x]                            │
│ Box Jump      [x]                            │
│                                              │
│             [Cancelar] [Salvar 🔴]           │
└──────────────────────────────────────────────┘
```

**Features:**
- Date picker
- Rich text editor (Tiptap)
- Movement selector/search
- 3 seções (warmup, skill, wod)
- Tipos pré-definidos

---

### 6. Detalhes do Treino

**Layout:** Page com sections

```
┌─ Header ─────────────────────────────────────┐
│ Força + Metcon          19 de Maio           │
│ [Editar] [Duplicar] [Deletar] [Compartilhar]│
└──────────────────────────────────────────────┘

Notas: Foco em core, não descer baixo

┌─ WARMUP (EMOM) ──────────────────────────────┐
│ 2 min EMOM: 5 snatches                       │
│                                              │
│ Movimentos:                                  │
│ • Snatch (SN)                                │
│   Levantamento olímpico explosivo...         │
│ • Box Jump                                   │
│   Pulo em caixa                              │
└──────────────────────────────────────────────┘

┌─ SKILL ────────────────────────────────────────┐
│ (Sem skill neste treino)                      │
└────────────────────────────────────────────────┘

┌─ WOD (AMRAP) ──────────────────────────────────┐
│ 12 min AMRAP: 10 Clean & Jerk, 20 Box Jumps   │
│                                               │
│ Movimentos:                                   │
│ • Clean & Jerk (C&J)                          │
│   Levantamento olímpico em dois movimentos    │
│ • Box Jump                                    │
│   Pulo em caixa                               │
└───────────────────────────────────────────────┘
```

---

### 7. Treinos da Semana (View alternativo)

**Layout:** Table/Calendar view

```
Semana de 25 a 31 de Maio

┌─────────────────────────────────────────────────────┐
│ Seg   Ter   Qua   Qui   Sex   Sab   Dom           │
├─────────────────────────────────────────────────────┤
│  ❌   ✅    ❌    ✅    ❌    ✅    ❌            │
│ Sem   Força Sem   Técnica Sem  Força Sem         │
│ treino + Met  treino  Olímp  treino + Ret treino │
│       con              ico            con        │
└─────────────────────────────────────────────────────┘

Ou em formato de cards:

Seg 25/5            Ter 26/5            Qua 27/5
(Sem treino)        Força + Metcon      (Sem treino)
                    [Ver Detalhes]      
                    [Editar]            

Qui 28/5            Sex 29/5            Sab 30/5
Técnica Olímpicos   (Sem treino)        Força + Retorno
[Ver Detalhes]                          [Ver Detalhes]
[Editar]                                [Editar]
```

---

## 🔄 Fluxos de Usuário

### Criar Novo Treino

```
1. Click "Novo Treino"
2. Preencher data (obrigatório)
3. Preencher título (opcional)
4. Preencher notas (opcional)
5. Configurar WARMUP (optional)
   - Selecionar tipo
   - Descrever
   - Adicionar movimentos
6. Configurar SKILL (optional)
   - Idem
7. Configurar WOD (optional)
   - Idem
8. Salvar
9. Feedback: "Treino criado com sucesso!"
10. Redirect para lista ou detalhes
```

### Editar Treino

```
1. Clicar em treino na lista
2. Clicar "Editar"
3. Form abre com dados preenchidos
4. Modificar campos desejados
5. Salvar
6. Feedback: "Treino atualizado!"
7. Refresh automático
```

### Adicionar Movement a um Treino

```
1. Em Criar/Editar Treino
2. Clicar "+ Adicionar Movimento" em uma seção
3. Search/select modal abre
4. Buscar por nome/abbreviation
5. Clicar no movement desejado
6. Adiciona à lista
7. Pode remover com [x]
```

### Buscar/Filtrar Treinos

```
1. Ir para Lista de Treinos
2. Usar filters: startDate, endDate
3. Clicar buscar/aplicar
4. Lista atualiza com resultados
5. Paginação atualiza
```

---

## 🎯 Casos de Uso Especiais

### Empty States

**Treinos vazios:**
```
┌─────────────────────────────────────┐
│   📭 Nenhum treino ainda            │
│                                     │
│   Comece criando seu primeiro      │
│   treino da semana                 │
│                                     │
│  [+ Criar Treino]                  │
└─────────────────────────────────────┘
```

**Movimentos vazios:**
```
┌─────────────────────────────────────┐
│   🏋️ Nenhum movimento ainda        │
│                                     │
│   Adicione movimentos ao seu        │
│   catálogo para usar nos treinos    │
│                                     │
│  [+ Novo Movimento]                │
└─────────────────────────────────────┘
```

### Loading States
- Skeleton loaders em cards
- Loading spinner em tables
- Progress bar em uploads

### Error States
- Toast notifications (top-right)
- Inline field errors
- Page error boundaries

### Success States
- Toast notifications green
- Checkmark icons
- Animated transitions

---

## 📐 Breakpoints Responsivos

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column, sidebar hidden (hamburger) |
| Tablet | 640px - 1024px | 2 columns, sidebar collapsed |
| Desktop | > 1024px | Full sidebar + content |

---

## ♿ Acessibilidade

- ARIA labels em botões
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators visíveis
- Contraste de cores (WCAG AA)
- Textos alternativos em ícones
- Validação com mensagens claras

---

## 🚀 Próximos Passos

1. ✅ Design System aprovado
2. ⏳ Implementar componentes base (Button, Input, Card, etc)
3. ⏳ Criar layout shell (Sidebar + Top Bar)
4. ⏳ Implementar Dashboard
5. ⏳ Implementar CRUD de Movimentos
6. ⏳ Implementar CRUD de Treinos
7. ⏳ Integração com API
8. ⏳ Testes E2E
9. ⏳ Deploy

---

**Status:** Pronto para Feedback & Validação 🎨
