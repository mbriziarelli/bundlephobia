import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import { Suggestion } from 'bundlephobia-suggestions-service'
import usePackageName from '../Hooks/usePackageName'
import useSuggestions from '../Hooks/useSuggestions'

const getOptionLabel = (option: Suggestion | null): string =>
  option !== null ? `${option.name}@${option.version}` : ''

const getOptionSelected = (option1: Suggestion, option2: Suggestion): boolean =>
  option1.name === option2.name && option1.version === option2.version

const SearchField: React.FC = (): ReactElement => {
  const [queryPackageName, setQueryPackageName] = usePackageName()
  const [editedPackageName, setEditedPackageName] = useState(queryPackageName)
  const [isOpen, setIsOpen] = useState(false)
  const suggestions = useSuggestions(editedPackageName)
  const loading = isOpen && suggestions.length === 0

  const onOpen = (): void => void setIsOpen(true)
  const onClose = (): void => void setIsOpen(false)
  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    setIsOpen(false)
    setQueryPackageName(editedPackageName)
  }

  const onInputChange = (
    event: ChangeEvent<{}>,
    value: Suggestion | null
  ): void => void setEditedPackageName(getOptionLabel(value))

  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    void setEditedPackageName(event.target.value)

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Autocomplete
        style={{ width: 300 }}
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        getOptionSelected={getOptionSelected}
        getOptionLabel={getOptionLabel}
        options={suggestions}
        loading={loading}
        onChange={onInputChange}
        renderInput={(params: RenderInputParams): ReactElement => (
          <TextField
            {...params}
            label="Find Package"
            variant="outlined"
            onChange={onChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </form>
  )
}

export default SearchField
