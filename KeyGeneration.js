addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Generate random data
  const dataToHash = generateRandomString(20) // Generating a random string of length 20

  const hash = await generateHash(dataToHash)
  const result = `Airtel_in${hash}`

  // Return the result as plain text
  return new Response(result, {
    headers: { 'Content-Type': 'text/plain' },
  })
}

function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  const charsetLength = charset.length
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength)
    randomString += charset.charAt(randomIndex)
  }
  return randomString
}

async function generateHash(data) {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)

  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  return bufferToHex(hashBuffer)
}

function bufferToHex(buffer) {
  const byteArray = new Uint8Array(buffer)
  const hexCodes = [...byteArray].map(value => {
    const hexCode = value.toString(16)
    return hexCode.padStart(2, '0')
  })
  return hexCodes.join('')
}
