import type { Register, PromptDecoration } from 'claude-code'

// Origens que representam o que a própria pessoa digitou
const HUMAN = new Set(['composer', 'bridge', 'sdk', 'unclassified'])

type Deco = PromptDecoration

// Estilos inline: [regex, estilo do conteúdo]; grupos: 1 = abre, 2 = conteúdo, 3 = fecha
const INLINE: [RegExp, Omit<Deco, 'start' | 'end'>][] = [
  [/(\*\*\*)(?=\S)(.+?)(?<=\S)(\*\*\*)/g, { bold: true, italic: true }],
  [/(\*\*|__)(?=\S)(.+?)(?<=\S)(\1)/g, { bold: true }],
  [/(?<![\*\w])(\*|_)(?=[^\s*_])(.+?)(?<=[^\s*_])(\1)(?![\*\w])/g, { italic: true }],
  [/(~~)(?=\S)(.+?)(?<=\S)(~~)/g, { strikethrough: true }],
]
const MARK: Omit<Deco, 'start' | 'end'> = { dimColor: true }

function decorate(text: string): Deco[] {
  const out: Deco[] = []
  const add = (start: number, end: number, s: Omit<Deco, 'start' | 'end'>) => {
    if (end > start) out.push({ start, end, ...s })
  }

  let offset = 0
  let inFence = false
  for (const line of text.split('\n')) {
    const end = offset + line.length
    const fence = /^\s*(```|~~~)/.test(line)

    if (fence || inFence) {
      // Blocos de código cercados
      if (fence) { add(offset, end, MARK); inFence = !inFence }
      else add(offset, end, { color: 'suggestion' })
      offset = end + 1
      continue
    }

    // Faixas de código inline: estilizadas e protegidas dos demais estilos
    const shielded: [number, number][] = []
    for (const m of line.matchAll(/(`+)([^`]+?)\1/g)) {
      const s = offset + m.index!, f = s + m[0].length, n = m[1]!.length
      add(s, s + n, MARK); add(s + n, f - n, { color: 'suggestion' }); add(f - n, f, MARK)
      shielded.push([s, f])
    }
    const free = (s: number, f: number) => !shielded.some(([a, b]) => s < b && f > a)

    let body = offset
    const heading = line.match(/^(#{1,6})\s+/)
    const quote = line.match(/^(\s*>+\s?)/)
    const list = line.match(/^(\s*)([-*+]|\d+[.)])\s+(\[[ xX]\]\s+)?/)

    if (heading) {
      add(offset, offset + heading[0].length, MARK)
      add(offset + heading[0].length, end, { bold: true, color: 'claude' })
      body = end
    } else if (quote) {
      add(offset, offset + quote[0].length, { color: 'subtle' })
      add(offset + quote[0].length, end, { italic: true, dimColor: true })
    } else if (list) {
      add(offset + list[1]!.length, offset + list[0].length, { color: 'claude', bold: true })
    } else if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      add(offset, end, MARK)
    }

    if (body < end) {
      for (const [re, style] of INLINE) {
        for (const m of line.matchAll(re)) {
          const s = offset + m.index!, f = s + m[0].length
          const a = m[1]!.length, c = m[3]!.length
          if (!free(s, f)) continue
          add(s, s + a, MARK); add(s + a, f - c, style); add(f - c, f, MARK)
        }
      }
      // Links [texto](url)
      for (const m of line.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
        const s = offset + m.index!, f = s + m[0].length
        if (!free(s, f)) continue
        add(s, s + 1, MARK)
        add(s + 1, s + 1 + m[1]!.length, { underline: true, color: 'suggestion' })
        add(s + 1 + m[1]!.length, f, MARK)
      }
    }
    offset = end + 1
  }
  return out
}

export const register: Register = on => {
  // 1) Estilo dentro do campo de mensagem (terminal)
  on('prompt.edit', async ($, e, next) => {
    const r = await next(e)
    return { ...r, decorations: [...(r.decorations ?? []), ...decorate(r.text)] }
  })

  on('prompt.change', async ($, e, next) => {
    const result = await next(e)
    try {
      await $.prompt.paint({ text: e.text, decorations: e.text ? decorate(e.text) : [] })
    } catch { /* superfície sem campo de texto: ignora */ }
    return result
  })

  // 2) Mensagens já enviadas renderizadas como Markdown
  on('ui.render', { component: 'UserMessage' }, ($, e, next) => {
    const { text, origin, task, from } = e.props
    if (task || from || !HUMAN.has(origin.kind) || !text.trim()) return next(e)

    const { Box, Markdown } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Markdown text={text} />
      </Box>
    )
  })
}
