export const AI_MODELS_DEFAULT_OPTIONS = [
  { label: 'Gemini 2.5 Flash', value: 'google/gemini-2.5-flash' },
  { label: 'Gemini 2.5 Flash Lite', value: 'google/gemini-2.5-flash-lite-preview-06-17' },
  { label: 'Gemini 2.5 Pro', value: 'google/gemini-2.5-pro' },
  { label: 'Qwen 3.0 30B A3B Instruct', value: 'alibaba/qwen3-30b-a3b-instruct-2507' },
  { label: 'Qwen 3.0 Coder Plus', value: 'alibaba/qwen3-coder-plus' },
]

export const AI_MODELS_PRO_OPTIONS = [
  { label: 'Gemini 2.5 Pro', value: 'google/gemini-2.5-pro' },
  { label: 'GPT 4.1', value: 'openai/gpt-4.1' },
]

export const AI_MODELS_CODER_OPTIONS = [{ label: 'Qwen 3.0 Coder Plus', value: 'alibaba/qwen3-coder-plus' }]

export const AI_MODEL_OPTIONS = (() => {
  const merged = [...AI_MODELS_DEFAULT_OPTIONS, ...AI_MODELS_PRO_OPTIONS, ...AI_MODELS_CODER_OPTIONS]
  const seen = new Set<string>()
  return merged.filter(option => {
    if (seen.has(option.value)) return false
    seen.add(option.value)
    return true
  })
})()
