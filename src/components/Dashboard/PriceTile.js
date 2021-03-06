import React from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../../Shared/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../../Shared/Styles';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';
import { AppContext } from '../App/AppProvider';

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const ChangePct = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

const JustifyRight = styled.div`
  justify-self: right;
`;
const JustifyLeft = styled.div`
  justify-self: left;
`;

const numberFormat = (number) => {
  return (parseInt(number) + '').slice(0, 7);
};

const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3}
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}

  ${(props) =>
    props.currentFavorite &&
    css`
      ${greenBoxShadow}
      pointer-events: none;
    `}
`;

const ChangePercent = ({ data }) => {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCT24HOUR <= 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}%
      </ChangePct>
    </JustifyRight>
  );
};

const PriceTile = ({ sym, data, currentFavorite, setCurrentFavorites }) => {
  return (
    <PriceTileStyled
      onClick={() => setCurrentFavorites(sym)}
      currentFavorite={currentFavorite}
    >
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const PriceTileCompact = ({
  sym,
  data,
  currentFavorite,
  setCurrentFavorites,
}) => {
  return (
    <PriceTileStyled
      onClick={setCurrentFavorites}
      compact
      currentFavorite={currentFavorite}
    >
      <JustifyLeft>{sym} </JustifyLeft>
      <ChangePercent data={data} />

      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
};

export default function ({ price, index }) {
  let sym = Object.keys(price)[0];
  let data = price[sym]['USD'];

  let TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return (
    <AppContext.Consumer>
      {({ currentFavorite, setCurrentFavorites }) => (
        <TileClass
          sym={sym}
          data={data}
          currentFavorite={currentFavorite === sym}
          setCurrentFavorites={() => setCurrentFavorites(sym)}
        ></TileClass>
      )}
    </AppContext.Consumer>
  );
}
