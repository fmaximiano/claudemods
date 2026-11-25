# claudemods

Mods para o Claude Code.

| Mod | O que faz |
|---|---|
| `markdown-everywhere` | Suas mensagens renderizadas em Markdown + pré-visualização do rascunho |
| `nextphase-switchboard` | Painel (`/switchboard`) para ligar/desligar plugins e mods. Cópia auditada e congelada de [nextphase-software/nextphase-mods](https://github.com/nextphase-software/nextphase-mods) @ `d74f99b` (MIT) |
| `pocock-skills` | 10 skills de Matt Pocock: `grill-me`, `grill-with-docs`, `teach`, `to-questionnaire`, `prototype` e outras. Cópia fixa de [mattpocock/skills](https://github.com/mattpocock/skills) @ `6f7f783` (MIT) |

Instalação de qualquer um: troque o nome do mod nos comandos abaixo.

## markdown-everywhere

- **Mensagens enviadas:** as suas mensagens no histórico são renderizadas como Markdown, igual às respostas do Claude.
- **Campo de mensagem (terminal):** negrito, itálico, código, títulos, listas, citações e links ganham estilo enquanto você digita.
- **Pré-visualização:** uma faixa acima do campo de mensagem mostra o rascunho renderizado. O comando `/preview` liga e desliga a faixa.

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

O estilo dentro do campo de mensagem funciona no terminal. Pode ser que o app desktop não o aplique; nesse caso, use a faixa de pré-visualização.
