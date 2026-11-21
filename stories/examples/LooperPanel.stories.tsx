import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  DigitalDisplay,
  Stack,
  Switch,
  Tabs,
} from '../../src/react';

const meta: Meta = {
  title: 'Examples',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
};
export default meta;

const Track = ({ n, armed }: { n: number; armed?: boolean }) => (
  <Card variant="sunken">
    <CardBody>
      <Stack direction="row" justify="between">
        <Stack direction="row" gap="3">
          <strong>Track {n}</strong>
          {armed ? <Badge tone="primary">Armed</Badge> : <Badge>Idle</Badge>}
        </Stack>
        <Stack direction="row" gap="2">
          <Button size="sm" variant={armed ? 'primary' : 'secondary'}>
            {armed ? 'Stop' : 'Rec'}
          </Button>
          <Button size="sm" variant="ghost">
            Mute
          </Button>
        </Stack>
      </Stack>
    </CardBody>
  </Card>
);

export const Looper: StoryObj = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <Card variant="oak-frame">
        <CardHeader className="pds-surface-oak-strong">
          <CardTitle>Looper</CardTitle>
          <Stack direction="row" gap="3">
            <DigitalDisplay size="sm" value="4/4" />
            <DigitalDisplay size="sm" value="120.0" label="BPM" />
          </Stack>
        </CardHeader>
        <CardBody>
          <Stack gap="3">
            <Track n={1} armed />
            <Track n={2} />
            <Track n={3} />
          </Stack>
        </CardBody>
        <CardFooter>
          <Switch label="Metronome" defaultChecked />
          <Button variant="oak">Settings</Button>
          <Button variant="primary">Play all</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Budget: StoryObj = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <Tabs
        aria-label="Budget"
        items={[
          {
            id: 'month',
            label: 'This month',
            content: (
              <Stack direction="row" gap="4" wrap align="stretch">
                {[
                  ['Groceries', '2,350 / 3,000 kr', 'success', 'On track'],
                  ['Transport', '1,180 / 1,000 kr', 'danger', 'Over'],
                  ['Fun', '400 / 1,500 kr', 'info', 'Plenty left'],
                ].map(([title, amount, tone, status]) => (
                  <Card key={title} variant="raised" style={{ flex: '1 1 200px' }}>
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <Badge tone={tone as 'success' | 'danger' | 'info'}>{status}</Badge>
                    </CardHeader>
                    <CardBody>
                      <p className="pds-heading-3">{amount}</p>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            ),
          },
          { id: 'year', label: 'This year', content: <p className="pds-text">Yearly view.</p> },
        ]}
      />
    </div>
  ),
};
