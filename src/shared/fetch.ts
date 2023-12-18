import { get } from 'node:https'
import { URL } from 'node:url'

export function fetch (url: string | URL, options = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    get(url, options, (res) => {
      res.setEncoding('utf-8')

      let data = ''

      res.on('data', chuck => {
        data += chuck
      })

      res.on('end', () => resolve(data))
    }).on('error', error => reject(error))
  })
}
