import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = process.env.PREDICTION_API_URL

  if (!address) {
    res.status(500)
    return
  }

  try {
    const response = await fetch(address, {
      method: 'GET',
    })
    res.status(200).json(await response.json())
  } catch (e) {
    console.log(e)
    res.status(401).json(e)
  }
}
