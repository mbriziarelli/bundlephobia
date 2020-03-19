import React, { useState, useEffect } from 'react'
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { Suggestion } from 'bundlephobia-suggestions-service'
import usePackageName from '../Hooks/usePackageName'
import useSuggestions from '../Hooks/useSuggestions'
import wordings from '../wordings.json'

const getOptionLabel = (option: Suggestion | null): string =>
  option !== null ? `${option.name}@${option.version}` : ''

const getOptionSelected = (option1: Suggestion, option2: Suggestion): boolean =>
  option1.name === option2.name && option1.version === option2.version

const SearchField: React.FC = (): React.ReactElement => {
  const [queryPackageName, setQueryPackageName] = usePackageName()
  const [editedPackageName, setEditedPackageName] = useState('')
  const [hasFocus, setHasFocus] = useState(false)
  const suggestions = useSuggestions(editedPackageName)
  const [isOpen, setIsOpen] = useState(false)

  const shouldOpenSuggestions = (): boolean =>
    hasFocus && suggestions.length > 0 && editedPackageName.length > 0

  useEffect(() => {
    setEditedPackageName(queryPackageName)
  }, [queryPackageName])

  useEffect(() => {
    setIsOpen(shouldOpenSuggestions())
  }, [suggestions, editedPackageName, hasFocus])

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={(event: React.FormEvent): void => {
        event.preventDefault()
        setIsOpen(false)
        setQueryPackageName(editedPackageName)
      }}
    >
      <Autocomplete
        style={{ width: 300 }}
        open={isOpen}
        onOpen={(): void => void setIsOpen(shouldOpenSuggestions())}
        onClose={(): void => void setIsOpen(false)}
        getOptionSelected={getOptionSelected}
        getOptionLabel={getOptionLabel}
        options={suggestions}
        inputValue={editedPackageName}
        onInputChange={(
          _: React.ChangeEvent<{}>,
          value: string,
          reason: string
        ): void => {
          switch (reason) {
            case 'input':
            case 'reset':
              setEditedPackageName(value)
              break
            case 'clear':
              setQueryPackageName('')
          }
        }}
        renderInput={(params: RenderInputParams): React.ReactElement => (
          <TextField
            {...params}
            onFocus={(): void => void setHasFocus(true)}
            onBlur={(): void => void setHasFocus(false)}
            label={wordings.textFieldLabel}
            variant="outlined"
            InputProps={{ ...params.InputProps }}
          />
        )}
      />
    </form>
  )
}

export default SearchField
