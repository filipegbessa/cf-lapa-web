# 📐 CF Lapa Admin — Wireframes & Mockups

---

## 🎨 Layout Base (Todas as Telas)

```
╔════════════════════════════════════════════════════════════════╗
║ 🏋️ CF Lapa       Dashboard > Semana Atual        👤 Admin ▼   ║ Top Bar 60px
╠═══════════════╦════════════════════════════════════════════════╣
║               ║                                                ║
║  🏠 Dashboard ║                                                ║
║               ║                                                ║
║  🏋️ Mov.     ║        MAIN CONTENT AREA                      ║ Sidebar 280px
║               ║        (1200px max width, centered)           ║
║  💪 Treinos   ║                                                ║
║               ║                                                ║
║  📊 Analytics ║                                                ║
║               ║                                                ║
║  ⚙️ Config.   ║                                                ║
║               ║                                                ║
╚═══════════════╩════════════════════════════════════════════════╝
```

---

## 📊 Dashboard — Visão Geral

```
╔════════════════════════════════════════════════════════════════╗
║ 🏋️ CF Lapa       Dashboard > Visão Geral        👤 Admin ▼   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  👋 Bem-vindo, Professor!                                      ║
║  Você tem 3 treinos esta semana. Bom treino! 💪              ║
║                                                                 ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │  📅 SEMANA ATUAL (25 - 31 de maio)                       │ ║
║  ├──────────────────────────────────────────────────────────┤ ║
║  │                                                            │ ║
║  │  [Seg]  [Ter]  [Qua]  [Qui]  [Sex]  [Sab]  [Dom]        │ ║
║  │   ❌    ✅     ❌     ✅     ❌     ✅     ❌            │ ║
║  │  Sem   Força  Sem   Técnica Sem   Força  Sem            │ ║
║  │  treino + Met  treino Olímp treino + Ret treino         │ ║
║  │         con                           con               │ ║
║  │                                                            │ ║
║  │  [Ver semana completa →]                                 │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
║  ┌─────────────────────────────┐  ┌──────────────────────────┐ ║
║  │ 🏋️ TOP MOVIMENTOS           │  │ 📈 TOP TIPOS             │ ║
║  ├─────────────────────────────┤  ├──────────────────────────┤ ║
║  │                             │  │                          │ ║
║  │ 1. Snatch          ████ 12x │  │ AMRAP      ██████ 8x    │ ║
║  │ 2. Clean & Jerk    ███ 10x  │  │ EMOM       ███★★ 6x    │ ║
║  │ 3. Deadlift        ██ 8x    │  │ FOR_TIME   ██★★★ 4x    │ ║
║  │ 4. Back Squat      █ 7x     │  │ TABATA     █★★★★ 2x    │ ║
║  │ 5. Bench Press     █ 6x     │  │                          │ ║
║  │ 6. Box Jump        █ 5x     │  │                          │ ║
║  │                             │  │                          │ ║
║  │ [Ver todos →]               │  │                          │ ║
║  └─────────────────────────────┘  └──────────────────────────┘ ║
║                                                                 ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 🌙 MOVIMENTOS MAIS ANTIGOS                               │ ║
║  ├──────────────────────────────────────────────────────────┤ ║
║  │                                                            │ ║
║  │ Movement       │ Ult. Uso      │ Dias Sem Usar           │ ║
║  │ ──────────────────────────────────────────────────────── │ ║
║  │ Box Jump       │ Nunca          │ ∞ (Nunca usado)        │ ║
║  │ Rope Climb     │ 16 de maio     │ 10 dias                │ ║
║  │ Muscle Up      │ 18 de maio     │ 8 dias                 │ ║
║  │ Pull-ups       │ 19 de maio     │ 7 dias                 │ ║
║  │ Push-ups       │ 20 de maio     │ 6 dias                 │ ║
║  │                                                            │ ║
║  │ [Ver todos →]                                            │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 📋 Lista de Movimentos

```
╔════════════════════════════════════════════════════════════════╗
║ 🏋️ CF Lapa       Movimentos > Listagem        👤 Admin ▼     ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Movimentos                         [+ NOVO MOVIMENTO 🔴]     ║
║                                                                 ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ [🔍 Buscar...]  | Ordenar: [Nome ▼]  [Crescente ▼]    │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ │ Nome            │ Abr. │ Descrição        │ Criado │ A │ ║
║  ├──────────────────────────────────────────────────────────┤ ║
║  │ │ Snatch          │ SN   │ Levant. olímpico │ 19/5  │✏️🗑 ║
║  │ │ Clean & Jerk    │ C&J  │ Levant. olímpico │ 19/5  │✏️🗑 ║
║  │ │ Deadlift        │ DL   │ Levantamento     │ 19/5  │✏️🗑 ║
║  │ │ Back Squat      │ BS   │ Agachamento      │ 19/5  │✏️🗑 ║
║  │ │ Front Squat     │ FS   │ Agachamento      │ 19/5  │✏️🗑 ║
║  │ │ Bench Press     │ BP   │ Supino           │ 19/5  │✏️🗑 ║
║  │ │ Pull-ups        │ PU   │ Barra            │ 19/5  │✏️🗑 ║
║  │ │ Push-ups        │ PSU  │ Flexão           │ 19/5  │✏️🗑 ║
║  │ │ Box Jump        │ BJ   │ Pulo em caixa    │ 19/5  │✏️🗑 ║
║  │ │ Rope Climb      │ RC   │ Subida na corda  │ 19/5  │✏️🗑 ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
║  Mostrando 1-10 de 45 movimentos                              ║
║  [◄]  1  2  3  ...  5  [►]                                   ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
```

---

## ➕ Novo Movimento (Modal)

```
┌──────────────────────────────────────────┐
│  Novo Movimento                      [✕] │
├──────────────────────────────────────────┤
│                                          │
│  Nome *                                  │
│  ┌──────────────────────────────────┐   │
│  │ Snatch                           │   │
│  └──────────────────────────────────┘   │
│  Obrigatório, máx 100 caracteres        │
│                                          │
│  Abbreviation (opcional)                │
│  ┌──────────────────────────────────┐   │
│  │ SN                               │   │
│  └──────────────────────────────────┘   │
│  Máx 10 caracteres                      │
│                                          │
│  Descrição (opcional)                   │
│  ┌──────────────────────────────────┐   │
│  │ Levantamento olímpico explosivo  │   │
│  │ do chão até acima da cabeça      │   │
│  │ em um movimento contínuo.        │   │
│  └──────────────────────────────────┘   │
│                                          │
│           [Cancelar]  [Salvar 🔴]       │
│                                          │
└──────────────────────────────────────────┘
```

---

## 💪 Lista de Treinos (Grid View)

```
╔════════════════════════════════════════════════════════════════╗
║ 🏋️ CF Lapa       Treinos > Listagem        👤 Admin ▼        ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Treinos                               [+ NOVO TREINO 🔴]     ║
║                                                                 ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ Período: [Data inicial ▼] até [Data final ▼]           │ ║
║  │ Ordenar: [Data ▼] | [Decrescente ▼] | [Buscar...]      │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
║  ┌─────────────────────────────┐  ┌─────────────────────────┐ ║
║  │ 📅 19 de Maio               │  │ 📅 20 de Maio          │ ║
║  ├─────────────────────────────┤  ├─────────────────────────┤ ║
║  │                             │  │                         │ ║
║  │ 🔴 Força + Metcon           │  │ 🔴 Técnica Olímpicos   │ ║
║  │                             │  │                         │ ║
║  │ 🟢 WARMUP (EMOM)            │  │ 🟢 WARMUP (EMOM)       │ ║
║  │ 2 min EMOM: 5 snatches      │  │ 5 min EMOM: 5 C&J      │ ║
║  │ • Snatch                    │  │ • Clean & Jerk         │ ║
║  │                             │  │                         │ ║
║  │ 🟢 SKILL                    │  │ 🟢 SKILL               │ ║
║  │ (Nenhum)                    │  │ Power Snatch x3        │ ║
║  │                             │  │ • Snatch               │ ║
║  │ 🟠 WOD (AMRAP)              │  │ 🟠 WOD (AMRAP)         │ ║
║  │ 12 min AMRAP:               │  │ 10 min AMRAP:          │ ║
║  │ • Clean & Jerk (10x)        │  │ • Burpees (15x)        │ ║
║  │ • Box Jump (20x)            │  │ • Box Jump (20x)       │ ║
║  │                             │  │                         │ ║
║  │ [Detalhes] [Editar] [Dup.] │  │ [Detalhes] [Editar] [Dup.│ ║
║  └─────────────────────────────┘  └─────────────────────────┘ ║
║                                                                 ║
║  ┌─────────────────────────────┐  ┌─────────────────────────┐ ║
║  │ 📅 21 de Maio               │  │ 📅 22 de Maio          │ ║
║  ├─────────────────────────────┤  ├─────────────────────────┤ ║
║  │ 🔴 Força + Retorno          │  │ (Sem treino)           │ ║
║  │                             │  │                         │ ║
║  │ 🟢 WARMUP (FOR_TIME)        │  │                         │ ║
║  │ 400m run + 40 cal bike      │  │                         │ ║
║  │                             │  │                         │ ║
║  │ 🟢 SKILL                    │  │                         │ ║
║  │ 3x5 Deadlift                │  │                         │ ║
║  │ • Deadlift                  │  │                         │ ║
║  │                             │  │                         │ ║
║  │ 🟠 WOD (EMOM)               │  │                         │ ║
║  │ 20 min EMOM: ...            │  │                         │ ║
║  │                             │  │                         │ ║
║  │ [Detalhes] [Editar] [Dup.] │  │                         │ ║
║  └─────────────────────────────┘  └─────────────────────────┘ ║
║                                                                 ║
║  Mostrando 1-10 de 45 treinos | [◄]  1  2  3  ...  5  [►]   ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
```

---

## ➕ Novo/Editar Treino (Full Page Form)

```
╔════════════════════════════════════════════════════════════════╗
║ 🏋️ CF Lapa       Treinos > Novo Treino        👤 Admin ▼     ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Novo Treino
║
║  Data *
║  ┌──────────────────────────────────────────┐
║  │ 📅 19 de Maio de 2026                  │
║  └──────────────────────────────────────────┘
║
║  Título (opcional)
║  ┌──────────────────────────────────────────┐
║  │ Força + Metcon                           │
║  └──────────────────────────────────────────┘
║
║  Notas (opcional)
║  ┌──────────────────────────────────────────┐
║  │ Foco em core. Não descer muito baixo   │
║  │ no squat. Respeitar técnica.            │
║  └──────────────────────────────────────────┘
║
║  ═══════════════════════════════════════════════════════
║  🟢 WARMUP (Aquecimento)
║  ═══════════════════════════════════════════════════════
║
║  Tipo (opcional)
║  ┌──────────────────────────────────────────┐
║  │ EMOM                                   ▼ │
║  └──────────────────────────────────────────┘
║
║  Descrição (opcional)
║  ┌──────────────────────────────────────────┐
║  │ 2 min EMOM: 5 snatches (light)          │
║  └──────────────────────────────────────────┘
║
║  Movimentos (opcional)
║  [+ Adicionar Movimento]
║  
║  ✓ Snatch [x]
║  ✓ Box Jump [x]
║
║  ═══════════════════════════════════════════════════════
║  🟢 SKILL (Técnica)
║  ═══════════════════════════════════════════════════════
║
║  Tipo (opcional)
║  ┌──────────────────────────────────────────┐
║  │ ---                                     ▼ │
║  └──────────────────────────────────────────┘
║
║  Descrição (opcional)
║  ┌──────────────────────────────────────────┐
║  │                                          │
║  └──────────────────────────────────────────┘
║
║  Movimentos (opcional)
║  [+ Adicionar Movimento]
║
║  ═══════════════════════════════════════════════════════
║  🟠 WOD (Workout of the Day)
║  ═══════════════════════════════════════════════════════
║
║  Tipo (opcional)
║  ┌──────────────────────────────────────────┐
║  │ AMRAP                                  ▼ │
║  └──────────────────────────────────────────┘
║
║  Descrição (opcional)
║  ┌──────────────────────────────────────────┐
║  │ 12 min AMRAP:                           │
║  │ 10 Clean & Jerk                         │
║  │ 20 Box Jumps                            │
║  └──────────────────────────────────────────┘
║
║  Movimentos (opcional)
║  [+ Adicionar Movimento]
║  
║  ✓ Clean & Jerk [x]
║  ✓ Box Jump [x]
║
║                    [Cancelar]  [Salvar 🔴]
║
╚════════════════════════════════════════════════════════════════╝
```

---

## 👁️ Detalhes do Treino

```
╔════════════════════════════════════════════════════════════════╗
║ 🏋️ CF Lapa       Treinos > Força + Metcon        👤 Admin ▼  ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  🔴 Força + Metcon
║  19 de Maio de 2026
║  [Editar]  [Duplicar]  [Deletar]  [Compartilhar]             ║
║                                                                 ║
║  Notas: Foco em core. Não descer muito baixo.
║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 🟢 WARMUP (EMOM)                                          │ ║
║  ├──────────────────────────────────────────────────────────┤ ║
║  │ 2 min EMOM: 5 snatches (light)                          │ ║
║  │                                                           │ ║
║  │ Movimentos:                                              │ ║
║  │                                                           │ ║
║  │ • 🏋️ Snatch (SN)                                        │ ║
║  │   Levantamento olímpico explosivo do chão até acima    │ ║
║  │   da cabeça em um movimento contínuo.                  │ ║
║  │                                                           │ ║
║  │ • 📦 Box Jump                                            │ ║
║  │   Pulo em caixa                                          │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 🟢 SKILL                                                  │ ║
║  ├──────────────────────────────────────────────────────────┤ ║
║  │ (Sem skill neste treino)                                │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │ 🟠 WOD (AMRAP)                                            │ ║
║  ├──────────────────────────────────────────────────────────┤ ║
║  │ 12 min AMRAP: 10 Clean & Jerk, 20 Box Jumps            │ ║
║  │                                                           │ ║
║  │ Movimentos:                                              │ ║
║  │                                                           │ ║
║  │ • 🏋️ Clean & Jerk (C&J)                                 │ ║
║  │   Levantamento olímpico em dois movimentos. Começa     │ ║
║  │   com o clean (similar ao snatch) e termina com o      │ ║
║  │   jerk (desenvolvimento acima da cabeça).              │ ║
║  │                                                           │ ║
║  │ • 📦 Box Jump                                            │ ║
║  │   Pulo em caixa                                          │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 📅 Treinos da Semana (Calendar View)

```
╔════════════════════════════════════════════════════════════════╗
║ 🏋️ CF Lapa       Treinos > Semana Atual        👤 Admin ▼    ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Semana de 25 a 31 de Maio
║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │  Seg       Ter       Qua       Qui       Sex   Sab  Dom │ ║
║  │  25        26        27        28        29    30   31  │ ║
║  ├──────────────────────────────────────────────────────────┤ ║
║  │                                                           │ ║
║  │ ❌          ✅         ❌         ✅        ❌    ✅   ❌ │ ║
║  │ Sem       Força      Sem       Técnica   Sem   Força  Sem│ ║
║  │ treino    + Met      treino    Olímp     treino + Ret treino
║  │           con                           con           │ ║
║  │                                                           │ ║
║  │ [Nenhum]  [Detalhes] [Nenhum]  [Detalhes][Nenhum][Detalhes] │ ║
║  │           [Editar]            [Editar]         [Editar]  │ ║
║  │                                                           │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║
║  Resumo da Semana:
║  • Total de treinos: 3
║  • Dias com treino: 3
║  • Movimentos únicos: 8
║  • Tipos de treino: 2 (EMOM, AMRAP)
║
╚════════════════════════════════════════════════════════════════╝
```

---

## 🔄 Modal: Adicionar Movimento

```
┌──────────────────────────────────────────┐
│  Selecionar Movimento            [✕]    │
├──────────────────────────────────────────┤
│                                          │
│  [🔍 Buscar movimento...]               │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ □ Snatch (SN)                    │  │
│  │   Levant. olímpico...            │  │
│  ├──────────────────────────────────┤  │
│  │ □ Clean & Jerk (C&J)             │  │
│  │   Levant. olímpico em 2 mov.     │  │
│  ├──────────────────────────────────┤  │
│  │ □ Deadlift (DL)                  │  │
│  │   Levantamento da barra          │  │
│  ├──────────────────────────────────┤  │
│  │ □ Back Squat (BS)                │  │
│  │   Agachamento com barra          │  │
│  ├──────────────────────────────────┤  │
│  │ □ Box Jump                       │  │
│  │   Pulo em caixa                  │  │
│  └──────────────────────────────────┘  │
│                                          │
│  [Cancelar]  [Adicionar Selecionados]  │
│                                          │
└──────────────────────────────────────────┘
```

---

## 🎨 Componentes de Cores em Ação

### Cards de Seção
```
┌─────────────────────────────────────┐
│ 🟢 WARMUP                           │
│ Tipo: EMOM | Duração: 2 min         │
└─────────────────────────────────────┘
Cor de fundo: Verde claro (#D1FAE5)
Cor de border: Verde (#10B981)

┌─────────────────────────────────────┐
│ 🟠 WOD                              │
│ Tipo: AMRAP | Duração: 12 min       │
└─────────────────────────────────────┘
Cor de fundo: Laranja claro (#FEF3C7)
Cor de border: Laranja (#F59E0B)

┌─────────────────────────────────────┐
│ 🟢 SKILL                            │
│ Tipo: EMOM | Duração: 8 min         │
└─────────────────────────────────────┘
Cor de fundo: Azul claro (#DBEAFE)
Cor de border: Azul (#3B82F6)
```

---

## ⌨️ Estados de Input

### Campo com Foco
```
Nome *
┌──────────────────────────────────────┐
│ Snatch                               │ <- Cursor aqui
└──────────────────────────────────────┘
Border: Vermelho 2px, Box shadow: 0 0 0 3px rgba(230,57,70,0.1)
```

### Campo com Erro
```
Email *
┌──────────────────────────────────────┐
│ usuario@                             │
└──────────────────────────────────────┘
❌ Email inválido. Use o formato: usuario@dominio.com

Border: Vermelho 1px (solid)
Texto de erro: Vermelho (E63946)
```

### Campo Desabilitado
```
Código
┌──────────────────────────────────────┐
│ AUTO-12345                           │
└──────────────────────────────────────┘
Opacity: 0.6
Cursor: not-allowed
Cor do texto: Cinza 400
```

---

## 💬 Notificações/Toasts

### Sucesso (Verde)
```
✅ Treino criado com sucesso!
Posição: Top-right
Timer: 5 segundos
Cor: Verde #10B981
```

### Erro (Vermelho)
```
❌ Erro ao salvar treino. Tente novamente.
Posição: Top-right
Timer: 7 segundos (sem auto-dismiss)
Cor: Vermelho #E63946
```

### Aviso (Laranja)
```
⚠️ Esta ação não pode ser desfeita.
Posição: Top-right
Cor: Laranja #F59E0B
```

### Info (Azul)
```
ℹ️ Você tem 2 treinos para revisar.
Posição: Top-right
Timer: 6 segundos
Cor: Azul #3B82F6
```

---

## 📱 Responsividade (Mobile)

### Layout Mobile (< 640px)
```
┌──────────────────────────────────────┐
│ ☰  CF Lapa          👤              │ Topo
├──────────────────────────────────────┤
│ Breadcrumb / Título da Página        │
├──────────────────────────────────────┤
│                                      │
│ CONTEÚDO PRINCIPAL                   │
│ (Full width, single column)          │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

Menu hambúrguer abre modal com navegação

---

## ✨ Transições & Animações

- **Fade-in:** 200ms on page load
- **Slide:** 300ms on menu expand
- **Bounce:** 400ms on success toast
- **Skeleton:** pulse effect on loading
- **Hover:** 150ms on interactive elements

---

**Status:** Wireframes & Mockups Prontos para Feedback 🎨
