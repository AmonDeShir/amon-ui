import { ComponentStory } from '@storybook/react';
import { theme } from '../../themes/theme';
import { TextBox } from './text-box';

export default {
  component: TextBox,
  title: 'TextBox',
  argTypes: {
    onEdit: { action: 'edit' },
    size: {   
      options: Object.keys(theme.font),
      control: { type: 'radio' }  
    },
    type: {
      options: ['text', 'password', 'email'],
      control: { type: 'radio' }  
    },
    border: {
      options: ['none', 'around', 'single-line'],
      control: { type: 'radio' }  
    }
  }
};

const Template: ComponentStory<typeof TextBox> = (args) => <TextBox {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  size: 'small',
  placeholder: 'Example Text',
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  size: 'small',
  placeholder: 'example@mail.com',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  size: 'small',
  placeholder: '************',
};

export const SingleLineBorder = Template.bind({});
SingleLineBorder.args = {
  size: 'small',
  placeholder: 'Example Text (border: single-line)',
  border: 'single-line'
};

export const BorderAround = Template.bind({});
BorderAround.args = {
  size: 'small',
  placeholder: 'Example Text (border: around)',
  border: 'around'
};

export const WithoutBorder = Template.bind({});
WithoutBorder.args = {
  size: 'small',
  placeholder: 'Example Text (border: none)',
  border: 'none'
};

