
---

**Cópia auditada e congelada** de [nateherkai/claude-code-mods](https://github.com/nateherkai/claude-code-mods/tree/33a936f2ec6bbfea5a30a1a4d71d992487a5c769/cache-keeper), commit `33a936f`, mantida em [fmaximiano/claudemods](https://github.com/fmaximiano/claudemods). O código foi revisado antes da cópia e não recebe atualizações automáticas do original. Licença original mantida em `LICENSE`.

**Modificação (claudemods, v1.1.0):** o botão `handoff` da faixa só aparece quando o contexto atinge um limite de tokens (padrão: 120 mil), com um aviso único quando o limite é ultrapassado. No app desktop, o rodapé mostra `/handoff` a partir desse limite. Ajuste com `/cache handoff 150k`, ou use `/cache handoff off` para mostrar o botão sempre. O comando `/handoff` continua funcionando a qualquer momento.

Instalação:

```
/plugin install cache-keeper --marketplace fmaximiano/claudemods
```
