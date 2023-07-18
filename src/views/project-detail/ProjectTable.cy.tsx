import React from 'react'
import ProjectTable from './ProjectTable'

describe('<ProjectTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProjectTable />)
  })
})