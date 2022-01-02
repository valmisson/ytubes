import { get } from 'https'
import { URL } from 'url'

export function fetch (url: string | URL, options = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof url === 'string') {
      url = new URL(url)
    }
    const opts = {
      protocol: url.protocol,
      hostname: url.hostname,
      path: url.pathname + url.search,
      ...options
    }
    get(opts, (res) => {
      res.setEncoding('utf-8')

      let data = ''

      res.on('data', chuck => {
        data += chuck
      })

      res.on('end', () => {
        if (res.statusCode === 302) {
          fetch(res.headers.location || '', options).then(resolve).catch(reject)
        } else {
          resolve(data)
        }
      })
    }).on('error', error => reject(error))
  })
}
