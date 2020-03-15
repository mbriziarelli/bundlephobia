import React from 'react'
import { NextPage } from 'next'
import withLayout from '../components/Layout'
import SearchField from '../components/SearchField'

const Index: NextPage = () => <SearchField />

export default withLayout(Index)
