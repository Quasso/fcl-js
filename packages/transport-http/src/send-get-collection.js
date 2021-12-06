import {invariant} from "@onflow/util-invariant"
import {httpRequest as defaultHttpRequest} from "./http-request.js"

export async function sendGetCollection(ix, context = {}, opts = {}) {
  invariant(opts.node, `SDK Send Get Collection Error: opts.node must be defined.`)
  invariant(context.response, `SDK Send Get Collection Error: context.response must be defined.`)

  const httpRequest = opts.httpRequest || defaultHttpRequest

  const res = await httpRequest({
    hostname: opts.node,
    path: `/collections/${ix.collection.id}`,
    method: "GET",
    body: null
  })

  const ret = response()
  ret.tag = ix.tag
  ret.collection = {
    id: res.id,
    transactionIds: null, // CHECK IF WE NEED TO HAVE BACKWARD COMPATIBILITY HERE
    transactions: res.transactions
  }

  return ret
}