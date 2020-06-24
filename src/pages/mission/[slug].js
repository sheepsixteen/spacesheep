// import styled from 'styled-components'
// import Layout from '../../components/Layout'
// import { useRouter } from 'next/router'
// import { useState } from 'react'
// import Tabs from '@atlaskit/tabs'
// import useMission from '../../util/useMission'
// import { MissionCard } from '../../components/Mission'
// import YourSolution from '../../components/YourSolution'
// import CommunitySolutions from '../../components/CommunitySolutions'
// import { codeFontFamily } from '@atlaskit/theme'
// import { firestore } from 'firebase'
import axios from 'axios'
import * as matter from 'gray-matter'
import * as MarkdownIt from 'markdown-it'
// import Tag from '@atlaskit/tag'
// import styles from './Mission.module.sass'
// import Actions from '../../components/Mission/Actions'
// import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs'
import MissionScreen from 'screens/MissionScreen'
import firebase from 'util/firebase'

// import Flag from '@atlaskit/icon/glyph/flag-filled'
// import { colors } from '@atlaskit/theme'

// const MissionPage = ({ mission }) => {
//   const [selectedTab, setSelectedTab] = useState(0)

//   if (!mission) {
//     return <Layout title='Loading...' loading />
//   }

//   return (
//     <Layout title={mission.title}>

//       <div className={styles.grid}>
//         {/* Header */}
//         <div className={styles.header}>
//           <div className={styles.heading}>
//             <h1 className={styles.title}>{mission.title}</h1>

//             <div className={styles.actions}>
//               <h4 className={styles.smol}>Actions</h4>
//               <Actions verbose eid={mission.id} />
//             </div>

//             <div className={styles.tags}>
//               <h4 className={styles.smol}>Tags</h4>
//               {mission.tags && mission.tags.map(tag => (
//                 <Tag
//                 key={tag}
//                 text={tag}
//                 color='grey'
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           {/* Mission */}
//           <div className={styles.mission}>
//             <div className={styles.missionContentHeader}>
//               {mission.source ? (
//                 <BreadcrumbsStateless>
//                   {mission.source.map((x, i) => (
//                     <BreadcrumbsItem key={'breadcrumb' + i} href={x.href} text={x.label} />
//                   ))}
//                 </BreadcrumbsStateless>
//               ) : <p>Unkown source</p>}

//               <Flag />
//             </div>
//             <div className={styles.missionContentBody}>
//               <div dangerouslySetInnerHTML={{ __html: mission.body }} />
//             </div>
//           </div>

//           {/* Solutions */}
//           <div className={styles.solution}>
//           <Tabs
//             selected={selectedTab}
//             onSelect={(selected, i) => setSelectedTab(i)}
//             tabs={[
//               {
//                 label: 'Your solution',
//                 content: <YourSolution mid={mission.id} />
//               },
//               {
//                 label: 'Community solutions',
//                 content: <CommunitySolutions mid={mission.id} />
//               }
//             ]}
//           />
//         </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

const MissionPage = ({ mission }) => {
  return <MissionScreen mission={mission} />
}

export async function getStaticPaths() {
  const snapshot = await firebase
    .firestore()
    .collection('entities')
    .where('type', '==', 'mission')
    .get()

  return {
    paths: snapshot.docs.map((doc) => ({ params: { slug: doc.data().slug } })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const md = new MarkdownIt()
  const snapshot = await firebase
    .firestore()
    .collection('entities')
    .where('slug', '==', context.params.slug)
    .get()

  const body = await axios.get(snapshot.docs[0].data().from)

  // Extract the content (disregarding front matter)
  const matterObj = matter(body.data)

  // Render markdown
  const html = md.render(matterObj.content)

  return {
    props: {
      mission: {
        id: snapshot.docs[0].id,
        body: html,
        ...snapshot.docs[0].data(),
      },
    },
  }
}

export default MissionPage
