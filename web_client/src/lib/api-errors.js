// because Fetch doesn't recognize error responses as
// actual errors since it's technically completing the response...
export function handleApiErrors (response) {
  console.log(response)
  const foo = response.json()
  console.log(foo)
  if (!response.ok) {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
  return response
}
