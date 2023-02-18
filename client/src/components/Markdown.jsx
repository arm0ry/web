import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
const Markdown = ({children}) => {
  return (
    <>
      <ReactMarkdown
        className="markdown"
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {children}
      </ReactMarkdown>
    </>
  );
};

export default Markdown;
