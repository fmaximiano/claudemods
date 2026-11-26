# claudemods

Mods para o Claude Code.

| Mod | O que faz |
|---|---|
| `markdown-everywhere` | Suas mensagens renderizadas em Markdown e estilo Markdown no campo de mensagem (terminal) |
| `nextphase-switchboard` | Painel (`/switchboard`) para ligar/desligar plugins e mods. Cópia auditada e congelada de [nextphase-software/nextphase-mods](https://github.com/nextphase-software/nextphase-mods) @ `d74f99b` (MIT) |
| `pocock-skills` | 10 skills de Matt Pocock: `grill-me`, `grill-with-docs`, `teach`, `to-questionnaire`, `prototype` e outras. Cópia fixa de [mattpocock/skills](https://github.com/mattpocock/skills) @ `6f7f783` (MIT) |
| `next-steps` | Sugere 2 ou 3 próximos passos após cada resposta (botões no desktop). Cópia de [bradtraversy/traversy-claude-mods](https://github.com/bradtraversy/traversy-claude-mods) (MIT) |
| `subagent-progress` | Barra de progresso + painel de subagentes (modelo, progresso, contexto, custo, tempo), personalizável. Cópia de [afterever/claude-craftkits](https://github.com/afterever/claude-craftkits) (MIT) |
| `theme-examples` | 38 temas animados para o app desktop (`/custom-theme`). Cópia do oficial [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) (Apache-2.0) |
| `files-pane` | Árvore de arquivos com cores por estado (lido, editado, sem commit, commitado), diffs e git (`/files`). Cópia de [Marius-Adam/claude-files-pane](https://github.com/Marius-Adam/claude-files-pane) (MIT) |
| `cache-keeper` | Cronômetro do cache, keep warm, custo de envio a frio, `/board` e `/handoff`. Cópia de [nateherkai/claude-code-mods](https://github.com/nateherkai/claude-code-mods) (MIT) |
| `atc-reflect` | Detecta regras nas suas mensagens e oferece salvá-las no `CLAUDE.md`. Cópia de [atc-net/atc-agentic-toolkit](https://github.com/atc-net/atc-agentic-toolkit) (MIT) |

Todas as cópias de terceiros foram auditadas antes de entrar aqui e estão congeladas no commit indicado no README de cada mod: não recebem atualizações automáticas do original.

Instalação de qualquer um: troque o nome do mod nos comandos abaixo.

## markdown-everywhere

- **Mensagens enviadas:** as suas mensagens no histórico são renderizadas como Markdown, igual às respostas do Claude.
- **Campo de mensagem (terminal):** negrito, itálico, código, títulos, listas, citações e links ganham estilo enquanto você digita.

### Instalação

No prompt de uma sessão do Claude Code no terminal:

```
/plugin install markdown-everywhere --marketplace fmaximiano/claudemods
```

Responda `y` para adicionar o marketplace e escolha o escopo (`user` para todas as sessões).

Pelo shell:

```bash
claude plugin install markdown-everywhere --marketplace fmaximiano/claudemods
```

No app desktop, onde `/plugin` não funciona: clique em **+** ao lado do campo de mensagem → **Plugins** → **Add marketplace** com `fmaximiano/claudemods` → **Add plugin**.

### Limitações

O estilo dentro do campo de mensagem funciona no terminal; o app desktop não o aplica.
