import type { Hookable, HookKeys } from 'hookable'
import type { $Fetch, FetchContext, FetchResponse, ResponseType } from 'ofetch'
import { createHooks } from 'hookable'
import { $fetch } from 'ofetch'

export interface HookNameCallbackMap {
  onRequest: (ctx: FetchContext<any, ResponseType>) => any
  onRequestError: (ctx: FetchContext<any, ResponseType> & { error: Error }) => any
  onResponse: (ctx: FetchContext<any, ResponseType>) => any
  onResponseError: (ctx: FetchContext<any, ResponseType> & { response: FetchResponse<any> }) => any
}

interface Hookablefetch extends $Fetch, Hookable<HookNameCallbackMap, HookKeys<HookNameCallbackMap>> {}

const hooks = createHooks<HookNameCallbackMap>()

export function createFetch(...args: Parameters<typeof $fetch.create>): Hookablefetch {
  const hfetch: Hookablefetch = Object.assign(
    $fetch.create({
      async onRequest(ctx) {
        await hooks.callHook('onRequest', ctx)
      },
      async onRequestError(ctx) {
        await hooks.callHook('onRequestError', ctx)
      },
      async onResponse(ctx) {
        await hooks.callHook('onResponse', ctx)
      },
      async onResponseError(ctx) {
        await hooks.callHook('onResponseError', ctx)
      },
      ...args[0],
    }, args[1]),
    hooks,
  )

  return hfetch
}
