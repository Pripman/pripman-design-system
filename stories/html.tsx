/** Helper for "plain HTML + CSS" stories: renders markup as-is and shows it as the docs source. */
export function html(markup: string) {
  const code = markup.trim();
  return {
    render: () => <div dangerouslySetInnerHTML={{ __html: code }} />,
    parameters: {
      controls: { disable: true },
      docs: { source: { code, language: 'html' } },
    },
  };
}
