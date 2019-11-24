import Document, { Html, Head, Main, NextScript } from 'next/document'
import ProgressLoading from '../src/common/components/widgets/ProgressLoading'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
        </Head>
        <body className='custom_class'>
          <Main />
          <NextScript />
          <ProgressLoading.Component />
        </body>
      </Html>
    )
  }
}

export default MyDocument
