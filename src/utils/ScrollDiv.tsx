import styled from 'styled-components'

interface IScrillDivProps {
    height: number,
}

const ScrollDiv = styled.div`
  height: ${(props: IScrillDivProps) => props.height}px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track {
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 50, .5);
    border-radius: 5px;
    box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
  }
  padding: 10px 20px 5px 20px;
  border-top: 1px solid #ccc;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1) inset;
`;

export default ScrollDiv;