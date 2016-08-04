import 'whatwg-fetch'

export async function getRate() {
  const response = await fetch('http://api.fixer.io/latest')

  return (await response.json())
}
