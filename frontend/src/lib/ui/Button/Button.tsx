import { cva, VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils/css-classes'
import { ComponentPropsWithRef, ElementType, forwardRef } from 'react'

import { IconWrapper, IconWrapperProps } from '../IconWrapper/IconWrapper'

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'tertiary'
    children?: React.ReactNode
    prefix?: AffixElementProps
    suffix?: AffixElementProps
    icon?: AffixElementProps
    iconOnly?: boolean
    active?: boolean
    as?: ElementType
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps &
    Omit<ComponentPropsWithRef<T>, keyof ButtonBaseProps>

const buttonVariants = cva('inline-flex items-center justify-center', {
    variants: {
        size: {
            sm: 'text-[10px] h-[24px] data-[icon-only=true]:w-[24px]',
            md: 'text-[13px] h-[30px] data-[icon-only=true]:w-[30px]',
            lg: 'text-[16px] h-[36px] data-[icon-only=true]:w-[36px]',
        },
        intent: {
            primary: 'bg-transparent hover:bg-fill-highlight-100 data-[active=true]:bg-fill-highlight-50',
            secondary: 'bg-secondary text-secondary-foreground',
            tertiary: 'bg-tertiary text-tertiary-foreground',
        },
        iconOnly: {
            true: 'p-0 aspect-square place-content-center',
            false: '',
        },
        hasPrefix: {
            true: 'pl-[5px]',
            false: '',
        },
        hasSuffix: {
            true: 'pr-[5px]',
            false: '',
        },
    },
    defaultVariants: {
        intent: 'primary',
    },
})

type AffixElementProps = {
    className?: string
    type?: 'dropdown' | 'icon'
    children?: React.ReactNode
    iconProps?: Omit<IconWrapperProps, 'children'>
    ref?: React.Ref<HTMLDivElement>
}

const AffixElement = forwardRef<HTMLDivElement, AffixElementProps>(
    ({ className, type = 'icon', iconProps, ...props }, ref) => {
        if (type === 'icon') {
            return (
                <IconWrapper {...iconProps} className={cn(className)}>
                    {props.children}
                </IconWrapper>
            )
        }
        return <div ref={ref} className={cn(className)} {...props} />
    }
)

AffixElement.displayName = 'AffixElement'

export const Button = forwardRef(
    <T extends ElementType = 'button'>(
        {
            as,
            className,
            size = 'md',
            intent = 'primary',
            prefix,
            suffix,
            icon,
            iconOnly,
            children,
            active,
            hasPrefix,
            hasSuffix,
            ...props
        }: ButtonProps<T>,
        ref: React.ForwardedRef<any>
    ) => {
        const Component = as || 'button'

        return (
            <Component
                role={Component === 'button' ? 'button' : undefined}
                ref={ref}
                tabIndex={0}
                className={cn(
                    buttonVariants({
                        size,
                        iconOnly,
                        intent,
                        hasPrefix: prefix ? true : false,
                        hasSuffix: suffix ? true : false,
                    }),
                    className
                )}
                data-active={active || undefined}
                data-icon-only={iconOnly || undefined}
                {...props}
            >
                {prefix && <AffixElement {...prefix} className={prefix.className} />}

                {icon && iconOnly ? <AffixElement {...icon} className={icon.className} /> : <span>{children}</span>}

                {suffix && <AffixElement {...suffix} className={suffix.className} />}
            </Component>
        )
    }
)

Button.displayName = 'Button'
