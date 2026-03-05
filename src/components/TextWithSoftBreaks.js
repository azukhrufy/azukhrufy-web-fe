/**
 * A component that renders text with soft line breaks, wrapping long words as needed.
 * Each line of text is rendered as a separate paragraph, with empty lines rendered as line breaks.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string|ReactNode} props.children - The text content to be rendered
 * @param {Object} props.rest - Additional props to be spread onto each paragraph element
 * @returns {ReactNode[]} An array of paragraph elements and line breaks
 */
export default function TextWithSoftBreaks({ children, ...rest }) {
  const lines = children?.trim().split(/\r?\n|\r|\n/g) ?? []

  if (lines.length === 0) {
    return null
  }

  const wrapStyle = {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto'
  }

  return lines.map((line, index) =>
    line ? (
      <p
        key={`line-${index}`}
        style={wrapStyle}
        {...rest}
      >
        {line}
      </p>
    ) : (
      <br key={`break-${index}`} />
    )
  )
}
