import React from 'react';

import ShallowRenderer from 'react-test-renderer/shallow';

import ForecastPage from '../index';

const renderer = new ShallowRenderer();

describe('<ForecastPage />', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(false);
  });
  it('should render and match the snapshot', () => {
    renderer.render(<ForecastPage />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
