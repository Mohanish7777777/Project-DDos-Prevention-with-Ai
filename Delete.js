addEventListener('fetch', event => {
  event.respondWith(handleDeleteAllEntries(event.request))
})

async function handleDeleteAllEntries(request) {
  // Retrieve the current counter value from the KV namespace
  let counterValue = await AIRTELEDGE.get('counter')

  // If the counter value doesn't exist, there are no entries to delete
  if (counterValue === null) {
    return new Response('No entries found', { status: 404 })
  }

  counterValue = parseInt(counterValue)

  // Delete all entries by iterating through keys and deleting them
  for (let i = 1; i <= counterValue; i++) {
    const key = `Key_${i}`
    await AIRTELEDGE.delete(key)
  }

  // Reset the counter value to 0
  await AIRTELEDGE.put('counter', '0')

  // Return success response
  return new Response('All entries deleted and counter value reset', {
    headers: { 'Content-Type': 'text/plain' },
  })
}
