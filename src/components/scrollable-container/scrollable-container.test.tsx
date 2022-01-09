import { render, screen } from '@testing-library/react';
import { ScrollableContainer } from './scrollable-container';

describe('ScrollableContainer', () => {
  it(`should render content`, () => {
    render(<ScrollableContainer>Text inside</ScrollableContainer>);

    expect(screen.queryByText(`Text inside`));
  });

  it(`should set width and height to '100%' if there are not defined`, () => {
    render(<ScrollableContainer>Test</ScrollableContainer>);

    expect(
      screen.queryByText(`Test`).parentElement.parentElement.parentElement,
    ).toHaveStyle('width: 100%');
    expect(
      screen.queryByText(`Test`).parentElement.parentElement.parentElement,
    ).toHaveStyle('height: 100%');
  });

  it(`should set width to 50px and height to 200px`, () => {
    render(
      <ScrollableContainer width="50px" height="200px">
        Test
      </ScrollableContainer>,
    );

    expect(
      screen.queryByText(`Test`).parentElement.parentElement.parentElement,
    ).toHaveStyle('width: 50px');
    expect(
      screen.queryByText(`Test`).parentElement.parentElement.parentElement,
    ).toHaveStyle('height: 200px');
  });
});
