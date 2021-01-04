import React, { Component, createContext } from 'react';
import moment from 'moment';
import { key } from '../../api/index';
import _ from 'lodash';
const cc = require('cryptocompare');

cc.setApiKey(key);

export const AppContext = createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      timeInterval: 'months',
      ...this.savedSettings(),

      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      setPage: this.setPage,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorites: this.setCurrentFavorites,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect,
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  fetchCoins = async () => {
    let coinList = await (await cc.coinList()).Data;

    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    // We must filter the empty price objects (not in the lecture)
    prices = prices.filter((price) => Object.keys(price).length);

    this.setState({ prices });
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;

    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD,
        ]),
      },
    ];
    this.setState({ historical });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], 'USD');

        returnData.push(priceData);
      } catch (e) {
        console.warn('Fetch price error:', e);
      }
    }
    return returnData;
  };

  historical = () => {
    let promises = [];

    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ['USD'],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
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
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        page: 'dashboard',
        firstVisit: false,
        currentFavorite,
        prices: null,
        historical: null,
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite,
      })
    );
  };

  setCurrentFavorites = (sym) => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null,
      },
      this.fetchHistorical
    );
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('cryptoDash')),
        currentFavorite: sym,
      })
    );
  };

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if (!cryptoDashData) {
      return { page: 'settings', firstVisit: true };
    }
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  };

  setPage = (page) => this.setState({ page });
  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

  changeChartSelect = (value) => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
