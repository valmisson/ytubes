# ytubes

[![npm][npm-shields]](https://www.npmjs.com/package/ytubes)
[![license][license-shields]](https://github.com/valmisson/ytubes/blob/main/LICENSE)

Search for videos, playlists, channels, movies. live and musics on youtube without api key.

## Install

```bash
yarn add ytubes
```

## Usage

```js
import ytubes from 'ytubes'

const videos = await ytubes.getVideo('Amor e fé', { max: 1, language: 'pt-BR' })
```

### Typescript

```ts
import * as ytubes from 'ytubes'
```

## Functions

### getVideo(query, options)

Returns the details of all videos found

```js
const video = await ytubes.getVideo('Amor e fé')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'iZq0u3quAqo',
      type: 'video',
      title: 'Hungria Hip Hop - Amor e Fé (Official Music Video) #CheiroDoMato',
      views: 291003057,
      duration: '5:24',
      uploaded: '1 year ago',
      link: 'https://www.youtube.com/watch?v=iZq0u3quAqo',
      shareLink: 'https://youtu.be/iZq0u3quAqo',
      channel: 'https://www.youtube.com/channel/UCAI8SmRbXgSpP8Zo3xZbxzQ',
      thumbnail: 'https://i.ytimg.com/vi/iZq0u3quAqo/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getPlaylist(query, options)

Returns the details of all playlist found

```js
const playlist = await ytubes.getPlaylist('Tribo da Periferia - As Melhores')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'PL7V1hXWh2rMr4pz6lCkzHMHMLU3-BfQ2S',
      type: 'playlist',
      title: 'AS MELHORES - TRIBO DA PERIFERIA',
      videoCount: 49,
      link: 'https://www.youtube.com/playlist?list=PL7V1hXWh2rMr4pz6lCkzHMHMLU3-BfQ2S',
      channel: 'https://www.youtube.com/channel/UCe5pPUSFEajlij-LrxUl19A',
      thumbnail: 'https://i.ytimg.com/vi/crfRRVISmsw/maxresdefault.jpg',
      preview: [
        {
          id: 'YrQLmElRT-E',
          title: 'Tribo da Periferia - Imprevisível (Official Music Video)',
          duration: '4:09',
          link: 'https://www.youtube.com/watch?v=YrQLmElRT-E',
          shareLink: 'https://youtu.be/YrQLmElRT-E',
          thumbnail: 'https://i.ytimg.com/vi/YrQLmElRT-E/maxresdefault.jpg'
        },
        ...
      ]
    },
    ...
  ]
  ```
</details>

### getChannel(query, options)

Returns the details of all channel found

```js
const channel = await ytubes.getChannel('Hungria Hip Hop')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'UCAI8SmRbXgSpP8Zo3xZbxzQ',
      type: 'channel',
      name: 'OficialHungria',
      verified: true
      link: 'https://www.youtube.com/c/OficialHungria',
    },
    ...
  ]
  ```
</details>

### getMovie(query, options)

Returns the details of all movies found

```js
const movie = await ytubes.getMovie('filmes de ação')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'MuTYo9tofSY',
      type: 'video',
      title: 'Thor Ragnarok Full Video - Voiced Motion Comic (Marvel Comics)',
      views: 7119537,
      duration: '1:33:17',
      uploaded: '4 years ago',
      link: 'https://www.youtube.com/watch?v=MuTYo9tofSY',
      shareLink: 'https://youtu.be/MuTYo9tofSY',
      channel: 'https://www.youtube.com/user/boscheinen',
      thumbnail: 'https://i.ytimg.com/vi/MuTYo9tofSY/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getLive(query, options)

Returns the details of all lives found

```js
const live = await ytubes.getLive('Coding in Chicago')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'esX7SFtEjHg',
      type: 'live',
      title: 'Coding in Chicago | 🎧  LoFi Jazz Hip-Hop [Code - Relax - Study]',
      link: 'https://www.youtube.com/watch?v=esX7SFtEjHg',
      shareLink: 'https://youtu.be/esX7SFtEjHg',
      channel: 'https://www.youtube.com/channel/UC9rvsIHgzuiwTQ-yi0Qj2Mw',
      thumbnail: 'https://i.ytimg.com/vi/esX7SFtEjHg/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getMusic(query, options)

Returns the details of all musics found

```js
const music = await ytubes.getMusic("2Pac - Pac's Life")
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'A1HvFGTB7NE',
      type: 'music',
      title: "Pac's Life (feat. T.I. & Ashanti)",
      artist: '2Pac',
      album: "Pac's Life",
      duration: '3:37',
      link: 'https://music.youtube.com/watch?v=A1HvFGTB7NE',
      videoLink: 'https://www.youtube.com/watch?v=A1HvFGTB7NE',
      channel: 'https://music.youtube.com/channel/UC5RrGzC-JXglhFW5NhT4r6w',
      thumbnail: 'https://i.ytimg.com/vi/A1HvFGTB7NE/maxresdefault.jpg',
      explicit: true
    },
    ...
  ]
  ```
</details>

### search(query, options)

Returns the details of seach

```js
const videos = await ytubes.search('beautiful', { type: 'video' })
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: '_FE194VN6c4',
      type: 'video',
      title: 'Snoop Dogg - Beautiful (Official Music Video) ft. Pharrell Williams',
      views: 160183177,
      duration: '5:29',
      uploaded: '12 years ago',
      link: 'https://www.youtube.com/watch?v=_FE194VN6c4',
      shareLink: 'https://youtu.be/_FE194VN6c4',
      channel: 'https://www.youtube.com/channel/UC-OO324clObi3H-U0bP77dw',
      thumbnail: 'https://i.ytimg.com/vi/_FE194VN6c4/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

## Functions options

| Property | Default | Description |
|----------|---------|-------------|
| `max` | `30` | Set the maximum amount of results to return. |
| `language` | `en` | Set the language that you would like for results to be returned in. |
| | | &#11206; Option available only in `search`. |
| `type` | `video` | Set the type of search on Youtube. The supported types are `video`, `playlist`, `channel`, `movie`, `live`, and `music`. |


## Note

You should keep in mind that this library does not use an official YouTube API and a change may cause an error in the search.

## License
[MIT](LICENSE)

Copyright (c) 2021 Valmisson Grizorte

[npm-shields]: https://img.shields.io/npm/v/ytubes.svg
[license-shields]: https://img.shields.io/badge/license-MIT-green
