import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width" />
          <meta name="keywords" content="UnCSS Online,在线去除CSS" />
          <meta name="description" content="在线一键去除多余的CSS代码，一键去除没有引用的css样式，CV编程党，面向搜索引擎编程党之必备神器" />
          <link rel="icon" href="/static/img/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
