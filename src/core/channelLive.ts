import { URL } from 'url';
import { SearchOptions } from '../types/shims'
import { defaultOptions, headers } from '../constants/default'
import { fetch, findByKey, isEmpty, sliceResults } from '../shared'
import { extractVideoData, getSearchData } from '../parses'

async function channelLive <T> (channelId: string, options: SearchOptions): Promise<Array<T>> {
  if (!channelId) {
    throw new Error('Channel id is empty')
  }

  const {
    type = defaultOptions.type,
    max = defaultOptions.max,
    language = defaultOptions.language
  } = options

  let url = new URL(`https://m.youtube.com/channel/${channelId}/videos?view=2&live_view=501`);
  const webPage = await fetch(url, {
    headers: {
      ...headers,
      'Accept-Language': language
    }
  })

  const renderer = getSearchData(webPage, /var ytInitialData = (.*);<\/script>/)

  if (isEmpty(renderer)) return []

  const resultsData = extractVideoData<T>(type, renderer)
  const results = sliceResults<T>(resultsData, max)

  return results
}

export default searchVideo
