import { useState } from 'react'
import { useFormContext, useController } from 'react-hook-form'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  Box,
  Text
} from '@chakra-ui/react'

/**
 * A custom textarea component integrated with react-hook-form.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the textarea field.
 * @param {string} [props.label] - The label for the textarea field.
 * @param {string} [props.helperText] - The helper text for the textarea field.
 * @param {boolean} [props.isDisabled] - Whether the textarea field is disabled.
 * @param {boolean} [props.isReadOnly] - Whether the textarea field is read-only.
 * @param {boolean} [props.isRequired] - Whether the textarea field is required.
 * @param {number} [props.maxLength=500] - The maximum length of the textarea field.
 * @param {any} [props.rest] - Additional props to be spread on the Textarea component.
 * @returns {JSX.Element} The rendered RHFTextarea component.
 */
export default function RHFTextarea({
  name,
  label,
  helperText,
  isDisabled,
  isReadOnly,
  isRequired,
  withCounter = false,
  maxLength = 500, // Set default maxLength
  ...rest
}) {
  const {
    control,
    formState: { isSubmitting }
  } = useFormContext()
  const {
    field,
    fieldState: { error }
  } = useController({ name, control })

  // State to track character count
  const [charCount, setCharCount] = useState(field.value?.length || 0)

  // Handle textarea change
  const handleChange = (e) => {
    setCharCount(e.target.value.length)
    field.onChange(e) // Ensure the change is registered with react-hook-form
  }

  return (
    <FormControl
      isReadOnly={isReadOnly || isSubmitting}
      isInvalid={Boolean(error)}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      {label && <FormLabel>{label}</FormLabel>}

      <Box position='relative'>
        <Textarea
          resize='none'
          {...field}
          {...rest}
          maxLength={maxLength}
          onChange={handleChange}
        />
        {withCounter && (
          <Text
            position='absolute'
            bottom='10px'
            right='5px'
            fontSize='10px'
            color='gray.500'
          >
            {charCount}/{maxLength}
          </Text>
        )}
      </Box>

      {error ? (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
