import { IconCheck, IconChevronRight } from '@posthog/icons'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Button, ButtonSize } from 'lib/ui/Button/Button'
import { cn } from 'lib/utils/css-classes'
import * as React from 'react'
import { createContext, useContext } from 'react'

/* -------------------------------------------------------------------------- */
/*                           Button Context & Hook                            */
/* -------------------------------------------------------------------------- */

type DropdownSize = ButtonSize

interface DropdownMenuContextValue {
    sizeContext: DropdownSize
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext(): DropdownMenuContextValue {
    const context = useContext(DropdownMenuContext)
    if (!context) {
        throw new Error('DropdownMenu compound components must be used within <DropdownMenu.Root>.')
    }
    return context
}

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
        inset?: boolean
        size?: DropdownSize
    }
>(({ className, inset, children, size, ...props }, ref): JSX.Element => {
    const { sizeContext } = useDropdownMenuContext()

    return (
        <DropdownMenuPrimitive.SubTrigger ref={ref} className={cn(inset && 'pl-8', className)} asChild {...props}>
            <Button.Root menuItem size={size || sizeContext}>
                <Button.Label>{children}</Button.Label>
                <Button.Icon>
                    <IconChevronRight />
                </Button.Icon>
            </Button.Root>
        </DropdownMenuPrimitive.SubTrigger>
    )
})
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(
    ({ className, ...props }, ref): JSX.Element => (
        <DropdownMenuPrimitive.SubContent
            ref={ref}
            className={cn(
                'z-top min-w-[8rem] max-w-[200px] overflow-hidden rounded-md border bg-surface-primary p-1 text-primary shadow-md',
                className
            )}
            {...props}
        />
    )
)
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
        size?: DropdownSize
    }
>(({ className, sideOffset = 4, size, ...props }, ref): JSX.Element => {
    const contextValue = {
        sizeContext: size || 'base',
    }

    return (
        <DropdownMenuContext.Provider value={contextValue}>
            <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                    ref={ref}
                    sideOffset={sideOffset}
                    className={cn(
                        'z-top min-w-[8rem] max-w-[200px] overflow-hidden rounded-md border bg-surface-primary p-1 text-primary shadow-md',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                        className
                    )}
                    {...props}
                />
            </DropdownMenuPrimitive.Portal>
        </DropdownMenuContext.Provider>
    )
})
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
        inset?: boolean
        size?: DropdownSize
    }
>(({ className, inset, children, size, ...props }, ref): JSX.Element => {
    const { sizeContext } = useDropdownMenuContext()

    return (
        <DropdownMenuPrimitive.Item ref={ref} className={cn(inset && 'pl-8', className)} asChild {...props}>
            <Button.Root menuItem size={size || sizeContext}>
                <Button.Label>{children}</Button.Label>
            </Button.Root>
        </DropdownMenuPrimitive.Item>
    )
})
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
        size?: DropdownSize
    }
>(({ className, children, checked, size, ...props }, ref): JSX.Element => {
    const { sizeContext } = useDropdownMenuContext()

    return (
        <DropdownMenuPrimitive.CheckboxItem
            ref={ref}
            className={cn(
                'relative flex cursor-default select-none items-center rounded-sm outline-none transition-colors focus:bg-fill-highlight-100 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                className
            )}
            checked={checked}
            asChild
            {...props}
        >
            <Button.Root menuItem size={size || sizeContext}>
                <Button.Icon>
                    <DropdownMenuPrimitive.ItemIndicator className="mt-[-6px]">
                        <IconCheck />
                    </DropdownMenuPrimitive.ItemIndicator>
                </Button.Icon>
                <Button.Label menuItem>{children}</Button.Label>
            </Button.Root>
        </DropdownMenuPrimitive.CheckboxItem>
    )
})

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
        size?: DropdownSize
    }
>(({ className, children, size, ...props }, ref): JSX.Element => {
    const { sizeContext } = useDropdownMenuContext()

    return (
        <DropdownMenuPrimitive.RadioItem
            ref={ref}
            className={cn(
                'relative flex cursor-default select-none items-center outline-none transition-colors focus:bg-fill-highlight-100 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                className
            )}
            asChild
            {...props}
        >
            <Button.Root menuItem size={size || sizeContext}>
                <Button.Icon>
                    <DropdownMenuPrimitive.ItemIndicator className="relative">
                        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-black dark:bg-white" />
                    </DropdownMenuPrimitive.ItemIndicator>
                </Button.Icon>
                <Button.Label menuItem>{children}</Button.Label>
            </Button.Root>
        </DropdownMenuPrimitive.RadioItem>
    )
})
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
        inset?: boolean
    }
>(
    ({ className, inset, ...props }, ref): JSX.Element => (
        <DropdownMenuPrimitive.Label
            ref={ref}
            className={cn('px-2 pt-1.5 pb-1 text-sm font-semibold', inset && 'pl-8', className)}
            {...props}
        />
    )
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(
    ({ className, ...props }, ref): JSX.Element => (
        <DropdownMenuPrimitive.Separator
            ref={ref}
            className={cn('-mx-1 my-1 h-px bg-surface-secondary', className)}
            {...props}
        />
    )
)
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): JSX.Element => {
    return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
}
