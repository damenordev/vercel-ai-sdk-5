import Link from 'next/link'

import { getTranslations } from '@/i18n/server'
import { SettingsDialog } from '@/components'
import { ChatInput, ChatMessages, ChatProvider } from '@/chat'

export default async function HomePage() {
  const t = await getTranslations()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-2">
        <div className="flex justify-end">
          <SettingsDialog />
        </div>
      </header>
      <main className="flex-1 ">
        <ChatProvider>
          <div className="h-[calc(100vh-100px)] overflow-hidden flex flex-col pb-2 max-w-5xl mx-auto p-1 bg-muted/20 rounded-2xl">
            <ChatMessages />
            <ChatInput />
          </div>
        </ChatProvider>
      </main>
      <footer className="pb-1 pt-2">
        <p className="text-xs text-center">
          2025 © Creador con ♥️ por{' '}
          <a className="font-bold hover:underline" href="cv.damenor.dev">
            damenor
          </a>
          .
        </p>
      </footer>
    </div>
  )
}
