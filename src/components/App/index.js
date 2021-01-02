import React, { Component } from 'react';
import '../App/App.css';
import AppLayout from '../App/AppLayout';
import AppBar from '../App/AppNavBar';
import { AppProvider } from '../App/AppProvider';
import Settings from '../Settings';
import Content from '../../Shared/Content';

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Content>
            <Settings />
          </Content>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
