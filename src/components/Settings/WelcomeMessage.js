import React from 'react';
import { AppContext } from '../App/AppProvider';

function WelcomeMessage() {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? <div>Welcome to Some Real Crypto Coin Shit</div> : null
      }
    </AppContext.Consumer>
  );
}

export default WelcomeMessage;
