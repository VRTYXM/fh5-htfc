# FH5-HTFC (Forza Horizon 5 — Hard-to-Find Collector)

**FH5-HTFC** is a service for rare (Hard-to-Find — seasonal, backstage, etc.) car collectors in Forza Horizon 5

This is a multi-part project containing:

- **backend**: the server-side code (Node.js/Express).
- **frontend**: the client-side code (React).
- **database**: the dump file for importing the database (MongoDB).

## I want to try it now!

The link to the website is below. **Warning**: since the project's backend is hosted on Render (a free-tier account), the server goes into sleep mode after 15 minutes of inactivity. This can easily be bypassed, but there is also a monthly uptime limit, which cannot be avoided.

If you open the page and the table with car cards does not load, please leave the tab open and come back in 30-60 seconds. You don’t even need to refresh the page: the frontend handles such long requests correctly, and once the server wakes up from sleep mode, the content will be loaded and displayed even without any additional action from you.

Link: [FH5-HTFC](https://fh5-htfc.netlify.app/)
