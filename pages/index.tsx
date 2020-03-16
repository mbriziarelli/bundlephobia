import React from 'react'
import { NextPage } from 'next'
import withLayout from '../components/Layout'
import SearchField from '../components/SearchField'
import Results from '../components/Results'

const Index: NextPage = () => (
  <>
    <SearchField />
    <Results />
  </>
)

export default withLayout(Index)
