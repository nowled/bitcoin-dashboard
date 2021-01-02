import React from 'react';
import styled from 'styled-components';
import { fontSize2 } from '../../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  background: #639a60;
  border: 1px solid;
  color: #fff;
  height: 25px;
  place-self: center left;
  ${fontSize2}
`;

// A lodash helper function that allows us to get input from the user without too many
// re-renders, incase a user types really fast into the input it waits for 500 ms before it makes the request
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
  // Lets get all coin symbols
  let coinSymbols = Object.keys(coinList);
  // Get all the coin names, map symbol to name
  let coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);
  let allStringsToSearch = coinSymbols.concat(coinNames);
  // We do this so if the user types BTC it will get the bitcoin names or if he types bitcoin it will also get the symbols -- good algorthm

  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map((result) => result.string);

  //This is going to pick a list of keys based on a callback function

  let filteredCoins = _.pickBy(coinList, (result, symKey) => {
    let coinName = result.CoinName;
    return (
      _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
    );
  });

  setFilterCoins(filteredCoins);
}, 500);

const filterCoins = (e, setFilteredCoins, coinList) => {
  let inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }

  handleFilter(inputValue, coinList, setFilteredCoins);
};

const Search = () => {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search All Coins</h2>
          <SearchInput
            onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
};

export default Search;
