// Button.tsx
import './Button.css'

import { cva, VariantProps } from 'cva'
import { cn } from 'lib/utils/css-classes'
import React, {
    ComponentPropsWithoutRef,
    createContext,
    ElementType,
    forwardRef,
    ReactNode,
    Ref,
    useContext,
    useState,
} from 'react'

/* -------------------------------------------------------------------------- */
/*                           Constants & Types                                */
/* -------------------------------------------------------------------------- */

const BUTTON_HEIGHT_SM = 'h-[var(--button-height-sm)]'
const BUTTON_ICON_WIDTH_SM = 'w-[var(--button-height-sm)]'
const BUTTON_HEIGHT_BASE = 'h-[var(--button-height-base)]'
const BUTTON_ICON_WIDTH_BASE = 'w-[var(--button-height-base)]'
const BUTTON_HEIGHT_LG = 'h-[var(--button-height-lg)]'
const BUTTON_ICON_WIDTH_LG = 'w-[var(--button-height-lg)]'

type ButtonIntent = 'default' | 'outline'

const BUTTON_INTENT: Record<ButtonIntent, string> = {
    default:
        'text-primary hover:bg-fill-highlight-100 data-[state=open]:bg-fill-highlight-50 data-[state=checked]:bg-fill-highlight-50',
    outline: 'text-primary border border-primary hover:border-tertiary hover:bg-fill-highlight-50',
}

export type ButtonSize = 'sm' | 'base' | 'lg'

/* -------------------------------------------------------------------------- */
/*                           Polymorphic Type Helpers                         */
/* -------------------------------------------------------------------------- */

type PolymorphicRef<E extends ElementType> = Ref<React.ElementRef<E>>

/**
 * PolymorphicComponentProps
 * - E extends ElementType: The HTML element or React component to render.
 * - P: Additional props specific to our custom component logic.
 */
type PolymorphicComponentProps<E extends ElementType, P> = P &
    Omit<ComponentPropsWithoutRef<E>, keyof P> & {
        as?: E
        children?: ReactNode
        ref?: PolymorphicRef<E>
    }

/* -------------------------------------------------------------------------- */
/*                           Button Context & Hook                            */
/* -------------------------------------------------------------------------- */

interface ButtonContextValue {
    isPressedContext: boolean
    sizeContext: ButtonSize
    intentContext: ButtonIntent
    setIsPressedContext: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonContext = createContext<ButtonContextValue | null>(null)

function useButtonContext(): ButtonContextValue {
    const context = useContext(ButtonContext)
    if (!context) {
        throw new Error('Button compound components must be used within <Button.Root>.')
    }
    return context
}

/* -------------------------------------------------------------------------- */
/*                              Button.Root                                   */
/* -------------------------------------------------------------------------- */

const buttonVariants = cva({
    base: `
        group/button-root
        inline-flex 
        w-fit 
        items-center 
        justify-center 
        gap-1 
        px-[5px] 
        py-[3px] 
        rounded-md 
        transition-colors 
        duration-100
    `,
    variants: {
        intent: {
            default: BUTTON_INTENT.default,
            outline: BUTTON_INTENT.outline,
        },
        size: {
            sm: 'px-[var(--button-padding-x-sm)] py-[var(--button-padding-y-sm)] ' + BUTTON_HEIGHT_SM,
            base: 'px-[var(--button-padding-x-base)] py-[var(--button-padding-y-base)] ' + BUTTON_HEIGHT_BASE,
            lg: 'px-[var(--button-padding-x-lg)] py-[var(--button-padding-y-lg)] ' + BUTTON_HEIGHT_LG,
        },
        fullWidth: {
            true: 'w-full',
            false: '',
        },
        menuItem: {
            true: 'w-full justify-between',
            false: '',
        },
    },
    defaultVariants: {
        intent: 'default',
        size: 'base',
    },
})

export interface ButtonRootProps extends VariantProps<typeof buttonVariants> {
    // You can add your own custom props here, for instance "disabled?: boolean;"
    // We'll demonstrate a simple onClick approach
    onClick?: React.MouseEventHandler
    fullWidth?: boolean
    menuItem?: boolean
}

function ButtonRootComponent<E extends ElementType = 'button'>(
    {
        as,
        onClick,
        children,
        intent,
        size,
        className,
        fullWidth,
        menuItem,
        ...props
    }: PolymorphicComponentProps<E, ButtonRootProps>,
    forwardedRef: PolymorphicRef<E>
): JSX.Element {
    const [isPressed, setIsPressed] = useState(false)
    const Component = as || 'button'

    // Detect if the underlying element is actually a native <button>
    const isNativeButton = Component === 'button'

    // Optional: If rendering something else (like <div>), we add "button-like" accessibility
    const handleKeyDown = (e: React.KeyboardEvent): void => {
        // Only trigger if the key event happened on the parent (currentTarget),
        // not a nested child.
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
        }
    }

    // If not a native button, add role="button", tabIndex=0, and handle keyboard activation
    const a11yProps = !isNativeButton
        ? {
              role: 'button',
              tabIndex: 0,
              onKeyDown: handleKeyDown,
          }
        : {}

    const handleMouseDown = (): void => setIsPressed(true)
    const handleMouseUp = (): void => setIsPressed(false)

    const contextValue = {
        isPressedContext: isPressed,
        setIsPressedContext: setIsPressed,
        sizeContext: size || 'base',
        intentContext: intent || 'default',
    }

    return (
        <ButtonContext.Provider value={contextValue}>
            <Component
                ref={forwardedRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={onClick}
                className={cn(buttonVariants({ intent, size, fullWidth, menuItem }), className)}
                {...a11yProps}
                {...props}
            >
                {children}
            </Component>
        </ButtonContext.Provider>
    )
}

/**
 * Wrap in forwardRef and type-assert so we can preserve the polymorphic signature.
 */
const ButtonRoot = forwardRef(ButtonRootComponent) as <E extends ElementType = 'button'>(
    props: PolymorphicComponentProps<E, ButtonRootProps>
) => JSX.Element

/* -------------------------------------------------------------------------- */
/*                              Button.Icon                                   */
/* -------------------------------------------------------------------------- */

const iconVariants = cva({
    base: `
        flex
        items-center
        justify-center
        relative
        first:-mr-[2px]
        first:-ml-1
        last:-mr-1
        last:-ml-[2px]
        shrink-0
        transition-all
        duration-100
    `,
    variants: {
        intent: {
            default: '',
            outline: '',
        },
        size: {
            sm: 'size-5 [&>*]:size-3 only:-mx-[2px]',
            base: 'size-6 [&>*]:size-4 only:-mx-[7px]',
            lg: 'size-7 [&>*]:size-5 only:-mx-[9px]',
        },
        isTrigger: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        // Only if trigger does it have styles
        {
            intent: 'default',
            isTrigger: true,
            className: BUTTON_INTENT.default,
        },
        {
            intent: 'outline',
            isTrigger: true,
            className: `${BUTTON_INTENT.outline} hover:bg-fill-highlight-100`,
        },

        // Make icon match the button height
        {
            size: 'sm',
            isTrigger: true,
            className: `
                first:mr-0
                first:ml-[calc(var(--button-padding-x-sm)*-1)] 
                last:mr-[calc(var(--button-padding-x-sm)*-1)] 
                last:ml-0
                ${BUTTON_HEIGHT_SM} 
                ${BUTTON_ICON_WIDTH_SM}
            `,
        },
        {
            size: 'base',
            isTrigger: true,
            className: `
                first:mr-0 
                first:ml-[calc(var(--button-padding-x-base)*-1)] 
                last:mr-[calc(var(--button-padding-x-base)*-1)]  
                last:ml-0 
                ${BUTTON_HEIGHT_BASE} 
                ${BUTTON_ICON_WIDTH_BASE}
            `,
        },
        {
            size: 'lg',
            isTrigger: true,
            className: `
                first:mr-0 
                first:ml-[calc(var(--button-padding-x-lg)*-1)] 
                last:mr-[calc(var(--button-padding-x-lg)*-1)] 
                last:ml-0  
                ${BUTTON_HEIGHT_LG} 
                ${BUTTON_ICON_WIDTH_LG}
            `,
        },
    ],
    defaultVariants: {
        intent: 'default',
        size: 'base',
    },
})

interface ButtonIconProps extends VariantProps<typeof iconVariants> {
    isTrigger?: boolean
    // Add any extra icon-specific props if needed
}

function ButtonIconComponent<E extends ElementType = 'span'>(
    { as, children, size, intent, isTrigger, ...props }: PolymorphicComponentProps<E, ButtonIconProps>,
    forwardedRef: PolymorphicRef<E>
): JSX.Element {
    const { isPressedContext, sizeContext, intentContext } = useButtonContext()
    const Component = as || 'span'

    // Example styling: scale icon if button is pressed
    const style = {
        display: 'inline-block',
        transform: isPressedContext ? 'scale(0.95)' : 'scale(1)',
    }

    return (
        <Component
            ref={forwardedRef}
            style={style}
            className={cn(
                iconVariants({
                    size: size || sizeContext,
                    intent: intent || intentContext,
                    isTrigger,
                })
            )}
            {...props}
        >
            {children}
        </Component>
    )
}

const ButtonIcon = forwardRef(ButtonIconComponent) as <E extends ElementType = 'span'>(
    props: PolymorphicComponentProps<E, ButtonIconProps>
) => JSX.Element

/* -------------------------------------------------------------------------- */
/*                              Button.Label                                  */
/* -------------------------------------------------------------------------- */

interface ButtonLabelProps {
    // Add any extra label-specific props if needed
    menuItem?: boolean
    className?: string
}

function ButtonLabelComponent<E extends ElementType = 'span'>(
    { as, children, menuItem, ...props }: PolymorphicComponentProps<E, ButtonLabelProps>,
    forwardedRef: PolymorphicRef<E>
): JSX.Element {
    const { isPressedContext } = useButtonContext()
    const Component = as || 'span'

    // Example styling: bolder text if button is pressed
    const style = {
        fontWeight: isPressedContext ? 'bold' : 'normal',
    }

    return (
        <Component ref={forwardedRef} style={style} className={cn(menuItem && 'w-full text-left')} {...props}>
            {children}
        </Component>
    )
}

const ButtonLabel = forwardRef(ButtonLabelComponent) as <E extends ElementType = 'span'>(
    props: PolymorphicComponentProps<E, ButtonLabelProps>
) => JSX.Element

/* -------------------------------------------------------------------------- */
/*                             Export as Button                               */
/* -------------------------------------------------------------------------- */

export const Button = {
    Root: ButtonRoot,
    Icon: ButtonIcon,
    Label: ButtonLabel,
}

/* -------------------------------------------------------------------------- */
/*                              Example Usage                                 */
/* -------------------------------------------------------------------------- */

/*
function Example() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Polymorphic Button Demo</h1>

            <Button.Root onClick={() => alert('Clicked default <button>!')}>
                <Button.Icon><IconSearch /></Button.Icon>
                <Button.Label>Search</Button.Label>
            </Button.Root>

            <br /><br />

            <Button.Root as="div" onClick={() => alert('Clicked <div> button-like!')}>
                <Button.Icon><IconSearch /></Button.Icon>
                <Button.Label>Save (as div)</Button.Label>
            </Button.Root>
        </div>
    );
}

export default Example;
*/
