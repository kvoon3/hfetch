/* eslint-disable antfu/no-import-dist */
import { createFetch } from '../dist/index.js'

export const hfetch = createFetch({
  baseURL: 'https://google.com/v1',
  method: 'POST',
})
