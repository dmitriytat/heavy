import React from 'react';
import { shallow } from 'enzyme';

import Field from './field.jsx';

describe('Field', function() {
    it('Should set props', function() {
        const field = shallow(
            <Field
                id="my-id"
                label="lab"
                value="my value"
            />
        );

        expect(field.prop('id')).toEqual('my-id', 'Set id');
        expect(field.find('label').text()).toEqual('lab', 'Set label');
        expect(field.find('input').prop('value')).toEqual('my value', 'Set value');
    });

    it('Should call change handler', function() {
        const handlers = {
            changeHandler: function(value) {
                return value;
            }
        };

        spyOn(handlers, "changeHandler");

        const field = shallow(
            <Field
                onChange={handlers.changeHandler}
            />
        );

        handlers.changeHandler.calls.reset();
        field.find('input').simulate('change', { target: { value: '23423' } });

        expect(handlers.changeHandler).toHaveBeenCalled();
        expect(handlers.changeHandler.calls.first()).toEqual(jasmine.objectContaining({ args: ['23423'] }));
    });
});
