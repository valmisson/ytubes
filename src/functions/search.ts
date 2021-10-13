import { SearchOptions } from '../types/shims'
import { ExtractData } from '../types/data'
import { extractData, fetch, findByKey, getSearchData, isEmpty } from '../shared'
import { defaultOptions, headers, searchTypes, ytURL } from '../constants/default'

async function search (query: string, options: SearchOptions): Promise<Array<ExtractData>> {
  options = options ? Object.assign(defaultOptions, options) : defaultOptions

  if (!query) {
    throw new Error('Search query has empty')
  }

  const { language, type } = options

  const sp: string = findByKey(type, searchTypes)

  ytURL.search = `sp=${sp}&search_query=${query}`

  const webPage = await fetch(ytURL, {
    headers: {
      ...headers,
      'Accept-Language': language
    }
  })

  const renderer = getSearchData(webPage)

  if (isEmpty(renderer)) return []

  const results = extractData(type, renderer)

  return results
}

export default search
