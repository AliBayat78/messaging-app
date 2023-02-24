import * as React from 'react'
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik'

interface MyFormValues {
  userId: string
}

type LoginType = {
  onSubmitId: React.Dispatch<React.SetStateAction<string>>
}

const Login = ({ onSubmitId }: LoginType) => {
  const initialValues: MyFormValues = { userId: '' }

  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions })
          onSubmitId(values.userId)
          actions.setSubmitting(false)
        }}
      >
        <Form>
          <label htmlFor="userId">First Name</label>
          <Field id="userId" name="userId" placeholder="First Name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
