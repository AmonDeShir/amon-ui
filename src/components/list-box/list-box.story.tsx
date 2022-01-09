import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './list-box';
import { useState } from 'react';
import { theme } from '../../themes/theme';

export default {
  title: 'ListBox',
  component: ListBox,
  argTypes: {
    onSelect: { action: 'select' },
    value: {   
      options: ['1', '2', '3', '+', 'none'],
      control: { type: 'radio' }  
    }
  },
} as ComponentMeta<typeof ListBox>;

const Item = styled.div`
  width: 100%;
  height: 100%;
  line-height: 65px;
  background: ${({theme}) => theme.colors.main};
  color: ${({theme}) => theme.colors.text};;
  text-align: center;
  font-size: 30px;
`;

Item.defaultProps = { theme }

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;
const TemplateMenu: ComponentStory<typeof ListBox> = (args) => {
  const [value, setValue] = useState(args.value ?? 'none');
 
  return <ListBox {...args} value={value} onSelect={setValue}/>
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  orientation: 'horizontal',
  itemWidth: 41,
  itemHeight: 65,
  value: '2',
  items: [
    { key: "1", data: <Item>1</Item> },
    { key: "2", data: <Item>2</Item> },
    { key: "3", data: <Item>3</Item> },
    { key: "+", data: <Item>+</Item> },
  ],
};

export const Vertical = Template.bind({});
Vertical.args = {
  orientation: 'vertical',
  itemWidth: 41,
  itemHeight: 65,
  value: '2',
  items: [
    { key: "1", data: <Item>1</Item> },
    { key: "2", data: <Item>2</Item> },
    { key: "3", data: <Item>3</Item> },
    { key: "+", data: <Item>+</Item> },
  ],
};

export const HorizontalMenu = TemplateMenu.bind({});
HorizontalMenu.args = {
  orientation: 'horizontal',
  itemWidth: 41,
  itemHeight: 65,
  value: '2',
  items: [
    { key: "1", data: <Item>1</Item> },
    { key: "2", data: <Item>2</Item> },
    { key: "3", data: <Item>3</Item> },
    { key: "+", data: <Item>+</Item> },
  ],
};

export const VerticalMenu = TemplateMenu.bind({});
VerticalMenu.args = {
  orientation: 'vertical',
  itemWidth: 41,
  itemHeight: 65,
  value: '2',
  items: [
    { key: "1", data: <Item>1</Item> },
    { key: "2", data: <Item>2</Item> },
    { key: "3", data: <Item>3</Item> },
    { key: "+", data: <Item>+</Item> },
  ],
};

