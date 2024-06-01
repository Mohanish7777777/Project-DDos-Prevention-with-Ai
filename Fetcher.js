addEventListener('fetch', event => {
  event.respondWith(handlePrintAllEntries(event.request))
})

async function handlePrintAllEntries(request) {
  // Retrieve the current counter value from the KV namespace
  let counterValue = await AIRTELEDGE.get('counter')

  // If the counter value doesn't exist, initialize it
  if (counterValue === null) {
    return new Response('No entries found', { status: 404 })
  }

  counterValue = parseInt(counterValue)
  let entries = []

  for (let i = 1; i <= counterValue; i++) { // Start the loop from 1
    const key = `Key_${i}`
    const value = await AIRTELEDGE.get(key)
    if (value) {
      entries.push(`${key}: ${value}`)
    }
  }

  const result = entries.join('\n')

  // Return all entries as plain text
  return new Response(result, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
