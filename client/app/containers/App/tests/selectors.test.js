import { makeSelectLocation, makeSelectNotifications } from '../selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(makeSelectLocation()(mockedState)).toEqual(router.location);
  });
});

describe('makeSelectNotifications', () => {
  it('should select the notifications', () => {
    const notification = [
      { message: 'data get success!!', options: { variant: 'success' } },
    ];
    const mockedState = notification;
    expect(makeSelectNotifications()(mockedState).toEqual(notification));
  });
});
