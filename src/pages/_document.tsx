import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
                    <link rel="icon" type="image/png" href="/favicon-big.png" />
                    <title>SENDer - send files directly without overhead!</title>
                    <meta name="title" content="SENDer - send files directly without overhead!" />
                    <meta name="description" content="Share files with people located around you without middlewares! WebRTC connection makes data you send completely private, so even we don't know what you send!" />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.sndr.club" />
                    <meta property="og:title" content="SENDer - send files directly without overhead!" />
                    <meta property="og:description" content="Share files with people located around you without middlewares! WebRTC connection makes data you send completely private, so even we don't know what you send!" />
                    <meta property="og:image" content="/preview-large.png" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://www.sndr.club" />
                    <meta property="twitter:title" content="SENDer - send files directly without overhead!" />
                    <meta property="twitter:description" content="Share files with people located around you without middlewares! WebRTC connection makes data you send completely private, so even we don't know what you send!" />
                    <meta property="twitter:image" content="/preview-large.png"></meta>
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
