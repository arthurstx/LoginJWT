// api/index.ts
import serverless from 'serverless-http'
import {app} from '../dist/app.js'

export const config = { runtime: 'nodejs20' }
export default serverless(app)
