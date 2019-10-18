import React from 'react';

import NewSpendingForm from 'components/forms/new-spending-form/NewSpendingForm';

import Page from 'pages/Page';

class NewSpendingPage extends React.Component {
  static displayName = 'NewSpendingPage';

  render () {
    return (
      <Page {...this.props}>
        <NewSpendingForm />
      </Page>
    );
  }
}

export default NewSpendingPage;
