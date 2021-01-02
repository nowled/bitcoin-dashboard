import React, { Component, createContext } from 'react';
import { key } from '../../api/index';
import _ from 'lodash';
const cc = require('cryptocompare');

cc.setApiKey(key);

export const AppContext = createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      ...this.savedSettings(),

      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      setPage: this.setPage,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins,
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList = await (await cc.coinList()).Data;

    this.setState({ coinList });
  };

  addCoin = (key) => {
    const favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = (key) => {
    const favorites = this.state.favorites.filter((e) => e !== key);
    this.setState({ favorites });
  };

  isInFavorites = (key) => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    this.setState({
      page: 'dashboard',
      firstVisit: false,
    });
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({ favorites: this.state.favorites })
    );
  };

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return { page: 'settings', firstVisit: true };
    } else {
      let { favorites, currentFavorite } = cryptoDashData;
      return { favorites, currentFavorite };
    }
  };

  setPage = (page) => this.setState({ page });
  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
