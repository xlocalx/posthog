'use client'

import { IconCheck, IconChevronRight } from '@posthog/icons'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { Button } from 'lib/ui/Button/Button'
import { cn } from 'lib/utils/css-classes'
import * as React from 'react'

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
        inset?: boolean
    }
>(
    ({ className, inset, children, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.SubTrigger ref={ref} className={cn(inset && 'pl-8', className)} asChild {...props}>
            <Button.Root menuItem>
                <Button.Label>{children}</Button.Label>
                <Button.Icon>
                    <IconChevronRight />
                </Button.Icon>
            </Button.Root>
        </ContextMenuPrimitive.SubTrigger>
    )
)
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(
    ({ className, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.SubContent
            ref={ref}
            className={cn(
                'z-top min-w-[8rem] max-w-[300px] overflow-hidden rounded-md border bg-surface-primary p-1 text-primary shadow-menu',
                className
            )}
            {...props}
        />
    )
)
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(
    ({ className, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                ref={ref}
                className={cn(
                    'z-top min-w-[8rem] max-w-[300px] overflow-hidden rounded-md border bg-surface-primary p-1 text-primary shadow-menu',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    className
                )}
                {...props}
            />
        </ContextMenuPrimitive.Portal>
    )
)
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
        inset?: boolean
    }
>(
    ({ className, inset, children, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.Item
            ref={ref}
            className={cn('data-[disabled]:pointer-events-none data-[disabled]:opacity-50', inset && 'pl-8', className)}
            asChild
            {...props}
        >
            <Button.Root menuItem>
                <Button.Label menuItem>{children}</Button.Label>
            </Button.Root>
        </ContextMenuPrimitive.Item>
    )
)
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(
    ({ className, children, checked, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.CheckboxItem
            ref={ref}
            className={cn(
                'relative flex cursor-default select-none items-center rounded-sm outline-none transition-colors focus-visible:bg-fill-highlight-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                className
            )}
            checked={checked}
            asChild
            {...props}
        >
            <Button.Root menuItem>
                <Button.Icon>
                    <ContextMenuPrimitive.ItemIndicator className="mt-[-6px]">
                        <IconCheck />
                    </ContextMenuPrimitive.ItemIndicator>
                </Button.Icon>
                <Button.Label menuItem>{children}</Button.Label>
            </Button.Root>
        </ContextMenuPrimitive.CheckboxItem>
    )
)

ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(
    ({ className, children, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.RadioItem
            ref={ref}
            className={cn(
                'relative flex cursor-default select-none items-center outline-none transition-colors focus-visible:bg-fill-highlight-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                className
            )}
            asChild
            {...props}
        >
            <Button.Root menuItem>
                <Button.Icon>
                    <ContextMenuPrimitive.ItemIndicator className="relative">
                        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-black dark:bg-white" />
                    </ContextMenuPrimitive.ItemIndicator>
                </Button.Icon>
                <Button.Label menuItem>{children}</Button.Label>
            </Button.Root>
        </ContextMenuPrimitive.RadioItem>
    )
)
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
        inset?: boolean
    }
>(
    ({ className, inset, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.Label
            ref={ref}
            className={cn('px-2 pt-1.5 pb-1 text-sm font-semibold', inset && 'pl-8', className)}
            {...props}
        />
    )
)
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(
    ({ className, ...props }, ref): JSX.Element => (
        <ContextMenuPrimitive.Separator
            ref={ref}
            className={cn('-mx-1 my-1 h-px bg-border-primary', className)}
            {...props}
        />
    )
)
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

export {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
}
