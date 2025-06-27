"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentPropsWithoutRef } from "react"

export function ThemeProvider(props: ComponentPropsWithoutRef<typeof NextThemesProvider>) {
  const { children, ...rest } = props
  return <NextThemesProvider {...rest}>{children}</NextThemesProvider>
}