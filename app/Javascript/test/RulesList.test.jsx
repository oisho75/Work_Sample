import React from 'react'
import { shallow } from 'enzyme'
import RulesList from './RulesList'

describe('Rules', () => {
  it('renders component', () => {
    let wrapper = shallow(<RulesList />)
    expect(wrapper.exists()).toBe(true)
  })
})