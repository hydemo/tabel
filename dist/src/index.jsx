import 'regenerator-runtime/runtime';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import './styles/base.css';
import './styles/global.css';
import routes from './routes';
import configureStore from './models/store/configureStore';

moment.locale('zh_CN');

const store = configureStore();
const render = (r) => {
  const content = (process.env.NODE_ENV === 'production') ? (
    <Provider store={store}>
      { r }
    </Provider>
  ) : (() => {
    const { AppContainer } = require('react-hot-loader');
    const DevTools = require('./tools/DevTools').default;
    return (
      <AppContainer>
        <Provider store={store}>
          <div className="dev-only">
            { r }
            <DevTools />
          </div>
        </Provider>
      </AppContainer>
    );
  })();

  ReactDOM.render(
    content,
    document.getElementById('app'),
  );
};

render(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    render(newRoutes);
  });
}
