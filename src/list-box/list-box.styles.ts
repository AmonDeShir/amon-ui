import styled from 'styled-components';
import { theme } from '../themes/theme';

interface ContainerProps {
  orientation: 'horizontal' | 'vertical';
  size: {
    width: number;
    height: number;
  };
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;

  flex-direction: ${({ orientation }) =>
    orientation === 'horizontal' ? 'row' : 'column'};

  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
`;

export const Item = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

interface PointerProps {
  size: {
    width: number;
    height: number;
  };
}

export const Pointer = styled.div<PointerProps>`
  position: absolute;
  border: 5px solid ${({ theme }) => theme.colors.accent};
  left: 0;
  top: 0;
  transform: scale(0);

  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
`;

Pointer.defaultProps = { theme };
