import { get, RequestOptions } from 'https'
import { URL } from 'url'

const defaultOptions: RequestOptions = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36'
  }
}

export function fetch (url: string | URL, options = {}): Promise<string> {
  const opts = Object.assign(defaultOptions, options)

  return new Promise((resolve, reject) => {
    get(url, opts, (res) => {
      res.setEncoding('utf-8')

      let data = ''

      res.on('data', chuck => {
        data += chuck
      })

      res.on('end', () => resolve(data))
    }).on('error', error => reject(error))
  })
}
