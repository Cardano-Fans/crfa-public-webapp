import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { NewsSkeleton } from '../shared/LoadingSkeleton'

type Status = 'idle' | 'loading' | 'loaded' | 'error'
type Post = {
  link: string
  title: string
  thumbnail: string | null
  date: string
}

const mediumFetch = async () => {
  const res = await fetch(`/api/medium-posts`)
  return await res.json()
}

export const News: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    setStatus('loading')
    mediumFetch()
      .then((res) => {
        if (res.status === 'error') {
          setStatus('error')
          return
        }

        setPosts(res || [])
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
          {status === 'loading' && <NewsSkeleton />}
          {status === 'error' && (
            <div className="text-white">
              <p className="mb-3">
                Sorry, we cannot load previews of our blog posts at the moment.
              </p>
              <p>
                But you can always directly check out{' '}
                <a
                  href="https://cardano-fans.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  our blog
                </a>
              </p>
            </div>
          )}
          {status === 'loaded' && (
            <Swiper
              pagination={{
                dynamicBullets: true,
                clickable: true,
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
  const [imageError, setImageError] = useState(false)
  
  // Use fallback image if thumbnail is null or if there's an error loading the image
  const imageSrc = post.thumbnail && !imageError ? post.thumbnail : '/cardano-white.png'
  
  return (
    <div className="bg-card p-8 rounded-md post-card mb-10 h-full">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 block"
      >
        <Image
          src={imageSrc}
          className="h-52 object-cover w-full mb-6"
          alt={post.thumbnail ? "post cover" : "Cardano Fans blog post"}
          width={400}
          height={208}
          onError={() => setImageError(true)}
        />

        <h3 className="text-white text-lg">{post.title}</h3>
      </a>
      <div className="text-sm text-white">
        {dayjs(post.date).format('MMM DD, YYYY')}
      </div>
    </div>
  )
}

export default News
