'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ExternalToast, type ToasterProps, toast as sonnerToast } from 'sonner'

export type TToastVariant = 'success' | 'error' | 'info' | 'warning'

const toastInfo = (message: string, options?: ExternalToast) => {
  sonnerToast.info(message, {
    ...options,
    style: {
      background: 'var(--info)',
      color: 'var(--info-foreground)',
      border: '1px solid var(--info)',
      ...options?.style,
    },
  })
}

const toastWarning = (message: string, options?: ExternalToast) => {
  sonnerToast.warning(message, {
    ...options,
    style: {
      background: 'var(--warning)',
      color: 'var(--warning-foreground)',
      border: '1px solid var(--warning)',
      ...options?.style,
    },
  })
}

const toastSuccess = (message: string, options?: ExternalToast) => {
  sonnerToast.success(message, {
    ...options,
    style: {
      background: 'var(--success)',
      color: 'var(--success-foreground)',
      border: '1px solid var(--success)',
      ...options?.style,
    },
  })
}

const toastError = (message: string, options?: ExternalToast) => {
  sonnerToast.error(message, {
    ...options,
    style: {
      background: 'var(--destructive)',
      color: 'var(--destructive-foreground)',
      border: '1px solid var(--destructive)',
      ...options?.style,
    },
  })
}

export const toast = {
  info: toastInfo,
  warning: toastWarning,
  success: toastSuccess,
  error: toastError,
}

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
