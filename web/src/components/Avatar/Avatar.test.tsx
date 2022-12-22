import { render } from 'src/lib/testing/test-utils';

import Avatar from './Avatar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Avatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Avatar />);
    }).not.toThrow();
  });
});
