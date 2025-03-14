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

// import { Button } from './Button'
import { Button } from './Button'


const meta = {
    title: 'UI/Button',
    component: Button.Root,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Button.Root>

export default meta

export function Default(): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return <div className="flex flex-col gap-4">
        <Button.Root onClick={() => alert('Clicked default <button>!')}>
            <Button.Icon><IconSearch /></Button.Icon>
            <Button.Label>Regular button</Button.Label>
        </Button.Root>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button.Root onClick={() => console.log('Root clicked!')}>
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                    <Button.Label>Is all dropdown</Button.Label>
                </Button.Root>
            </DropdownMenuTrigger>

            {/* The Dropdown content menu */}
            <DropdownMenuContent loop align="start">
                <DropdownMenuLabel>Projects</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Project 1</DropdownMenuItem>
                <DropdownMenuItem>Project 2</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button.Root as="div" onClick={() => alert('Clicked default <div>!')}>
            <Button.Label>Has side action dropdown</Button.Label>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button.Icon as="button" onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
                        <IconSearch />
                    </Button.Icon>
                </DropdownMenuTrigger>

                <DropdownMenuContent loop align="start">
                    <DropdownMenuLabel>Projects</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Project 1</DropdownMenuItem>
                    <DropdownMenuItem>Project 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Button.Root>
    </div>
}