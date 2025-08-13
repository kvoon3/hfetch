/* eslint-disable no-console */

import { hfetch } from './instance.js'

hfetch.hook('onRequest', async (ctx) => {
  ctx.options.query = {
    ...ctx.options.query,
    appid: 1,
    et: 1234,
    sign: 4321,
  }

  await new Promise(resolve => setTimeout(resolve, 3000))
})

hfetch.hook('onResponseError', (ctx) => {
  console.error('received a error', ctx)
})

async function main() {
  const res = await hfetch('test', {
    body: {
      account: '1234',
      password: '5678',
    },
  })

  console.log('res', res)
}

main()
