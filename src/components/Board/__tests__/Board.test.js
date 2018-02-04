import React from 'react'
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Board from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('<Board />', () => {
    it('component render', () => {
        const matrix = [[0, 0, 4, 4], [0, 2, 0, 0], [4, 0, 0, 0], [0, 2, 0, 0]];
        const board = renderer.create(<Board matrix={matrix} />).toJSON();
        expect(board).toMatchSnapshot();
    })
})
