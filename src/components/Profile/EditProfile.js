import Button from '@atlaskit/button'
import Form, { Field, FormFooter } from '@atlaskit/form'
import Modal from '@atlaskit/modal-dialog'
import TextField from '@atlaskit/textfield'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import firebase from 'util/firebase'

const EditProfile = ({ uid, profile, onClose, ...props }) => {
  const pictureRef = useRef(null)

  const updatePicture = (file) => {
    // This is where we'll upload the picture
    const firebasePictureRef = firebase.storage().ref(`users/${uid}/picture`)

    return firebasePictureRef
      .put(file)
      .then((res) => firebasePictureRef.getDownloadURL())
  }

  const updateUserData = (data) => {
    for (const key of Object.keys(data)) {
      if (!data[key]) {
        delete data[key]
      }
    }

    return firebase.firestore().doc(`users/${uid}`).update(data)
  }

  const update = (data) => {
    console.log({ data })
    // If there is a picture to upload
    if (pictureRef.current.files[0]) {
      updatePicture(pictureRef.current.files[0]).then((url) =>
        updateUserData({ ...data, picture: url })
      )
    } else {
      updateUserData({ ...data })
    }

    onClose()
  }

  return (
    <Modal
      {...props}
      heading="Edit Profile"
      components={{
        Body: () => (
          <div style={{ padding: '0 24px 24px' }}>
            <Form onSubmit={update}>
              {({ formProps, submitting }) => (
                <form {...formProps}>
                  <Field
                    name="picture"
                    defaultValue={profile.picture}
                    label="Profile Picture"
                  >
                    {({ fieldProps }) => (
                      <p {...fieldProps}>
                        <input accept="image/*" ref={pictureRef} type="file" />
                      </p>
                    )}
                  </Field>
                  <Field
                    name="fullname"
                    defaultValue={profile.fullname}
                    label="Full Name"
                  >
                    {({ fieldProps }) => <TextField {...fieldProps} />}
                  </Field>
                  <Field name="bio" defaultValue={profile.bio} label="Bio">
                    {({ fieldProps }) => <TextField {...fieldProps} />}
                  </Field>
                  <Field
                    name="github"
                    defaultValue={profile.github}
                    label="Github username"
                  >
                    {({ fieldProps }) => <TextField {...fieldProps} />}
                  </Field>
                  <Field
                    name="website"
                    defaultValue={profile.website}
                    label="Website URL (including https://)"
                  >
                    {({ fieldProps }) => <TextField {...fieldProps} />}
                  </Field>
                  <Field
                    name="company"
                    defaultValue={profile.company}
                    label="Company"
                  >
                    {({ fieldProps }) => <TextField {...fieldProps} />}
                  </Field>
                  <FormFooter>
                    <Button
                      onClick={(e) => onClose(e)}
                      type="submit"
                      appearance="subtle-link"
                    >
                      Cancel
                    </Button>
                    <Button
                      isLoading={submitting}
                      type="submit"
                      appearance="primary"
                    >
                      Update profile
                    </Button>
                  </FormFooter>
                </form>
              )}
            </Form>
          </div>
        ),
      }}
    ></Modal>
  )
}

export default EditProfile
