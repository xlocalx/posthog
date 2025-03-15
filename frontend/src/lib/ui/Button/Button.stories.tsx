import { IconSearch } from '@posthog/icons'
import type { Meta } from '@storybook/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'lib/ui/DropdownMenu/DropdownMenu'

// import { Button } from './Button'
import { Button } from './Button'

const meta = {
    title: 'UI/Button',
    component: Button.Root,
    tags: ['autodocs'],
} satisfies Meta<typeof Button.Root>

export default meta

export function Default(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <Button.Root className="" onClick={() => alert('Clicked default <button>!')}>
                <Button.Icon>
                    <IconSearch />
                </Button.Icon>
                <Button.Label>Regular button</Button.Label>
            </Button.Root>

            <Button.Root onClick={() => alert('Clicked default <button>!')}>
                <Button.Label>Regular button</Button.Label>
                <Button.Icon>
                    <IconSearch />
                </Button.Icon>
            </Button.Root>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button.Root className="">
                        <Button.Icon isTrigger>
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

            <Button.Root as="div" className="">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button.Icon as="button" isTrigger>
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

                <Button.Label>Has side action dropdown</Button.Label>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button.Icon as="button" isTrigger>
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
    )
}

export function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <Button.Root size="sm">
                    <Button.Label>Small button</Button.Label>
                </Button.Root>
                <Button.Root size="sm" intent="outline">
                    <Button.Label>Small button</Button.Label>
                </Button.Root>
                <Button.Root size="sm">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                    <Button.Label>Small button</Button.Label>
                </Button.Root>
                <Button.Root size="sm">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                </Button.Root>
                <Button.Root size="sm" intent="outline">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                </Button.Root>
            </div>
            <div className="flex gap-4">
                <Button.Root size="base">
                    <Button.Label>Base button</Button.Label>
                </Button.Root>
                <Button.Root size="base" intent="outline">
                    <Button.Label>Base button</Button.Label>
                </Button.Root>
                <Button.Root size="base">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                    <Button.Label>Base button</Button.Label>
                </Button.Root>
                <Button.Root size="base">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                </Button.Root>
                <Button.Root size="base" intent="outline">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                </Button.Root>
            </div>

            <div className="flex gap-4">
                <Button.Root size="lg">
                    <Button.Label>Large button</Button.Label>
                </Button.Root>
                <Button.Root size="lg" intent="outline">
                    <Button.Label>Large button</Button.Label>
                </Button.Root>
                <Button.Root size="lg">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                    <Button.Label>Large button</Button.Label>
                </Button.Root>
                <Button.Root size="lg">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                </Button.Root>
                <Button.Root size="lg" intent="outline">
                    <Button.Icon>
                        <IconSearch />
                    </Button.Icon>
                </Button.Root>
            </div>
        </div>
    )
}
