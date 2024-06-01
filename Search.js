addEventListener('fetch', event => {
  event.respondWith(handleSearchRequest(event.request))
})

async function handleSearchRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  if (path.startsWith('/search')) {
    // Extract the key from the query parameters
    const searchParams = new URLSearchParams(url.search)
    const key = searchParams.get('key')

    if (!key) {
      return new Response('Key parameter is missing', { status: 400 })
    }

    // Fetch the value from KV namespace
    const value = await AIRTELEDGE.get(key)

    if (!value) {
      return new Response('Key not found', { status: 404 })
    }

    // Return the value as plain text
    return new Response(value, {
      headers: { 'Content-Type': 'text/plain' },
    })
  } else {
    return new Response('Not Found', { status: 404 })
  }
}
