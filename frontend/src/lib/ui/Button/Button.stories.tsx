import { IconFolderOpen, IconSearch } from '@posthog/icons'
import type { Meta } from '@storybook/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'lib/ui/DropdownMenu/DropdownMenu'
import { useState } from 'react'

import { Button } from './Button'

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

export function Default(): JSX.Element {
    return <Button>Default</Button>
}

export function IconOnly(): JSX.Element {
    return (
        <div className="flex gap-4">
            <Button
                iconOnly
                size="sm"
                icon={{
                    iconProps: {
                        size: 'sdsdds',
                    },
                    children: <IconSearch />,
                }}
            />
            <Button
                iconOnly
                icon={{
                    iconProps: {
                        size: 'sm',
                    },
                    children: <IconSearch />,
                }}
            />
            <Button
                iconOnly
                icon={{
                    iconProps: {
                        size: 'md',
                    },
                    children: <IconSearch />,
                }}
            />
            <Button
                iconOnly
                icon={{
                    iconProps: {
                        size: 'lg',
                    },
                    children: <IconSearch />,
                }}
            />
        </div>
    )
}

// Button with dropdown
export function WithDropdown(): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <Button
            prefix={{
                iconProps: {
                    size: 'lg',
                },
                children: <IconFolderOpen />,
            }}
            suffix={{
                type: 'dropdown',
                children: (
                    <DropdownMenu
                        onOpenChange={(open) => {
                            setIsDropdownOpen(open)
                        }}
                        open={isDropdownOpen}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button iconOnly as="div" iconProps={{ size: 'lg' }}>
                                <IconSearch />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent loop align="start">
                            <DropdownMenuLabel>Projects</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Another one</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            }}
            onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
            }}
        >
            Dropdown
        </Button>
    )
}
