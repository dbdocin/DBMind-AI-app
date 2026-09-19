/**
 * Renders a <script type="application/ld+json"> tag. `data` must always be
 * a code-controlled object (schema builders in lib/structuredData.ts), never
 * raw user input — dangerouslySetInnerHTML is safe here specifically because
 * of that constraint.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
