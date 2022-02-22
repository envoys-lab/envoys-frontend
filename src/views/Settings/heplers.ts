const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const isVerificationPassed = (response: object) => {
  if (!response) return false
  for (const [type, { verified }] of Object.entries(response)) {
    if (!verified) {
      return false
    }
  }

  return true
}

export const documentNormalize = (response: object) => {
  const arr = []

  if (!response) return arr

  for (const [type, { comment }] of Object.entries(response)) {
    arr.push(`${comment}`)
  }

  return arr
}
