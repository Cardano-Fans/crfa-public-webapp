/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="canonical" href="https://cardano.fans/" />
          <link rel="shortlink" href="https://cardano.fans/" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="max-image-preview:large" />

          <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
          <link
            rel="icon"
            type="image/png"
            href="/logo192.png"
            sizes="192x192"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />

          <meta name="msapplication-TileImage" content="/logo270.png" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap;ver=5.8.2"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument