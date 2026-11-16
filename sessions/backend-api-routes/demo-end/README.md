# Quotes API: Demo End

The end of the live demo: CRUD routes for quotes (in memory), validation, a 404 handler, an error handler and CORS.

```bash
npm i
npm run dev
```

Try the routes with the Bruno collection in `bruno/`: open the folder in Bruno (**Open Collection**), select the environment `Local` and send the requests, or run them all with the **Runner**. The data is in memory: restart the server to reset it. `web/index.html` calls the API from another origin (`npx serve web -l 5173`).
