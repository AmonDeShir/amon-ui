import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScrollableContainer } from './scrollable-container';
import { theme } from "../themes/theme";

export default {
  title: 'ScrollableContainer',
  component: ScrollableContainer,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/mkxsxfaLheAJFzjRldXy4c/Untitled?node-id=3%3A71',
    },
  },
} as ComponentMeta<typeof ScrollableContainer>;

const Data = styled.div`
  width: 500px;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

Data.defaultProps = { theme }

const Template: ComponentStory<typeof ScrollableContainer> = (args) => (
  <ScrollableContainer {...args}>
    <Data>
      Litwo! Ojczyzno moja! Ty jesteś jak zdrowie, Ile cię trzeba cenić, ten
      tylko się dowie, Kto cię stracił. Dziś piękność twą w całej ozdobie Widzę
      i opisuję, bo tęsknię po tobie Panno święta, co Jasnej bronisz Częstochowy
      I w Ostrej świecisz Bramie! Ty, co gród zamkowy Nowogródzki ochraniasz z
      jego wiernym ludem! Jak mnie dziecko do zdrowia powróciłaś cudem, (Gdy od
      płaczącej matki pod Twoją opiekę Ofiarowany, martwą podniosłem powiekę I
      zaraz mogłem pieszo do Twych świątyń progu Iść za wrócone życie
      podziękować Bogu), Tak nas powrócisz cudem na Ojczyzny łono. Tymczasem
      przenoś moją duszę utęsknioną Do tych pagórków leśnych, do tych łąk
      zielonych, Szeroko nad błękitnym Niemnem rozciągnionych; Do tych pól
      malowanych zbożem rozmaitem, Wyzłacanych pszenicą, posrebrzanych żytem;
      Gdzie bursztynowy świerzop, gryka jak śnieg biała, Gdzie panieńskim
      rumieńcem dzięcielina pała, A wszystko przepasane jakby wstęgą, miedzą
      Zieloną, na niej z rzadka ciche grusze siedzą.
    </Data>
  </ScrollableContainer>
);

export const Default = Template.bind({});
Default.args = {
  width: "200px",
  height: "200px",
};
