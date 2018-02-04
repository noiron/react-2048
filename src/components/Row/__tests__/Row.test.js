import React from 'react'
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Row from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('<Row />', () => {
    it('component render', () => {
        const matrix = [[0, 0, 4, 4], [0, 2, 0, 0], [4, 0, 0, 0], [0, 0, 0, 0]];
        matrix.forEach(r => {
            const row = renderer.create(<Row row={r} />).toJSON();
            expect(row).toMatchSnapshot();
        })
    })
})
