import React, { Component } from 'react';
import { key } from '../Api/index';
const cc = require('cryptocompare');

cc.setApiKey(key);

export const AppContext = React.createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ["BTC", "ETH", "NEO", "EOS"],
      ...this.savedSettings(),
      setPage: this.setPage,

      confirmFavorites: this.confirmFavorites,
    };
  }

  componentDidMount() {
    this.fetchCoins();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
  
    this.setState({ coinList });
  };

  confirmFavorites = () => {
    this.setState({
      page: 'dashboard',
      firstVisit: false,
    });
    localStorage.setItem('cryptoDash', JSON.stringify({ test: 'hello' }));
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

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
