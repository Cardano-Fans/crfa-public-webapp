import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import dayjs from 'dayjs'

type Status = 'idle' | 'loading' | 'loaded' | 'error'
type Post = {
  link: string
  title: string
  thumbnail: string
  pubDate: string
  description: string
}

const mediumFetch = async (name: string) => {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${name}`
  )
  return await res.json()
}

export const News: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    setStatus('loading')
    mediumFetch('@cardano-fans')
      .then((res) => {
        setPosts(res.items)
        setStatus('loaded')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [])

  return (
    <section id="news" className="news py-36 mx-auto">
      <div className="container mx-auto pl-6 sm:pl-0 pr-6 sm:pr-0">
        <h2 className="section-heading mb-16" data-aos="fade-down">
          News
        </h2>

        <div>
          {status === 'loading' && <p className="text-white">Loading...</p>}
          {status === 'loaded' && (
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              spaceBetween={20}
              slidesPerView={3}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
              }}
            >
              {posts.map((post, index) => (
                <SwiperSlide key={index}>
                  <PostCard post={post} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  )
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-card p-8 rounded-md post-card mb-10 h-full">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 block"
      >
        <img
          src={post.thumbnail}
          className="h-52 object-cover w-full mb-6"
          alt="post cover"
        />

        <h3 className="text-white text-lg">{post.title}</h3>
      </a>
      <div className="text-sm text-white">
        {dayjs(post.pubDate).format('MMM DD, YYYY')}
      </div>
    </div>
  )
}

export default News
