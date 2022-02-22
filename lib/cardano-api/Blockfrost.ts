export const Blockfrost = () => {
  return {
    name: 'data',
    exec: {
      request: async (endpoint: string, type?: string): Promise<any> => {
        if (!type) {
          type = 'get'
        }

        const address = `/api/blockfrost${endpoint}`

        const response = await fetch(address, {
          headers: { 'Content-Type': 'application/json' },
          method: type,
        })
          .then((r) => r.json())
          .catch((e: any) => Promise.reject(e))

        return response
      },
    },
  }
}
