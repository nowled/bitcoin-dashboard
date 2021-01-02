import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';

const Logo = styled.div`
  font-size: 1.5rem;
  font-family: 'Do Hyeon', sans-serif;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;
const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 60px #eeeeee;
      display: inline-table;
    `}
`;

function toUpperCaseStr(transFormedStr) {
  return transFormedStr.charAt(0).toUpperCase() + transFormedStr.substr(1);
}

function ControlButton({ name }) {
  return (
    <AppContext.Consumer>
      {({ page, setPage }) => (
        <ControlButtonElem active={page === name} onClick={() => setPage(name)}>
          {toUpperCaseStr(name)}
        </ControlButtonElem>
      )}
    </AppContext.Consumer>
  );
}

export default function () {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div />
      <ControlButton active name='dashboard' />
      <ControlButton name='settings' />
    </Bar>
  );
}
