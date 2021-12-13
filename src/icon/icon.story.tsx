import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon } from './icon';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' } 
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/mkxsxfaLheAJFzjRldXy4c/Untitled?node-id=4%3A128',
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Pencil = Template.bind({});
Pencil.args = {
  type: 'Pencil',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'none',
  clickAnimation: 'none',
};

export const Eye = Template.bind({});
Eye.args = {
  type: 'Eye',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'none',
  clickAnimation: 'none',
};

export const Text = Template.bind({});
Text.args = {
  type: 'Text',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'none',
  clickAnimation: 'none',
};

export const Bin = Template.bind({});
Bin.args = {
  type: 'Bin',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'none',
  clickAnimation: 'none',
};

export const Plus = Template.bind({});
Plus.args = {
  type: 'Plus',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'none',
  clickAnimation: 'none',
};

export const Shake = Template.bind({});
Shake.args = {
  type: 'Bin',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'shake',
  clickAnimation: 'scale',

};

export const Spin = Template.bind({});
Spin.args = {
  type: 'Bin',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'spin',
  clickAnimation: 'scale',
};

export const Scale = Template.bind({});
Scale.args = {
  type: 'Bin',
  backgroundColor: '#000000',
  size: 'small',
  hoverAnimation: 'scale',
  clickAnimation: 'spin',
};
