import { ComponentStory, ComponentMeta } from '@storybook/react';
import { theme } from '../../themes/theme';
import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'click' },
    size: {   
      options: Object.keys(theme.font),
      control: { type: 'radio' }  
    }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "click me",
};
