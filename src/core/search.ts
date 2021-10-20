import { ExtractData } from '../types/data'
import { DefaultOptions } from '../types/shims'
import { defaultOptions, headers, searchTypes, ytURL } from '../constants/default'
import { extractData, fetch, findByKey, getSearchData, isEmpty, sliceResults } from '../shared'

async function search (query: string, options: DefaultOptions): Promise<Array<ExtractData>> {
  if (!query) {
    throw new Error('Search query has empty')
  }

  const {
    type = defaultOptions.type,
    max = defaultOptions.max,
    language = defaultOptions.language
  } = options

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

  const resultsData = extractData(type, renderer)
  const results = sliceResults(resultsData, max)

  return results
}

export default search
