import React from 'react'
import { addDecorator } from '@storybook/react'
import Center from './Center'

addDecorator(storyFn => <Center>{storyFn()}</Center>)
