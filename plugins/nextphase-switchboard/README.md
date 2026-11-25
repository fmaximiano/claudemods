# NextPhase Switchboard

A side pane that lists every Claude Code plugin installed for you, split into mods (plugins whose hooks file names a hooks module) and plain plugins, each with an on/off toggle.

Type `/nextphase-switchboard` (short form `/switchboard`) to open it. Pressing a toggle runs `claude plugin enable` or `claude plugin disable` for that plugin (it applies in every chat), then reloads plugins in the current chat so the change shows at once. Mods come back live; a plain plugin's skills may need a new chat. Press Refresh to read the list again after installing or removing a plugin.

---

**Cópia auditada.** Esta pasta é uma cópia fixa de [nextphase-software/nextphase-mods](https://github.com/nextphase-software/nextphase-mods/tree/d74f99b042f7af037549cdbcf5327d51375735b6/plugins/nextphase-switchboard), commit `d74f99b` (24/10/2026). O código foi revisado antes da cópia e não recebe atualizações automáticas do original. Licença MIT do autor original mantida em `LICENSE`.

## Instalação

```
/plugin install nextphase-switchboard --marketplace fmaximiano/claudemods
```
