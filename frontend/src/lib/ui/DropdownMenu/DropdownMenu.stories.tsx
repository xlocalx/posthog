import { IconChevronRight, IconSearch } from '@posthog/icons'
import { LemonSelect } from '@posthog/lemon-ui'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import type { Meta } from '@storybook/react'
import { Button } from 'lib/ui/Button/Button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from 'lib/ui/DropdownMenu/DropdownMenu'
import { useState } from 'react'

const meta = {
    title: 'UI/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta

type Checked = DropdownMenuCheckboxItemProps['checked']

export function Default(): JSX.Element {
    const [size, setSize] = useState<'sm' | 'base' | 'lg'>('base')
    const [radioChoice, setRadioChoice] = useState<'beers' | 'wines' | 'spirits'>('beers')
    const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
    const [showPanel, setShowPanel] = useState<Checked>(false)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="size">Select size</label>
                <LemonSelect
                    id="size"
                    className="max-w-[200px]"
                    value={size}
                    onChange={(value) => setSize(value as 'sm' | 'base' | 'lg')}
                    options={[
                        { value: 'sm', label: 'Small' },
                        { value: 'base', label: 'Base' },
                        { value: 'lg', label: 'Large' },
                    ]}
                />
            </div>

            <div className="flex gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button.Root size={size}>
                            <Button.Icon>
                                <IconSearch />
                            </Button.Icon>
                            <Button.Label>Checkboxes ({size})</Button.Label>
                        </Button.Root>
                    </DropdownMenuTrigger>

                    {/* The Dropdown content menu */}
                    <DropdownMenuContent loop align="start" className="min-w-[200px]" size={size}>
                        <DropdownMenuLabel>Projects</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                            Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showActivityBar}
                            onCheckedChange={setShowActivityBar}
                            disabled
                        >
                            Activity Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                            Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button.Root size={size}>
                            <Button.Icon>
                                <IconSearch />
                            </Button.Icon>
                            <Button.Label>Radio group ({size})</Button.Label>
                        </Button.Root>
                    </DropdownMenuTrigger>

                    {/* The Dropdown content menu */}
                    <DropdownMenuContent loop align="start" className="min-w-[200px]" size={size}>
                        <DropdownMenuLabel>Projects</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={radioChoice}
                            onValueChange={(value) => setRadioChoice(value as 'beers' | 'wines' | 'spirits')}
                        >
                            <DropdownMenuRadioItem value="beers">Beers</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="wines" disabled>
                                Wines
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="spirits">Spirits</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button.Root size={size}>
                            <Button.Icon>
                                <IconSearch />
                            </Button.Icon>
                            <Button.Label>Dropdown ({size})</Button.Label>
                            <Button.Icon className="rotate-90 group-data-[state=open]/button-root:rotate-270">
                                <IconChevronRight />
                            </Button.Icon>
                        </Button.Root>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent loop align="start" size={size}>
                        <DropdownMenuLabel>Projects</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem to="/">Link 1</DropdownMenuItem>
                        <DropdownMenuItem to="/">Link 2</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem to="/">Sub link 1</DropdownMenuItem>
                                <DropdownMenuItem to="/">Sub link 2</DropdownMenuItem>
                                <DropdownMenuItem to="/">Sub link 3</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
