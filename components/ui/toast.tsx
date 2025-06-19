"use client"

/**
 * Lightweight Radix Toast wrapper (shadcn/ui-style) ― keeps the
 * exact export surface the build validator looks for.
 *
 * If you already have a fancier toast setup you can delete this file
 * and point existing imports to it instead, but this will compile and
 * work out-of-the-box.
 */
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cn } from "../../lib/utils"

/* Provider ---------------------------------------------------------------- */
export const ToastProvider = ToastPrimitives.Provider

/* Root -------------------------------------------------------------------- */
export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(
      "pointer-events-auto flex w-full max-w-md items-start gap-2 rounded-md bg-white p-4 shadow-lg dark:bg-slate-800",
      className,
    )}
    {...props}
  />
))
Toast.displayName = ToastPrimitives.Root.displayName

/* Title ------------------------------------------------------------------- */
export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

/* Description ------------------------------------------------------------- */
export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

/* Close ------------------------------------------------------------------- */
export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
      className,
    )}
    {...props}
  >
    ✕
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

/* Viewport ---------------------------------------------------------------- */
export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed inset-x-0 bottom-0 z-50 flex max-h-screen flex-col-reverse p-4 sm:inset-x-auto sm:right-0",
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName
