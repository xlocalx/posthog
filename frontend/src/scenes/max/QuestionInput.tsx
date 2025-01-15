import { IconArrowRight, IconLineGraph } from '@posthog/icons'
import { LemonButton, LemonTag, LemonTextArea } from '@posthog/lemon-ui'
import clsx from 'clsx'
import { useActions, useValues } from 'kea'
import { useEffect, useRef } from 'react'

import { maxLogic } from './maxLogic'

export function QuestionInput(): JSX.Element {
    const { question, threadGrouped, threadLoading, inputDisabled, submissionDisabledReason, sceneContext } =
        useValues(maxLogic)
    const { askMax, setQuestion } = useActions(maxLogic)

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const isFloating = threadGrouped.length > 0

    useEffect(() => {
        if (threadLoading) {
            textAreaRef.current?.focus() // Focus after submit
        }
    }, [threadLoading])

    return (
        <div
            className={clsx(
                'flex flex-col items-center gap-2',
                !isFloating
                    ? 'w-[min(44rem,100%)] relative'
                    : 'w-full max-w-[43rem] sticky z-10 self-center p-1 mx-4 mb-3 bottom-3 border border-[var(--border-primary)] rounded-lg backdrop-blur bg-[var(--glass-bg-3000)]'
            )}
        >
            <LemonTextArea
                ref={textAreaRef}
                value={question}
                onChange={(value) => setQuestion(value)}
                placeholder={threadLoading ? 'Thinking…' : isFloating ? 'Ask follow-up' : 'Ask away'}
                onPressEnter={() => {
                    if (question && !submissionDisabledReason) {
                        askMax(question)
                    }
                }}
                disabled={inputDisabled}
                minRows={1}
                maxRows={10}
                className={clsx('p-3 pr-12', isFloating && 'border-border-bold')}
            />
            <div className={clsx('absolute top-[6px] flex items-center', isFloating ? 'right-3' : 'right-2')}>
                <LemonButton
                    type={isFloating && !question ? 'secondary' : 'primary'}
                    onClick={() => askMax(question)}
                    tooltip="Let's go!"
                    disabledReason={submissionDisabledReason}
                    size="small"
                    icon={<IconArrowRight />}
                />
            </div>
            {Object.keys(sceneContext).length > 0 && (
                <div className="flex items-center gap-1.5 cursor-default flex-wrap">
                    {Object.entries(sceneContext).map(([key, value]) => (
                        <LemonTag key={key} icon={<IconLineGraph />} type="muted" closable>
                            {value.title}
                        </LemonTag>
                    ))}
                </div>
            )}
        </div>
    )
}
