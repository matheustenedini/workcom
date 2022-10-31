import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
// import { parseCookies } from 'nookies';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="images/favicon.ico" />
          <meta
            name="description"
            content="Encontre o profissional perfeito para você"
          />
          <title>Workcom</title>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-portal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
