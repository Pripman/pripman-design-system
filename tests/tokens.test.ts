import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// `npm test` builds tokens first, so dist/ is fresh here.
const root = join(__dirname, '..');
const dist = (f: string) => readFileSync(join(root, 'dist', f), 'utf8');

interface TokenRow {
  name: string;
  cssVar: string;
  resolved: string;
}
const data = JSON.parse(dist('tokens.json')) as {
  themes: string[];
  primitive: TokenRow[];
  semantic: Record<string, TokenRow[]>;
};

function luminance(hex: string): number {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`Not a 6-digit hex colour: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** [foreground, background, minimum ratio]. 4.5 = AA text, 3 = AA UI components / large text. */
const PAIRS: Array<[string, string, number]> = [
  ['fg', 'canvas', 4.5],
  ['fg', 'surface', 4.5],
  ['fg', 'surface-raised', 4.5],
  ['fg', 'surface-sunken', 4.5],
  ['fg-muted', 'canvas', 4.5],
  ['fg-muted', 'surface', 4.5],
  ['fg-muted', 'surface-sunken', 4.5],
  ['on-oak', 'surface-oak', 4.5],
  ['on-oak-strong', 'surface-oak-strong', 4.5],
  ['on-primary', 'primary', 4.5],
  ['on-primary', 'primary-hover', 4.5],
  ['on-primary', 'primary-active', 4.5],
  ['on-secondary', 'secondary', 4.5],
  ['on-secondary', 'secondary-hover', 4.5],
  ['on-accent', 'accent', 4.5],
  ['on-success', 'success', 4.5],
  ['on-warning', 'warning', 4.5],
  ['on-danger', 'danger', 4.5],
  ['on-info', 'info', 4.5],
  ['danger', 'surface', 4.5],
  ['digital-fg', 'digital-bg', 4.5],
  ['focus', 'canvas', 3],
  ['focus', 'surface', 3],
  ['border-strong', 'surface-sunken', 3],
  ['border-strong', 'surface', 3],
];

describe('tokens', () => {
  it('builds primitives and every theme', () => {
    expect(data.primitive.length).toBeGreaterThan(50);
    expect(data.themes).toEqual(['dark', 'light']);
  });

  it('resolves every reference', () => {
    const all = [...data.primitive, ...Object.values(data.semantic).flat()];
    for (const t of all) expect(t.resolved, t.name).not.toMatch(/\{/);
  });

  for (const theme of data.themes) {
    describe(`${theme} theme meets WCAG AA contrast`, () => {
      const colour = (name: string) => {
        const t = data.semantic[theme].find((x) => x.name === `color.${name}`);
        if (!t) throw new Error(`Missing semantic colour ${name}`);
        return t.resolved;
      };
      for (const [fg, bg, min] of PAIRS) {
        it(`${fg} on ${bg} >= ${min}:1`, () => {
          const ratio = contrast(colour(fg), colour(bg));
          expect(ratio, `${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(min);
        });
      }
    });
  }

  it('emits CSS variables with dark as the default theme', () => {
    const css = dist('tokens.css');
    expect(css).toContain('--pds-color-oak-500: #b88a55;');
    expect(css).toMatch(/:root,\n\[data-theme="dark"\] \{\n {2}color-scheme: dark;/);
    expect(css).toContain('[data-theme="light"]');
    expect(css).toContain('--pds-color-primary: var(--pds-color-red-600);');
  });

  it('maps semantic colours into a Tailwind v4 theme', () => {
    const tw = dist('tailwind.css');
    expect(tw).toContain('@theme inline');
    expect(tw).toContain('--color-surface: var(--pds-color-surface);');
    expect(tw).toContain('--color-pds-oak-500: var(--pds-color-oak-500);');
    expect(tw).toContain('--font-sans: var(--pds-font-family-sans);');
  });

  it('only uses defined tokens in component CSS', () => {
    const defined = new Set(dist('tokens.css').match(/--pds-[\w-]+(?=:)/g));
    defined.add('--pds-stack-gap'); // component-level custom property with a fallback
    const cssDir = join(root, 'src', 'css');
    const files = ['base.css', ...readdirSync(join(cssDir, 'components')).map((f: string) => `components/${f}`)];
    const missing: string[] = [];
    for (const file of files) {
      const css = readFileSync(join(cssDir, file), 'utf8');
      for (const [, name] of css.matchAll(/var\((--pds-[\w-]+)/g)) {
        if (!defined.has(name)) missing.push(`${file}: ${name}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('exposes resolved values and cssVar() to JS', async () => {
    const mod = await import('../dist/tokens.js');
    expect(mod.tokens.color.oak['500']).toBe('#b88a55');
    expect(mod.themes.dark.color.primary).toBe('#c31c23');
    expect(mod.cssVar('color.oak.500')).toBe('var(--pds-color-oak-500)');
  });
});
