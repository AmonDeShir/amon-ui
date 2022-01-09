import { render, screen, fireEvent } from '@testing-library/react';
import timelineMock from '../../mocks/gsap-timeline';
import { ListBox } from './list-box';

const items = [
  { key: '0', data: <>Element 0</> },
  { key: '1', data: <>Element 1</> },
  { key: '2', data: <>Element 2</> },
  { key: '3', data: <>Element 3</> },
  { key: '4', data: <>Element 4</> },
  { key: '5', data: <>Element 5</> },
  { key: '6', data: <>Element 6</> },
];

describe('ListBox', () => {
  beforeAll(() => {
    timelineMock.advanceMock();
  });

  afterAll(() => {
    timelineMock.restore();
  });

  describe('aria role', () => {
    it(`should be setted to 'listbox'`, () => {
      render(<ListBox />);

      expect(screen.queryByRole('listbox')).toBeTruthy();
    });
  });

  describe(`orientation`, () => {
    it(`should be horizontal by default`, () => {
      render(<ListBox />);

      expect(screen.queryByRole('listbox')).toHaveStyle('flex-direction: row');
    });

    it(`should be vertical`, () => {
      render(<ListBox orientation="vertical" />);

      expect(screen.queryByRole('listbox')).toHaveStyle(
        'flex-direction: column',
      );
    });

    it(`should be horizontal`, () => {
      render(<ListBox orientation="horizontal" />);

      expect(screen.queryByRole('listbox')).toHaveStyle('flex-direction: row');
    });
  });

  describe(`height`, () => {
    describe('if orientation horizontal', () => {
      it(`should be equal 45 by default`, () => {
        render(<ListBox />);

        expect(screen.queryByRole('listbox')).toHaveStyle('height: 45px');
      });

      it(`should be equal to the itemHeight property`, () => {
        render(<ListBox itemHeight={100} />);

        expect(screen.queryByRole('listbox')).toHaveStyle('height: 100px');
      });
    });

    describe(`if orientation vertical`, () => {
      it(`should be equal to zero if the items property is an empty`, () => {
        render(<ListBox items={[]} orientation="vertical" />);

        expect(screen.queryByRole('listbox')).toHaveStyle('height: 0px');
      });

      it(`should be equal to the items property length multiplied by 45 be default`, () => {
        render(<ListBox items={items} orientation="vertical" />);

        expect(screen.queryByRole('listbox')).toHaveStyle('height: 315px');
      });

      it(`should be equal to the items property length multiplied by the itemHeight property`, () => {
        render(
          <ListBox items={items} itemHeight={100} orientation="vertical" />,
        );

        expect(screen.queryByRole('listbox')).toHaveStyle('height: 700px');
      });
    });
  });

  describe(`width`, () => {
    describe('if orientation vertical', () => {
      it(`should be equal 45 by default`, () => {
        render(<ListBox orientation="vertical" />);

        expect(screen.queryByRole('listbox')).toHaveStyle('width: 45px');
      });

      it(`should be equal to the itemWidth property`, () => {
        render(<ListBox itemWidth={100} orientation="vertical" />);

        expect(screen.queryByRole('listbox')).toHaveStyle('width: 100px');
      });
    });

    describe('if orientation horizontal', () => {
      it(`should be equal to zero if the items property is an empty`, () => {
        render(<ListBox items={[]} />);

        expect(screen.queryByRole('listbox')).toHaveStyle('width: 0px');
      });

      it(`should be equal to the items property length multiplied by 45 be default`, () => {
        render(<ListBox items={items} />);

        expect(screen.queryByRole('listbox')).toHaveStyle('width: 315px');
      });

      it(`should be equal to the items property length multiplied by the itemWidth property`, () => {
        render(<ListBox items={items} itemWidth={100} />);

        expect(screen.queryByRole('listbox')).toHaveStyle('width: 700px');
      });
    });
  });

  describe(`items`, () => {
    it(`should display items with role option`, () => {
      render(<ListBox items={items} />);

      expect(screen.queryAllByRole('option').length).toEqual(7);
    });

    it(`shouldn't display any item by default`, () => {
      render(<ListBox />);

      expect(screen.queryAllByRole('option').length).toEqual(0);
    });
  });

  describe(`value`, () => {
    const isElementSelected = (element: HTMLElement) =>
      element.getAttribute('aria-selected') === 'true';
    const getPointer = () => screen.queryByRole('listbox')?.children[0];

    it(`shouldn't select any item if the value property is undefined`, () => {
      render(<ListBox items={items} value={undefined} />);

      expect(
        screen.queryAllByRole('option').filter(isElementSelected).length,
      ).toEqual(0);
    });

    it(`shouldn't select any item if the value property isn't equal to Record.Key of any item`, () => {
      render(<ListBox items={items} value="20" />);

      expect(
        screen.queryAllByRole('option').filter(isElementSelected).length,
      ).toEqual(0);
    });

    it(`should be undefined by default`, () => {
      render(<ListBox items={items} />);

      expect(
        screen.queryAllByRole('option').filter(isElementSelected).length,
      ).toEqual(0);
    });

    it(`should select item with key equal to '3'`, () => {
      render(<ListBox items={items} value="3" />);

      expect(
        screen.queryAllByRole('option').filter(isElementSelected).length,
      ).toEqual(1);
      expect(screen.queryByText('Element 3')).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    it(`should hide pointer if the value property is undefined`, () => {
      render(<ListBox items={items} />);

      expect(getPointer()).toHaveStyle('transform: scale(0)');
    });

    it(`should hide pointer if the value property isn't equal to Record.Key of any item`, () => {
      render(<ListBox items={items} value="29" />);

      expect(getPointer()).toHaveStyle('transform: scale(0)');
    });

    it(`should show pointer if the value property is defined`, async () => {
      render(<ListBox items={items} value="3" />);

      expect(getPointer()).toHaveStyle(
        'transform: translate(135px, 0px, 0px) scale(1)',
      );
    });

    it(`should move pointer to the selected element (default width, orientation: horizontal)`, async () => {
      const { rerender } = render(<ListBox items={items} value="1" />);
      expect(getPointer()).toHaveStyle(
        'transform: translate(45px, 0px, 0px) scale(1)',
      );

      rerender(<ListBox items={items} value="3" />);
      expect(getPointer()).toHaveStyle(
        'transform: translate(135px, 0px, 0px) scale(1)',
      );
    });

    it(`should move pointer to the selected element (default height, orientation: vertical)`, () => {
      const { rerender } = render(
        <ListBox items={items} value="1" orientation="vertical" />,
      );
      expect(getPointer()).toHaveStyle(
        'transform: translate(0px, 45px, 0px) scale(1)',
      );

      rerender(<ListBox items={items} value="3" orientation="vertical" />);
      expect(getPointer()).toHaveStyle(
        'transform: translate(0px, 135px, 0px) scale(1)',
      );
    });

    it(`should move pointer to the selected element (no default width, orientation: horizontal)`, () => {
      const { rerender } = render(
        <ListBox items={items} value="1" itemWidth={10} />,
      );
      expect(getPointer()).toHaveStyle(
        'transform: translate(10px, 0px, 0px) scale(1)',
      );

      rerender(<ListBox items={items} value="3" itemWidth={10} />);
      expect(getPointer()).toHaveStyle(
        'transform: translate(30px, 0px, 0px) scale(1)',
      );
    });

    it(`should move pointer to the selected element (no default height, orientation: vertical)`, () => {
      const { rerender } = render(
        <ListBox
          items={items}
          value="1"
          itemHeight={10}
          orientation="vertical"
        />,
      );
      expect(getPointer()).toHaveStyle(
        'transform: translate(0px, 10px, 0px) scale(1)',
      );

      rerender(
        <ListBox
          items={items}
          value="3"
          itemHeight={10}
          orientation="vertical"
        />,
      );
      expect(getPointer()).toHaveStyle(
        'transform: translate(0px, 30px, 0px) scale(1)',
      );
    });

    it(`should hide if value property changes from correct to undefined`, () => {
      const { rerender } = render(<ListBox items={items} value="3" />);
      expect(getPointer()).toHaveStyle(
        'transform: translate(135px, 0px, 0px) scale(1)',
      );

      rerender(<ListBox items={items} value="20" />);
      expect(getPointer()).toHaveStyle(
        'transform: translate(135px, 0px, 0px) scale(0)',
      );
    });

    it(`should show if value property changes from undefined to correct`, () => {
      const { rerender } = render(<ListBox items={items} value="20" />);
      expect(getPointer()).toHaveStyle('transform: scale(0)');

      rerender(<ListBox items={items} value="3" />);
      expect(getPointer()).toHaveStyle(
        'transform: scale(1) translate(135px, 0px, 0px)',
      );
    });
  });

  describe(`if user click on the listbox item`, () => {
    const getPointer = () => screen.queryByRole('listbox')?.children[0];

    it(`should call onSelect`, async () => {
      const spy = jest.fn();
      render(<ListBox value="3" items={items} onSelect={spy} />);

      fireEvent.click(await screen.findByText('Element 5'));
      expect(spy).toBeCalledWith('5');
    });

    it(`shouldn't select clicked element`, async () => {
      render(<ListBox value="3" items={items} />);

      fireEvent.click(await screen.findByText('Element 5'));
      expect(screen.queryByText('Element 3')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.queryByText('Element 5')).not.toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    it(`shouldn't move pointer to clicked element`, async () => {
      render(<ListBox value="3" items={items} />);

      fireEvent.click(await screen.findByText('Element 5'));
      expect(getPointer()).toHaveStyle(
        'transform: translate(135px, 0px, 0px) scale(1)',
      );
      expect(getPointer()).not.toHaveStyle(
        'transform: translate(225px, 0px, 0px) scale(1)',
      );
    });
  });
});
