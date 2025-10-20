import { app } from "./app.js"
import { env } from "./env/index.js"


const port = env.PORT

app.listen(port, () => {
  console.log(`🚀 HTTP server running on http://localhost:${port}`)
})
