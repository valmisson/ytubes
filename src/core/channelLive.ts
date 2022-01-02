import { URL } from 'url'
import { SearchOptions } from '../types/shims'
import { defaultOptions, headers } from '../constants/default'
import { fetch, isEmpty, sliceResults } from '../shared'
import { extractVideoData, getSearchData } from '../parses'

async function channelLive <T> (channelId: string, isLive: boolean, options: SearchOptions): Promise<Array<T>> {
  if (!channelId) {
    throw new Error('Channel id is empty')
  }

  const {
    type = defaultOptions.type,
    max = defaultOptions.max,
    language = defaultOptions.language
  } = options

  const liveCode = isLive ? '501' : '503'
  const channelUrl = new URL(`https://www.youtube.com/channel/${channelId}/videos?view=2&live_view=${liveCode}&ucbcb=1`)
  const webPage = await fetch(channelUrl, {
    headers: {
      ...headers,
      'Accept-Language': language
    }
  })

  const renderer = getSearchData(webPage, /var ytInitialData = (.*);<\/script>/)

  if (isEmpty(renderer)) return []

  const resultsData = extractVideoData<T>(type, renderer, {
    channelId,
    isLive
  })
  const results = sliceResults<T>(resultsData, max)

  return results
}

export default channelLive
