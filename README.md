# hyperFetch
hyperFetch is a fetch function with expotential backoff

## Usage

```js
import { fetch } from '@hyper63/fetch'

async function main() {
  const result = await fetch('https://example.com')
  if (result.ok) {
    const body = await result.json()
    console.log(body)
  }
}
```

