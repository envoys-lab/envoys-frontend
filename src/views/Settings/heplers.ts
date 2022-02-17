const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const documentNormalize = (response: object) => {
  const arr = []

  if (!response) return arr

  for (const [type, { verified, comment }] of Object.entries(response)) {
    arr.push(`${capitalize(type)} verification: ${verified ? 'Accepted' : 'Declined'} (${comment})`)
  }

  return arr
}
