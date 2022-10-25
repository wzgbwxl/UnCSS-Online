import { NextPage } from "next";
import React, { FormEvent, useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import axios from "axios";

const apiUrl = "/api/uncss";

const Homepage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [clipboardMessage, setClipboardMessage] = useState<string | null>(null);
  const [outputCss, setOutputCss] = useState<string>("");

  const clipboardButton = React.useRef<HTMLButtonElement>();
  const inputHtml = React.useRef<HTMLTextAreaElement>();
  const inputCss = React.useRef<HTMLTextAreaElement>();

  useEffect(() => {
    const clipboard = new ClipboardJS(clipboardButton.current);

    clipboard.on("success", () => {
      setClipboardMessage("已复制到剪贴板");
    });
    clipboard.on("error", () => {
      setClipboardMessage("按Command+C复制");
    });
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      inputHtml: inputHtml.current.value,
      inputCss: inputCss.current.value,
    };

    try {
      if (!data.inputHtml) throw new Error("无法处理空HTML");
      if (!data.inputCss) throw new Error("无法处理空CSS");

      const response = await axios.post<{ outputCss: string }>(apiUrl, data);

      setOutputCss(response.data.outputCss);
      setError(null);
    } catch (error) {
      if (error?.response?.data?.error) {
        setError(Error(error.response.data.error));
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <header className="header">
        <h1>UnCSS Online!</h1>
        <p>
          <strong>在线清除多余的CSS样式！</strong>
        </p>
      </header>
      <main className="container">
        <h3>用法:</h3>
        <ul>
          <li>将HTML和CSS复制并粘贴到下面的框中</li>
          <li>点击清除多余代码按钮</li>
          <li>下面是见证奇迹的时刻</li>
          <li>未使用的CSS已经消失了！</li>
        </ul>

        {error && (
          <div className="error">
            <h5 className="error-name">{error.name}</h5>
            <div className="error-message">{error.message}</div>
          </div>
        )}

        <form id="uncss-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <label htmlFor="inputHtml">你的HTML代码</label>
              <textarea placeholder="在此处插入HTML代码" rows={20} name="inputHtml" id="inputHtml" ref={inputHtml} />
            </div>
            <div className="column">
              <label htmlFor="inputCss">你的CSS代码</label>
              <textarea placeholder="在此处插入CSS代码" rows={20} name="inputCss" id="inputCss" ref={inputCss} />
            </div>
          </div>
          <div className="text-center">
            <button
              id="submitButton"
              className={`button button-large ${loading ? "button-loading" : ""}`}
              type="submit"
              disabled={loading}
            >
              清除多余代码
            </button>
          </div>
        </form>
        <div className="row">
          <div className="column column-80 column-offset-10">
            <label htmlFor="outputCss">缩短后的CSS</label>
            <textarea
              placeholder="缩短后的CSS"
              rows={20}
              name="outputCss"
              id="outputCss"
              readOnly
              value={outputCss}
            />
          </div>
        </div>
        <div className="row">
          <div className="column text-center">
            <button
              className="button js-clipboard"
              data-clipboard-action="copy"
              data-clipboard-target="#outputCss"
              ref={clipboardButton}
            >
              复制到剪贴板
            </button>
            {clipboardMessage && <p id="js-clipboard-message">{clipboardMessage}</p>}
          </div>
        </div>

        <h3>高级使用</h3>
        <p>
          对于高级选项，请考虑将 UNCSS 添加到您的开发堆栈中 -{" "}
          <a href="https://github.com/ben-eb/gulp-uncss">Gulp</a>,{" "}
          <a href="https://github.com/addyosmani/grunt-uncss">Grunt</a>,{" "}
          <a href="https://github.com/RyanZim/postcss-uncss">PostCSS</a>.
        </p>

        <h3>这个工具有什么用？</h3>
        <p>
          CV必备！！
        </p>
      </main>
      <footer className="footer clearfix">
        <div className="container">
          <span className="float-left">
            <a href="https://github.com/pajasevi/UnCSS-Online" rel="noreferrer noopener" target="_blank">
              Github
            </a>{" "}
            |{" "}
            <a href="https://github.com/uncss/uncss" rel="noreferrer noopener" target="_blank">
              UnCSS
            </a>{" "}
            |{" "}
            <a href="https://yeelz.com" target="_blank">
              野路子博客
            </a>
            |{" "}
            <a href="https://tool.yeelz.com" target="_blank">
              野路子工具箱
            </a>
          </span>
        </div>
      </footer>
      <div class="tool-logo tool-r20"><a href="https://tool.yeelz.com/" target="_blank"><img src="https://tool.yeelz.com/zb_users/theme/yeelz/function/tool/codetoimg/img/logo.svg" alt="野路子工具箱" width="181" height="54" ></a></div>
    </React.Fragment>
  );
};

export default Homepage;
