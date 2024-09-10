import React from 'react'
import { shallow } from 'enzyme'
import Rules from './Rules'

describe('Rules', () => {
  it('renders component', () => {
    const option = {
      id: 1,
      title: 'My option'
    }
    let wrapper = shallow(<Rules option={option} type="addon" />)
    expect(wrapper.exists()).toBe(true)
  })
})