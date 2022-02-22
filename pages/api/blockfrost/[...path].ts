import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const endpoint = Array.from(req.query.path).join('/')

  const address = `${process.env.BLOCKFROST_MAINNET_URL}/${endpoint}`

  try {
    const response = await fetch(address, {
      //@ts-ignore
      headers: {
        'Content-Type': 'application/json',
        project_id: process.env.BLOCKFROST_MAINNET_KEY,
      },
      method: req.method,
    })
    res.status(200).json(await response.json())
  } catch (e) {
    console.log(e)
    res.status(401).json(e)
  }
}
