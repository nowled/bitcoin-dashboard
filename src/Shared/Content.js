import React from 'react';
import { AppContext } from '../components/App/AppProvider';

export default function (props) {
  return (
    <AppContext.Consumer>
      {({ coinList, prices, firstVisit }) => {
        if (!coinList) {
          return <div>Loading Coins</div>;
        }
        if (!firstVisit && !prices) {
          return <div>Loading Prices</div>;
        }
        return <div>{props.children}</div>;
      }}
    </AppContext.Consumer>
  );
}
