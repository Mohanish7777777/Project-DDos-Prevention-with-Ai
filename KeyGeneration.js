addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Extract the client's IP address
  const clientIP = request.headers.get('cf-connecting-ip')

  // If IP address is not available, return an error response
  if (!clientIP) {
    return new Response('Unable to determine IP address.', { status: 400 })
  }

  // Use ipgeolocation.io API to get details about the IP address
  const apiKey = 'd0cfa0c3a706416eaef1f5b54bf563c0' // Replace with your ipgeolocation.io API key
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${clientIP}`

  // Fetch the IP information
  const response = await fetch(url)
  const ipDetails = await response.json()

  // Extract the organization field and replace known organizations
  let organization = ipDetails.organization || 'Unknown'
  if (organization === 'Bharat Sanchar Nigam Ltd') {
    organization = 'BSNL'
  } else if (organization === 'Reliance Jio Infocomm Limited') {
    organization = 'JIO'
  } else if (organization === 'Bharti Airtel Limited') {
    organization = 'AIRTEL'
  } else if (organization === 'vi') {
    organization = 'VODAFONE'
  }

  let country_code2 = ipDetails.country_code2 
  let ip = ipDetails.ip

  // Generate random data
  const dataToHash = generateRandomString(20) // Generating a random string of length 20

  // Generate the hash
  const hash = await generateHash(dataToHash)

  // Create the result by appending the hash to the organization name
  const result = `${organization}_${country_code2}_${ip}_${hash}`

  // Save the result with an incrementing key in the KV namespace
  let key = 1;
  let value;
  do {
    value = await AIRTELEDGE.get(`KEY_${key}`);
    key++;
  } while (value !== null);
  await AIRTELEDGE.put(`Key_${key}`, result);

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
