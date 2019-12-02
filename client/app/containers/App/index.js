/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';

import saga from './saga';

import GlobalStyle from '../../global-styles';
import ErrorBoundary from '../../components/ErrorBoundary';
import ForecastComponent from '../ForecastPage/Loadable';
import Notifier from './components/Notifier';
import { makeSelectLocation } from './selectors';
import { enqueueSnackbar } from './actions';

const App = ({ location }) => (
  <ErrorBoundary>
    <Notifier />
    <Switch location={location}>
      <Route path="/" component={ForecastComponent} />
    </Switch>
    <GlobalStyle />
  </ErrorBoundary>
);

const withSaga = injectSaga({ key: 'global', saga });

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});
const withConnect = connect(
  mapStateToProps,
  { enqueueSnackbar },
);

export default compose(
  withSaga,
  withConnect,
)(App);
