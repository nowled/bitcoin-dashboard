import React from 'react';
import { AppContext } from '../App/AppProvider';

function WelcomeMessage() {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? <div>Welcome To Crypto Currency Dash</div> : null
      }
    </AppContext.Consumer>
  );
}

export default WelcomeMessage;
