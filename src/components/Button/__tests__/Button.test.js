import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('<Button />', () => {
    const handleClick = jest.fn();
    const imageUrl = 'imageUrl';
    const imageDesc = 'desc';

    it('component render', () => {
        const button = renderer.create(
            <Button
                handleClick={handleClick}
                img={imageUrl}
                desc={imageDesc}
            />
        );
        expect(button.toJSON()).toMatchSnapshot();
    })

    it('button should has a image child', () => {
        const button = mount(
            <Button
                handleClick={handleClick}
                img={imageUrl}
                desc={imageDesc}
            />
        );
        // 按钮内部应该有一个用于展示的图片
        expect(button.find('img')).toHaveLength(1);
        expect(button.simulate('click'));
    })
})

