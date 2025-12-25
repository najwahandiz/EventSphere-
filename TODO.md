# TODO: Fix Issues in AdminAdd.jsx for Adding New Event

## Steps to Complete:
- [x] Fix the `addEvent` function to post the `newEvent` object instead of the `Events` array
- [x] Change the POST URL from port 3001 to 3000 to match the GET request
- [x] Map form fields to database schema (name -> title, url -> image)
- [x] Add default values for missing fields (availableTickets, featured, status, createdAt)
- [x] Fix select options to have proper value attributes
- [x] Test the changes (run the app and try adding an event)

## Dependent Files:
- src/Pages/Admin/AdminAdd.jsx (main file to edit)

## Followup Steps:
- Run the JSON server on port 3000
- Test adding a new event via the form
- Verify the new event appears in db.json and in the app

## Summary of Modifications Applied:
1. **addEvent function**: Changed to post `newEvent` instead of `Events` array, and fixed URL to port 3000.
2. **HandelEvent function**: Added field mapping (name -> title, url -> image), added defaults for availableTickets (100), featured (false), status ("active"), createdAt (current date), and parsed price as integer.
3. **Select options**: Added proper value attributes to each option (Art, Sport, Conference, Music).
