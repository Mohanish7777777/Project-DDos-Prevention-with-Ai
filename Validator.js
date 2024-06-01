addEventListener('fetch', event => {
  event.respondWith(handleAccessGrant(event.request))
})

async function handleAccessGrant(request) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  // Retrieve key and expected value from request parameters
  const key = searchParams.get('key')
  const expectedValue = searchParams.get('value')

  // Ensure both key and expected value are provided
  if (!key || !expectedValue) {
    return new Response('Key and/or value not provided', { status: 400 })
  }

  // Retrieve the stored value associated with the key
  const storedValue = await AIRTELEDGE.get(key)

  // Check if the stored value matches the expected value
  if (storedValue === expectedValue) {
    // Delete the entry
    await AIRTELEDGE.delete(key)
    
    // Return "Access Granted" response along with a message
    const responseMessage = 'Access Granted\nIP:MAC Moved to Allowlist'
    return new Response(responseMessage, {
      headers: { 'Content-Type': 'text/plain' },
    })
  } else {
    // If the stored value does not match the expected value, return a 404 response
    return new Response('Access Denied', { status: 404 })
  }
}
