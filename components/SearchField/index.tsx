import React, { ChangeEvent } from 'react'
import axios from 'axios'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useDebounce from '../useDebounce'
import { isNonEmptyString } from '../../server/helpers/types'
import { Suggestion } from '../../server/suggestionsService/types'

const getOptionLabel = (option: Suggestion): string =>
  `${option.name}@${option.version}`

const getOptionSelected = (option1: Suggestion, option2: Suggestion): boolean =>
  option1.name === option2.name && option1.version === option2.version

const fetchSuggestions = (searchTerm: string): Promise<Suggestion[]> =>
  searchTerm.length > 0
    ? axios
        .get(`/api/suggestions?q=${searchTerm}`)
        .then(({ data: suggestions }) => suggestions)
        .catch(() => [])
    : Promise.resolve([])

const SearchField: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [options, setOptions] = React.useState<Suggestion[]>([])
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 200)

  const onOpen = (): void => {
    setIsOpen(true)
  }
  const onClose = (): void => {
    setIsOpen(false)
  }
  const onChange = (event: ChangeEvent<{}>, value: string): void => {
    setSearchTerm(value)
  }

  const renderInput = (params: TextFieldProps): JSX.Element => (
    <TextField {...params} label="Find Package" variant="outlined" />
  )

  React.useEffect(() => {
    if (isNonEmptyString(debouncedSearchTerm)) {
      setIsOpen(true)
      fetchSuggestions(searchTerm.trim()).then(setOptions)
    } else {
      setIsOpen(false)
      setOptions([])
    }
  }, [debouncedSearchTerm])

  return (
    <Autocomplete
      autoComplete
      disableOpenOnFocus
      freeSolo
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      includeInputInList
      noOptionsText="No Suggestions"
      onClose={onClose}
      onInputChange={onChange}
      onOpen={onOpen}
      open={isOpen}
      options={options}
      renderInput={renderInput}
      style={{ width: 350 }}
    />
  )
}

export default SearchField
