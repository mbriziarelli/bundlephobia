import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { Suggestion } from 'bundlephobia-suggestions-service'
import usePackageName from '../Hooks/usePackageName'
import useSuggestions from '../Hooks/useSuggestions'

const getOptionLabel = (option: Suggestion): string =>
  `${option.name}@${option.version}`

const getOptionSelected = (option1: Suggestion, option2: Suggestion): boolean =>
  option1.name === option2.name && option1.version === option2.version

const SearchField: React.FC = (): ReactElement => {
  const [queryPackageName, setQueryPackageName] = usePackageName()
  const [editedPackageName, setEditedPackageName] = useState(queryPackageName)
  const [isOpen, setIsOpen] = useState(false)
  const suggestions = useSuggestions(editedPackageName)

  useEffect(() => {
    setEditedPackageName(queryPackageName)
  }, [queryPackageName])

  const onOpen = (): void => void setIsOpen(true)
  const onClose = (): void => void setIsOpen(false)
  const onInputChange = (event: ChangeEvent<{}>, value: string): void =>
    void setEditedPackageName(value)
  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    void setEditedPackageName(event.target.value)
  const renderInput = (params: TextFieldProps): ReactElement => (
    <TextField
      {...params}
      autoFocus
      label="Find Package"
      onChange={onChange}
      value={editedPackageName}
      variant="outlined"
    />
  )

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={(event: FormEvent): void => {
        event.preventDefault()
        setQueryPackageName(editedPackageName)
      }}
    >
      <Autocomplete
        autoComplete
        disableOpenOnFocus
        freeSolo
        getOptionLabel={getOptionLabel}
        getOptionSelected={getOptionSelected}
        includeInputInList
        noOptionsText="No Suggestions"
        onClose={onClose}
        onInputChange={onInputChange}
        onOpen={onOpen}
        open={isOpen}
        options={suggestions}
        renderInput={renderInput}
        style={{ width: 350 }}
      />
    </form>
  )
}

export default SearchField
