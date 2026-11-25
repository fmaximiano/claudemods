# pocock-skills

Seleção de 10 skills de [mattpocock/skills](https://github.com/mattpocock/skills), copiadas do commit [`6f7f783`](https://github.com/mattpocock/skills/tree/6f7f7831a625f040a8e06a0e7954826b87ce775a) (25/11/2026). Todas foram revisadas antes da cópia: são só texto, sem hooks nem scripts. A cópia é fixa e não recebe atualizações do original. Licença MIT do autor mantida em `LICENSE`.

| Skill | Para quê |
|---|---|
| `grill-me` / `grilling` | Entrevista implacável para lapidar um plano, em rodadas de perguntas numeradas com recomendação |
| `grill-with-docs` | O grilling, gerando glossário e registros de decisão (ADRs) ao longo da conversa |
| `domain-modeling` | Mantém o `GLOSSARY.md` e os ADRs; é chamada pelo `grill-with-docs` |
| `to-questionnaire` | Transforma uma decisão que depende de outra pessoa num questionário em Markdown |
| `teach` | Curso em várias sessões sobre um tema, com lições em HTML e registro de progresso na pasta atual |
| `wait-what` | Pede para o Claude reexplicar a última resposta de forma simples |
| `handoff` | Resume a conversa num documento para outra sessão continuar |
| `research` | Pesquisa em fontes primárias com um agente em segundo plano e salva as conclusões em Markdown |
| `prototype` | Protótipo descartável para testar uma lógica ou uma interface |

Os arquivos `agents/openai.yaml` do original (usados só pelo Codex) foram omitidos.

## Instalação

```
/plugin install pocock-skills --marketplace fmaximiano/claudemods
```

Uso: `/grill-me`, `/teach`, `/to-questionnaire` etc.
