const getSvgColors = (svg: Element | null | undefined, skipNone = false) => {
  if (!svg) {
    return null;
  }

  return flat(svg)
    .map((path) => path.getAttribute('fill'))
    .map((color) => (!color ? 'none' : color))
    .filter((color) => skipNone === false || color !== 'none');
};

const flat = <T extends Element>(item: T) => {
  const items: T[] = [item];

  item.childNodes.forEach((item) => {
    items.push(...flat(item as T));
  });

  return items;
};

export default getSvgColors;
