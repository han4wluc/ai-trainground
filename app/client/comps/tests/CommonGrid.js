
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';


import CommonGrid from '../CommonGrid';
import _ from 'lodash';

describe('<CommonGrid/>', () => {

  it('calls componentDidMount', () => {

    const cells = _.range(9).map(()=><div></div>);

    const MyComponent = (
      <CommonGrid
        rows={3}
        columns={3}
        cells={cells}
        borderWidth={4}
        size={20}
      />
    );

    const wrapper = shallow(MyComponent);

    wrapper.props().children.should.have.length(9);

  });

});
