import { useMemo, useRef } from 'react';

import { useMemorableMemo } from '../../utils/use-memorable-memo/use-memorable-memo';
import { Container, Pointer, Item } from './list-box.styles';
import useTimelineEffect from '../../utils/use-timeline-effect/use-timeline-effect';

interface ListBoxProps {
  /**
   * List should be displayed vertical or horizontal?
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Maximal width of an item in pixels.
   * @default 45
   */
  itemWidth?: number;
  /**
   * Maximal height of an item in pixels.
   * @default 45
   */
  itemHeight?: number;
  /**
   * Id of selected item, (Change it to change selected item)
   * @default undefined
   */
  value?: string;
  /**
   * List of items that will be displayed by ListBox component. Record Key will be JSX.Element key, so it must be unique.
   * This parameter can be modify.
   * @default []
   */
  items?: { key: string; data: JSX.Element }[];
  /**
   * Optional select handler
   * @default undefined
   */
  onSelect?: (value: string) => void;
}

/** ListBox component is stateless, so it need parent component that will change ListBox.value after ListBox.onSelect call. */
export const ListBox = ({
  orientation = 'horizontal',
  itemHeight = 45,
  itemWidth = 45,
  items = [],
  value,
  onSelect,
}: ListBoxProps) => {
  const isSelected = (key: string) => (key === value ? 'true' : 'false');
  const pointer = useRef<HTMLDivElement>(null);

  const containerSize = useMemo(() => {
    if (orientation === 'vertical') {
      return {
        width: itemWidth,
        height: Object.keys(items).length * itemHeight,
      };
    }

    return {
      width: Object.keys(items).length * itemWidth,
      height: itemHeight,
    };
  }, [itemHeight, itemWidth, items, orientation]);

  const [selectedIndex, lastSelectedIndex] = useMemorableMemo(() => {
    if (!value || items.length === 0) {
      return -1;
    }

    return items.findIndex(({ key }) => key === value);
  }, [value, items]);

  useTimelineEffect(
    (tl) => {
      const size = orientation === 'vertical' ? itemHeight : itemWidth;
      const position = selectedIndex * size;

      const selectTranslate = (orientation: 'horizontal' | 'vertical') =>
        orientation === 'horizontal'
          ? { translateX: position }
          : { translateY: position };

      if (selectedIndex === lastSelectedIndex) {
        return;
      }

      if (selectedIndex === -1) {
        tl.to(pointer.current, { scale: 0, duration: 0.25 });

        return;
      }

      if (lastSelectedIndex === -1 || lastSelectedIndex === undefined) {
        tl.set(pointer.current, selectTranslate(orientation));
        tl.to(pointer.current, { scale: 1, duration: 0.25 });

        return;
      }

      tl.to(pointer.current, {
        ...selectTranslate(orientation),
        duration: 0.25,
      });
    },
    [selectedIndex, lastSelectedIndex, orientation, itemHeight, itemWidth],
  );

  return (
    <Container role="listbox" orientation={orientation} size={containerSize}>
      <Pointer ref={pointer} size={{ width: itemWidth, height: itemHeight }} />

      {items.map(({ key, data }) => (
        <Item
          key={key}
          role="option"
          aria-selected={isSelected(key)}
          onClick={onSelect ? () => onSelect(key) : undefined}
        >
          {data}
        </Item>
      ))}
    </Container>
  );
};
