const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * importMissions is a function which adds two missions to the database - mostly for testing.
 * @param {} req
 * @param {*} res
 */
exports.importMissions = functions.https.onRequest((req, res) => {
  admin.firestore()
    .collection('entities')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        // Empty, lets add some stuff
        return admin.firestore()
          .doc('/entities/qLF2ghoJTMwg07183PtA')
          .set({
            difficulty: 2,
            from: 'https://raw.githubusercontent.com/sheepsixteen/missions/master/Palindromic%20Numbers.md',
            source: [
              { href: 'https://www.olympiad.org.uk/', label: 'British Informatics Olympiad' },
              { href: 'https://www.olympiad.org.uk/papers/2019/bio/bio19-exam.pdf', label: '2019 Paper' }
            ],
            tags: ['algorithm', 'good first mission'],
            title: 'Palindromic Numbers',
            type: 'mission'
          })
      } else {
        console.info('Already data in firestore.')
        res.send(snapshot.docs[0].data())
      }
    })
    .catch(err => {
      console.error('Error in firebase function: ', new Error(err))
      res.send(err)
    })
})
