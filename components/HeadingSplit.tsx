import { Fragment } from 'react'

/** Titular con una palabra pintada en dorado claro (#f6d98d), igual que el original. */
export default function HeadingSplit({ text, highlight }: { text: string; highlight?: string | null }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>
  const parts = text.split(highlight)
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span style={{ color: '#f6d98d' }}>{highlight}</span>}
        </Fragment>
      ))}
    </>
  )
}
