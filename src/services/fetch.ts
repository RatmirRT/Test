export async function fetchRequest(Url: string) {
  const url = 'https://www.cbr-xml-daily.ru/'
  try {
    const response = await fetch(url + Url)
    const answer = await response.json()
    return answer
  } catch (err) {
    console.log(err)
  }
}
