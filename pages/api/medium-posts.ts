import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

// @ts-ignore
import Meed from 'meed'

function extractImage(content: string) {
  const $ = cheerio.load(content)
  return $('img').attr('src')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const meed = new Meed({ fetch: fetch })

    const feed = await meed.user('@cardano-fans')
    const formattedFeed = feed.map((post: any) => {
      return {
        title: post.title,
        link: post.link,
        date: post.date,
        thumbnail: extractImage(post.content),
      }
    })

    res.status(200).json(formattedFeed)
  } catch (e) {
    console.log(e)
    res.status(401).json(e)
  }
}
