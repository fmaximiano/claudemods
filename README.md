# claudemods

Mods para o Claude Code.

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
