import { create } from 'storybook/theming/create';

/** Storybook UI chrome in the design system's own colours. */
export const pdsTheme = create({
  base: 'dark',
  brandTitle: 'Pripman Design System',
  brandUrl: 'https://github.com/Pripman/pripman-design-system',
  colorPrimary: '#c31c23',
  colorSecondary: '#b88a55',
  appBg: '#242424',
  appContentBg: '#333333',
  appPreviewBg: '#333333',
  appBorderColor: '#474747',
  appBorderRadius: 8,
  barBg: '#2a1618',
  barTextColor: '#d1dbe0',
  barSelectedColor: '#e8ae89',
  textColor: '#d1dbe0',
  textMutedColor: '#c5c5c9',
  fontBase: 'Roboto, system-ui, sans-serif',
  fontCode: '"Roboto Mono", ui-monospace, monospace',
});
