import type { Preview } from '@storybook/react-vite';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono/400.css';
// Storybook consumes the same built CSS that apps get from `@pripman/design-system/css`.
import '../dist/pds.css';
import { pdsTheme } from './theme';

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark (default)' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? 'dark';
      // Theme the whole iframe (body background, dialogs), and wrap the story so
      // previews embedded in docs pages show the themed canvas too.
      document.documentElement.dataset.theme = theme;
      return (
        <div
          data-theme={theme}
          style={{
            background: 'var(--pds-color-canvas)',
            color: 'var(--pds-color-fg)',
            fontFamily: 'var(--pds-font-family-sans)',
            padding: '1.5rem',
            borderRadius: 8,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'padded',
    docs: { theme: pdsTheme },
    controls: { expanded: true },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Components', 'Examples'] },
    },
  },
};

export default preview;
