import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import tokens from '../../dist/tokens.json';

interface Row {
  name: string;
  cssVar: string;
  value: string;
  resolved: string;
  description?: string;
}

const meta: Meta = {
  title: 'Foundations',
  parameters: { controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

const primitive = tokens.primitive as Row[];
const group = (prefix: string) => primitive.filter((t) => t.name.startsWith(prefix));

const mono: CSSProperties = { fontFamily: 'var(--pds-font-family-mono)', fontSize: 12 };
const muted: CSSProperties = { ...mono, color: 'var(--pds-color-fg-muted)' };

function Swatch({ row, label }: { row: Row; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 132 }}>
      <div
        title={row.description}
        style={{
          height: 56,
          borderRadius: 8,
          background: `var(${row.cssVar})`,
          border: '1px solid var(--pds-color-border)',
        }}
      />
      <strong style={{ fontSize: 13 }}>{label}</strong>
      <span style={muted}>{row.cssVar}</span>
      <span style={muted}>{row.resolved}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 className="pds-heading-4" style={{ marginBottom: 12 }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

const palettes = ['neutral', 'red', 'green', 'oak', 'amber', 'wine', 'yellow', 'blue'];

export const PrimitiveColors: Story = {
  name: 'Colors: palette',
  render: () => (
    <div>
      {palettes.map((p) => (
        <Section key={p} title={p}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {group(`color.${p}.`).map((row) => (
              <Swatch key={row.name} row={row} label={row.name.split('.').at(-1)!} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  ),
};

export const SemanticColors: Story = {
  name: 'Colors: semantic',
  render: (_, { globals }) => {
    const theme = (globals.theme as 'dark' | 'light') ?? 'dark';
    const rows = tokens.semantic[theme] as Row[];
    return (
      <div>
        <p className="pds-text pds-text--muted" style={{ marginBottom: 16 }}>
          Semantic tokens for the <strong>{theme}</strong> theme. Use these in apps, not the raw palette.
          Toggle the theme in the toolbar.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {rows.map((row) => (
            <Swatch key={row.name} row={row} label={row.name.replace('color.', '')} />
          ))}
        </div>
      </div>
    );
  },
};

export const Typography: Story = {
  render: () => (
    <div>
      <Section title="Type scale">
        {group('font.size.').map((row) => (
          <div key={row.name} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
            <span style={{ ...muted, width: 180 }}>
              {row.cssVar}
              <br />
              {row.resolved}
            </span>
            <span style={{ fontSize: `var(${row.cssVar})` }}>Pripman looper 120 BPM</span>
          </div>
        ))}
      </Section>
      <Section title="Headings">
        <h1 className="pds-heading-1">Heading 1</h1>
        <h2 className="pds-heading-2">Heading 2</h2>
        <h3 className="pds-heading-3">Heading 3</h3>
        <h4 className="pds-heading-4">Heading 4</h4>
        <p className="pds-text">Body text. The quick brown fox jumps over the lazy dog.</p>
        <p className="pds-text pds-text--sm pds-text--muted">Small, muted text.</p>
        <span className="pds-label">Label</span>
      </Section>
      <Section title="Families">
        {group('font.family.').map((row) => (
          <p key={row.name} style={{ fontFamily: `var(${row.cssVar})`, fontSize: 20, margin: '0 0 8px' }}>
            {row.name.split('.').at(-1)}: Aa Bb Cc 0123456789
          </p>
        ))}
      </Section>
    </div>
  ),
};

export const SpacingRadiusShadow: Story = {
  name: 'Spacing, radius & shadow',
  render: () => (
    <div>
      <Section title="Spacing">
        {group('space.').map((row) => (
          <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
            <span style={{ ...muted, width: 180 }}>
              {row.cssVar} ({row.resolved})
            </span>
            <div style={{ width: `var(${row.cssVar})`, height: 16, background: 'var(--pds-color-surface-oak)' }} />
          </div>
        ))}
      </Section>
      <Section title="Radius">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {group('radius.').map((row) => (
            <div key={row.name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: `var(${row.cssVar})`,
                  background: 'var(--pds-color-surface-raised)',
                  border: '1px solid var(--pds-color-border-strong)',
                }}
              />
              <span style={muted}>{row.name.split('.').at(-1)}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Shadow">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {group('shadow.').map((row) => (
            <div key={row.name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 120,
                  height: 72,
                  borderRadius: 8,
                  background: 'var(--pds-color-surface)',
                  boxShadow: `var(${row.cssVar})`,
                }}
              />
              <span style={muted}>{row.name.split('.').at(-1)}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Oak: Story = {
  name: 'Oak',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <div className="pds-surface-oak" style={{ width: 260, height: 140, borderRadius: 12, padding: 16 }}>
        <strong>.pds-surface-oak</strong>
        <p style={{ ...mono, margin: '8px 0 0' }}>surface-oak + texture-oak</p>
      </div>
      <div className="pds-surface-oak-strong" style={{ width: 260, height: 140, borderRadius: 12, padding: 16 }}>
        <strong>.pds-surface-oak-strong</strong>
        <p style={{ ...mono, margin: '8px 0 0' }}>surface-oak-strong + texture-oak</p>
      </div>
    </div>
  ),
};
