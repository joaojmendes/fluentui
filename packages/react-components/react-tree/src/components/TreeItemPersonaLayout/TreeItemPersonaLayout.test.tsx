import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItemPersonaLayout } from './TreeItemPersonaLayout';
import { isConformant } from '../../testing/isConformant';

describe('TreeItemPersonaLayout', () => {
  isConformant({
    Component: TreeItemPersonaLayout,
    displayName: 'TreeItemPersonaLayout',
    requiredProps: {
      expandIcon: 'expandIcon',
      description: 'description',
      aside: 'aside',
    },
    // aside and actions slots can't be visible at the same time
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItemPersonaLayout>Default TreeItemPersonaLayout</TreeItemPersonaLayout>);
    expect(result.container).toMatchSnapshot();
  });
});
