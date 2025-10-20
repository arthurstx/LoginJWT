// api/index.ts
export const config = { runtime: 'nodejs' }

// importa do BUILD (../dist), não de ../src
import * as appModule from '../dist/app.js'
import serverless from 'serverless-http'

// pega default, ou nomeado, ou o módulo em si
const app: any = (appModule as any).default ?? (appModule as any).app ?? appModule

export default serverless(app)
