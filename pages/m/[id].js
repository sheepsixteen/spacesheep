import styled from 'styled-components'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import firebase from '../../modules/firebase'
import { useDocumentDataOnce, useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import Spinner from '@atlaskit/spinner'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as matter from 'gray-matter'
import * as MarkdownIt from 'markdown-it'
import Link from 'next/link'
import Tag from '@atlaskit/tag'
import TagGroup from '@atlaskit/tag-group'
import Difficulty from '../../components/Difficulty'
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs'
import TextField from '@atlaskit/textfield'
import Button from '@atlaskit/button'
import { Checkbox } from '@atlaskit/checkbox'
import Form, { Field, FormHeader, HelperMessage, FormFooter, CheckboxField, ErrorMessage } from '@atlaskit/form'
import Tabs from '@atlaskit/tabs'
import SectionMessage from '@atlaskit/section-message'

// TODO: add field validation
// TODO: split this into components
// TODO: add a "you entered the solution x days ago" text
// TODO: show other users' solutions
// TODO: fix 8px gap on the left of the tabs (so annoying)
// TODO: add "everything ok" once saved to firebase

const MissionPage = ({}) => {
  const md = new MarkdownIt()
  const router = useRouter()
  const { id: mid } = router.query
  const [mission, loading, error] = useDocumentDataOnce(
    firebase.firestore().doc('missions/' + mid)
  )
  const [content, setContent] = useState('')
  const [gistValue, setGistValue] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)
  const [isPublic, setIsPublic] = useState(true)
  const [solutions, setSolutions] = useState([])

  useEffect(() => {
    if (mid) {
      firebase.firestore()
        .collection('solutions')
        .where('isPublic', '==', true)
        .where('mid', '==', mid)
        .limit(10)
        .get()
        .then(snapshot => {
          var arr = []
          snapshot.docs.forEach(x => arr.push(x.data()))
          setSolutions(arr)
        })
    }
  }, [mid])

  useEffect(() => {
    if (firebase.auth().currentUser) {
      firebase.firestore()
        .doc(`users/${firebase.auth().currentUser.uid}/missions/${mid}`)
        .get()
        .then(snapshot => {
          setGistValue(snapshot.data().solution)
          setIsPublic(snapshot.data().isPublic)
        })
    }
  }, [firebase.auth().currentUser])

  useEffect(() => {
    const fetchContent = async () => {
      const result = await axios(mission.from)
      setContent(matter(result.data))
    }
    !loading && fetchContent()
  }, [mission])

  return (
    <Layout>
      {
        !(mission && content.content)
          ? <FullscreenSpinnerContainer><Spinner size='medium' /></FullscreenSpinnerContainer>
          : <>
            {
              mission.source &&
                <BreadcrumbsStateless>
                  {
                    mission.source.map((x, i) =>
                      <BreadcrumbsItem key={'breadcrumb' + i} href={x.href} text={x.label} />)
                  }
                </BreadcrumbsStateless>
            }
            <h1 style={{ margin: '.5rem 0' }}>{mission.title}</h1>
            <TagGroup>
              <Difficulty difficulty={mission.difficulty} />
              {
                mission.tags.map((x, i) => (
                  <Link key={'tag' + i} href='/tags/[tag]' as={'/tags/' + x}>
                    <Tag href={'/tags/' + x} text={'#' + x} />
                  </Link>))
              }
            </TagGroup>

            <div style={{ marginTop: '1.5rem', maxWidth: '60rem' }} dangerouslySetInnerHTML={{ __html: md.render(content.content) }} />
            <Gap />

            <Tabs
              selected={selectedTab}
              onSelect={(selected, i) => setSelectedTab(i)}
              tabs={[
                {
                  label: 'Enter your solution',
                  content:
            <>
              {
                firebase.auth().currentUser
                  ? <Form onSubmit={data => {
                    var uid = firebase.auth().currentUser.uid
                    firebase.firestore()
                      .collection('solutions')
                      .where('isPublic', '==', true)
                      .where('uid', '==', uid)
                      .where('mid', '==', mid)
                      .get()
                      .then(snapshot => {
                        if (snapshot.empty) {
                          // create a new document
                          firebase.firestore()
                            .collection('/solutions')
                            .add({
                              uid: firebase.auth().currentUser.uid,
                              mid: mid,
                              gist: data.gist_id,
                              timestamp: new Date(),
                              isPublic: data.isPublic
                            })
                            .catch(err => {
                              console.log(err)
                            })
                        } else {
                          // document exists, update it
                          snapshot.docs[0].ref
                            .set({
                              uid: firebase.auth().currentUser.uid,
                              mid: mid,
                              gist: data.gist_id,
                              timestamp: new Date(),
                              isPublic: data.isPublic
                            })
                            .catch(err => {
                              console.log(err)
                            })
                        }
                      })
                      .catch(err => {
                        console.log(err)
                        // TODO: Display an error
                      })
                  }}
                    >
                    {({ formProps, submitting }) => (
                      <form style={{ width: '100%' }} {...formProps}>
                        <Gap />
                        <FormHeader title='Save a gist with this mission' />
                        <p style={{ maxWidth: '30rem' }}>
                                You can save a <a title='Create a gist' href='https://gist.github.com/'>Github gist</a> with this mission for your own reference, or you can save it publicly to show off your awesome solution to this mission to the spacesheep community.
                        </p>
                        <Field label='Gist ID' name='gist_id' defaultValue={gistValue} isRequired>
                          {({ fieldProps }) =>
                            <>
                              <TextField {...fieldProps} />
                              <HelperMessage>
                                    This should look something like "123b70d251dbcb51d9db9d2757c650af".
                              </HelperMessage>
                              {
                                error &&
                                  <ErrorMessage>
                                      Sorry, there was a problem, try again?
                                  </ErrorMessage>
                              }
                            </>}
                        </Field>
                        <CheckboxField name='isPublic' label='Show publicly' defaultIsChecked={isPublic}>
                          {({ fieldProps }) => (
                            <Checkbox {...fieldProps} label="Show this solution on your profile and in the 'solutions' tab of this mission." />
                          )}
                        </CheckboxField>
                        <FormFooter>
                          <Button type='submit' appearance='primary' isLoading={submitting}>
                            Upload solution
                          </Button>
                        </FormFooter>
                      </form>
                    )}
                    </Form>
                  : <div style={{ width: '100%', marginTop: '1rem' }}>
                    <SectionMessage>
                      <p>
                        <Link href='/signup'><a>Sign up</a></Link> or <Link href='/login'><a>login</a></Link> to save a solution to this mission.
                      </p>
                    </SectionMessage>
                    </div>
              }
            </>
                },
                {
                  label: 'Solutions',
                  content: (
                    <div style={{ width: '100%' }}>
                      <SmallGap />
                      <h2 style={{ margin: '0' }}>Other users' solutions</h2>
                      <EvenSmallerGap />
                      {
                        solutions.map(solution => (
                          <><Solution>
                            <Link href={'https://gist.github.com/' + solution.gist}>
                              <a>Solution by {solution.uid}</a>
                            </Link>
                          </Solution><Solution>
                              <Link href={'https://gist.github.com/' + solution.gist}>
                              <a>Solution</a>
                            </Link>
                          </Solution>
                          </>
                        ))
                      }
                    </div>
                  )
                }
              ]}
            />
          </>
      }
    </Layout>
  )
}

const Gap = styled.div`
  padding: 1rem 0;
`

const SmallGap = styled.div`
  padding: 16.5px 0; /* I don't know why it's this number */
`

const EvenSmallerGap = styled.div`
  padding: 8px;
`

const FullscreenSpinnerContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Solution = styled.div`
  padding: 12px;
  border: 1px solid #eee;
  width: 100%;
  margin-bottom: .2rem;
  border-radius: 2px;
`

export default MissionPage
