import { createRequesty } from '@requesty/ai-sdk'

import { env } from '@/env'
import { AI_MODELS_DEFAULT_OPTIONS, AI_MODELS_PRO_OPTIONS, AI_MODELS_CODER_OPTIONS } from '../constants'

export const customRequesty = createRequesty({ apiKey: env.REQUESTY_API_KEY })

const defaultModels = customRequesty('google/gemini-2.5-flash', {
  models: AI_MODELS_DEFAULT_OPTIONS.map(option => option.value),
})

const proModels = customRequesty('google/gemini-2.5-pro', {
  models: AI_MODELS_PRO_OPTIONS.map(option => option.value),
})

const coderModels = customRequesty('alibaba/qwen3-coder-plus', {
  models: AI_MODELS_CODER_OPTIONS.map(option => option.value),
})

const models = {
  default: defaultModels,
  pro: proModels,
  coder: coderModels,
}

export const getChatModelDefault = () => models.default

export const getChatModel = (model: keyof typeof models) => models[model]

export const getChatModelById = (id: string) => {
  const modelSelected = AI_MODELS_DEFAULT_OPTIONS.find(option => option.value === id)
  const modelName = modelSelected?.value
  if (!modelName) throw new Error('chat.modelNotFound')
  return customRequesty(modelName)
}
