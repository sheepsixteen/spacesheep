# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2020-04-26
*This update was a real headache so please be nice to me for the next couple of days*
### Added 
- `/u` will redirect to `/u/[signed-in-username]`
- Firebase emulators for dev experience
- Firebase functions `setUsername` ensures that users won't set their name to be the same as others
### Changed
- Moved profile page to `/u/[username]`
- All data about users should now be saved in firestore rather than firebase auth
## Removed
- `/profile` page (same as `/u/[my username]`)

## [1.1.3] - 2020-04-24
- Working on pagination but its not done yet
### Added
- `useEntities` generalises missions -> entities (for future use)

## [1.1.2] - 2020-04-22
### Added
- More content on user's profile page
### Changed
- Improved profile page

## [1.1.1] - 2020-04-20
### Changed
- Moved `solution` to its own file
- Improved display of solutions

## [1.1.0] - 2020-04-18
### Added
- useAuth, useInteraction, and useMission are hooks which make it super easy to interact with the database
- create-account.js adds more information (such as full name) to a user
### Changed
- Moved some components out to their own file
- Change footer and navbar background colour
- Rename \[id\].js to \[mid\].js
- Database structure
### Removed
- Delete account (very unstable so we'll just implement it later)

## [1.0.2] - 2020-04-15
### Changed
- Fix navbar links on desktop

## [1.0.1] - 2020-04-13
### Added
- Logout option
### Changed
- Better (imo) design for navbar on mobile
- Some minor code-side adjustments to /signup and /login. (nothing major)
- Started working on showing other user's solutions to missions, (not done)

## [1.0.0] - 2020-04-10
### Added
- Terrible homepage (fix me in the next version)
- Navbar, Footer
- Some layout components
- Login / Signup pages
- Display of missions
- Profile page
- Save a gist for each mission