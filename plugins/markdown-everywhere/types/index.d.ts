export type Draft = { text: string; via: 'edição' | 'mudança' | 'leitura' }

declare module 'claude-code' {
  interface PluginState {
    'markdown-everywhere': { draft: Draft; isOn: boolean }
  }
}
