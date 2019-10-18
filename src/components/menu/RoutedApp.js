import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page from 'pages/Page';
import NewSpendingPage from 'pages/NewSpendingPage';
import HomePage from 'pages/HomePage';
import StatistiquesPage from 'pages/StatistiquesPage';

import Header from './Header';
import RoutedMenu from './RoutedMenu';

class RoutedApp extends React.Component {
  handleMenuLink = ({ match }) => {
    const { params: { path } } = match;
    let content = null;

    switch (path) {
      case 'new':
        content = <NewSpendingPage />;
        break;
      case 'statistiques':
        content = <StatistiquesPage />;
        break;
      case 'admin':
        break;
      default:
        content = <HomePage />;
        break;
    }

    return content;
  }

  render () {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Page>
            <Route exact path='/' component={this.handleMenuLink} />
            <Route path='/:path' component={this.handleMenuLink} />
          </Page>
          <RoutedMenu />
        </React.Fragment>
      </Router>
    );
  }
}

export default RoutedApp;
