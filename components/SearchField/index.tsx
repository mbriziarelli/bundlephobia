import React, { useState } from 'react'
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { Suggestion } from 'bundlephobia-suggestions-service'
import usePackageName from '../Hooks/usePackageName'
import useSuggestions from '../Hooks/useSuggestions'

const getOptionLabel = (option: Suggestion | null): string =>
  option !== null ? `${option.name}@${option.version}` : ''

const getOptionSelected = (option1: Suggestion, option2: Suggestion): boolean =>
  option1.name === option2.name && option1.version === option2.version

const SearchField: React.FC = (): React.ReactElement => {
  const [queryPackageName, setQueryPackageName] = usePackageName()
  const [editedPackageName, setEditedPackageName] = useState(queryPackageName)
  const [isOpen, setIsOpen] = useState(false)
  const suggestions = useSuggestions(editedPackageName)

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
        onOpen={(): void =>
          void setIsOpen(editedPackageName.length > 0 && suggestions.length > 0)
        }
        onClose={(): void => void setIsOpen(false)}
        getOptionSelected={getOptionSelected}
        getOptionLabel={getOptionLabel}
        options={suggestions}
        inputValue={editedPackageName}
        onInputChange={(
          event: React.ChangeEvent<{}>,
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
          setEditedPackageName(value)
        }}
        renderInput={(params: RenderInputParams): React.ReactElement => (
          <TextField
            {...params}
            label="Find Package"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              setEditedPackageName(event.target.value)
            }}
            InputProps={{ ...params.InputProps }}
          />
        )}
      />
    </form>
  )
}

export default SearchField
