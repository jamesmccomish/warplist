import wretch from 'wretch'

const baseUrl = 'https://api.warpcast.com'
const version = 'v2'

export const api = wretch(`${baseUrl}/${version}`)
	.errorType('json')
	.resolve((response, request) => {
		return (
			response
				.notFound((error) => {
					console.error('Endpoint Not Found Error', error)
				})
				.unauthorized((error) => {
					console.error('User Unauthorised Error', error)
				})
		)
	})

