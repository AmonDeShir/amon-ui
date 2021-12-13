import Scrollbar from 'react-scrollbars-custom';
import styled from 'styled-components';
import { theme } from '../themes/theme';

type Size = {
  width: string;
  height: string;
};

export const StyledScrollbar = styled(Scrollbar)<{ size: Size }>`
  width: ${({ size }) => size.width};
  height: ${({ size }) => size.height};

  & > .ScrollbarsCustom-Wrapper {
    position: absolute;
    inset: 0px 10px 10px 0px;
    overflow: hidden;
  }

  & > .ScrollbarsCustom-Scroller {
    position: absolute;
    inset: 0px;
    overflow: scroll;
    margin-bottom: -14px;
    margin-right: -14px;
  }

  & > .ScrollbarsCustom-Content {
    box-sizing: border-box;
    padding: 0.05px;
    min-height: 100%;
    min-width: 100%;
  }

  & > .ScrollbarsCustom-Track {
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    overflow: hidden;
    border-radius: 0px;
    background: rgba(0, 0, 0, 0.1) none repeat scroll 0% 0%;
    user-select: none;
    padding: 2px;
  }

  & > .ScrollbarsCustom-TrackY {
    top: 0px;
    left: calc(100% - 10px);
    width: 10px;
    height: calc(100% - 10px);
  }

  & > .ScrollbarsCustom-TrackX {
    top: calc(100% - 10px);
    left: 0px;
    width: calc(100% - 10px);
    height: 10px;
  }

  & > div > .ScrollbarsCustom-Thumb {
    background: ${({ theme }) => theme.colors.accent} none repeat scroll 0% 0%;
    cursor: pointer;
    border-radius: 2px;
  }

  & > div > .ScrollbarsCustom-ThumbY {
    width: 100%;
  }

  & > div > .ScrollbarsCustom-ThumbX {
    height: 100%;
  }
`;

StyledScrollbar.defaultProps = { theme };
