import { ComponentStory } from '@storybook/react';
import { theme } from '../../themes/theme';
import { Placeholder } from './placeholder';
import { TextBox } from '../text-box/text-box';

export default {
  component: Placeholder,
  title: 'Components/Placeholder',
  argTypes: {
    animation: {   
      options: [ 'none', 'move-from-center', 'disappear', 'scale' ],
      control: { type: 'radio' }  
    },
    color: {   
      options: Object.keys(theme.colors),
      control: { type: 'radio' }  
    },
    size: {
      options: Object.keys(theme.font),
      control: { type: 'radio' }  
    },
    weight: {
      options: [ 'normal', 'bold', 'bolder', 'lighter' ],
      control: { type: 'radio' }  
    },
    positionVertical: {
      options: [ 'top', 'center', 'bottom' ],
      control: { type: 'radio' }  
    },
    positionHorizontal: {
      options: [ 'left', 'center', 'right' ],
      control: { type: 'radio' }  
    },
  }
};

const SingleLineBorderTemplate: ComponentStory<typeof Placeholder> = (args) => (
  <Placeholder {...args} input={<TextBox size="big" border='single-line' />} />
);

export const SingleLineBorder = SingleLineBorderTemplate.bind({});
SingleLineBorder.args = {
  value: 'Placeholder',
  color: 'accent',
  weight: 'bold',
  positionHorizontal: 'left',
  positionVertical: 'top',
  animation: 'scale'
};


const FullBorderTemplate: ComponentStory<typeof Placeholder> = (args) => (
  <Placeholder {...args} input={<TextBox size="big" border='full' />} />
);

export const FullBorder = FullBorderTemplate.bind({});
FullBorder.args = {
  value: 'Placeholder',
  positionHorizontal: 'left',
  positionVertical: 'top',
  animation: 'move-from-center'
};


