import React from 'react'

import { Box, Button, Flex } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import ControlledInput from 'src/components/forms/components/ControlledInput'

type ForgotPasswordFormProps = {
  initialValues: Record<string, unknown>
  onSubmit: (
    values: Record<string, unknown>,
    actions: FormikHelpers<unknown>
  ) => void
}

const ForgotPasswordForm = ({
  initialValues,
  onSubmit,
}: ForgotPasswordFormProps) => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .email('Email moet wel een email zijn...')
      .required('Veld is verplicht')
      .min(4),
  })
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Box as={Form} w="full">
          <ControlledInput
            id="username"
            label="Email"
            placeholder="ronald@mesi.com"
          />

          <Flex alignItems="center" justifyContent="space-between" mt={4}>
            <Button colorScheme="secondary" type="submit">
              Herstel je wachtwoord
            </Button>
          </Flex>
        </Box>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm