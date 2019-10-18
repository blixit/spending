import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page from 'pages/Page';
import NewSpendingPage from 'pages/NewSpendingPage';
import HomePage from 'pages/HomePage';
import StatistiquesPage from 'pages/StatistiquesPage';
import LoginPage from 'pages/LoginPage';

import Header from './Header';
import RoutedMenu from './RoutedMenu';

const pages = {
  new: { content: props => <NewSpendingPage {...props} /> },
  statistiques: { content: props => <StatistiquesPage {...props} /> },
  login: { content: props => <LoginPage {...props} /> },
  admin: { content: props => null },
  default: { content: props => <HomePage {...props} /> },
};

class RoutedApp extends React.Component {
  renderer = props => {
    const { match } = props;
    const { params: { path } } = match;
    const { content } = pages[path] || pages.default;

    return content({ router: props });
  }

  render () {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Page>
            <Route exact path='/' render={this.renderer} />
            <Route path='/:path' render={this.renderer} />
          </Page>
          <RoutedMenu />
        </React.Fragment>
      </Router>
    );
  }
}

export default RoutedApp;
