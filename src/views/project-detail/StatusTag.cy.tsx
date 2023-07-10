import React from 'react'
import StatusTag from './StatusTag'

describe('<StatusTag />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<StatusTag />)
  })
})