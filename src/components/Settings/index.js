import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import Page from '../../Shared/Page';
import ConfirmButton from './ConfirmButton';
import CoinGrid from './CoinGrid';
import Search from './Search';

function Settings() {
  return (
    <Page name='settings'>
      <WelcomeMessage />
      <CoinGrid topSection />
      <ConfirmButton />
      <Search />
      <CoinGrid />
    </Page>
  );
}

export default Settings;
