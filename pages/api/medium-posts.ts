import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

// @ts-ignore
import Meed from 'meed'

function extractImage(content: string) {
  const $ = cheerio.load(content)
  
  // Try to find the main content image (usually the first substantial image)
  const images = $('img')
  
  if (images.length === 0) {
    return null
  }
  
  // Look for images with Medium-specific patterns or larger sizes
  let bestImage = null
  const imageScores: { src: string; score: number }[] = []
  
  images.each((index, element) => {
    const src = $(element).attr('src')
    const alt = $(element).attr('alt') || ''
    const width = $(element).attr('width')
    const height = $(element).attr('height')
    
    if (src) {
      let score = 0
      
      // Skip very small images, icons, or profile pictures
      if (src.includes('profile-pic') || src.includes('icon') || 
          src.includes('avatar') || alt.toLowerCase().includes('avatar') ||
          src.includes('clap') || src.includes('response') || 
          src.includes('highlight') || src.includes('bookmark')) {
        return
      }
      
      // Higher score for Medium CDN images
      if (src.includes('cdn-images-1.medium.com') || src.includes('miro.medium.com')) {
        score += 10
      }
      
      // Higher score for larger images
      if (width && height) {
        const w = parseInt(width)
        const h = parseInt(height)
        if (w > 300 && h > 200) {
          score += 5
        }
      }
      
      // Higher score for images that appear early in content
      if (index < 3) {
        score += 3
      }
      
      // Prefer images with meaningful alt text
      if (alt && alt.length > 10) {
        score += 2
      }
      
      imageScores.push({ src, score })
    }
  })
  
  // Sort by score and return the best image
  imageScores.sort((a, b) => b.score - a.score)
  
  if (imageScores.length > 0) {
    bestImage = imageScores[0].src
  }
  
  return bestImage
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const meed = new Meed({ fetch: fetch })

    const feed = await meed.user('@cardano-fans')
    const formattedFeed = feed.map((post: any) => {
      const thumbnail = extractImage(post.content)
      
      return {
        title: post.title,
        link: post.link,
        date: post.date,
        thumbnail: thumbnail,
      }
    })

    res.status(200).json(formattedFeed)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch Medium posts' })
  }
}
