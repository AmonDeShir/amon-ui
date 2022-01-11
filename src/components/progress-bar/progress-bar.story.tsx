import { ComponentStory } from '@storybook/react';
import { theme } from '../../themes/theme';
import { ProgressBar } from './progress-bar';

export default {
  component: ProgressBar,
  title: 'ProgressBar',
  argTypes: {
    size: {
      options: Object.keys(theme.font),
      control: { type: 'radio' }  
    },
    textPosition: {   
      options: [ 'left', 'right', 'up', 'down', 'center' ],
      control: { type: 'radio' }  
    },
    format: {   
      options: [ 'percent', 'fraction', 'none' ],
      control: { type: 'radio' }  
    },
  }
};

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: 'text',
  textPosition: 'center',
  format: 'percent',
  reverse: false,
};

export const Inverted = Template.bind({});
Inverted.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: 'text',
  textPosition: 'center',
  format: 'percent',
  reverse: true,
};

export const Fraction = Template.bind({});
Fraction.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: '',
  textPosition: 'center',
  format: 'fraction',
  reverse: false,
};

export const None = Template.bind({});
None.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: 'center',
  textPosition: 'center',
  format: 'none',
  reverse: false,
};

export const Up = Template.bind({});
Up.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: 'up',
  textPosition: 'up',
  format: 'none',
  reverse: false,
};

export const Down = Template.bind({});
Down.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: 'down',
  textPosition: 'down',
  format: 'none',
  reverse: false,
};

export const Right = Template.bind({});
Right.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: 'right',
  textPosition: 'right',
  format: 'none',
  reverse: false,
};

export const Left = Template.bind({});
Left.args = {
  size: 'normal',
  max: 200,
  value: 140,
  text: 'left',
  textPosition: 'left',
  format: 'none',
  reverse: false,
};
