"use client"

import type * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ModalProps {
  title?: string
  description?: string
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  className?: string
  showCloseButton?: boolean
  footer?: React.ReactNode
}

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  footer,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn("sm:max-w-md bg-white", className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="text-blue text-3xl font-bold">{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {showCloseButton && (
          <Button
            onClick={onClose}
            variant="stroke-blue"
            className="absolute right-4 top-4 h-3 w-3 p-0 border-none text-blue"
            aria-label="Close modal"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        <div>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

