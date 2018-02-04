import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cell from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('<Cell />', () => {
    it('component render', () => {
        let cell = renderer.create(<Cell value={32} />).toJSON();
        expect(cell).toMatchSnapshot();
    })
})
