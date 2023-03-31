import React, {useState, useEffect} from "react";
import { Markdown } from "..";
import CloseModalButton from "./CloseModalButton"
import { replaceMarkdownImageUrltoBase64} from "@utils/encodeImageAsBase64"
const DocModal = ({modalPayload}) => {
  const [text, setText] = useState("")

  useEffect(() => {
    const f = async()=>{
      const _text = await replaceMarkdownImageUrltoBase64(modalPayload?.content?.text)
      setText(_text)
    }
    f()
  }, [])
  
  
  return (
    <>
      <div className="flex  h-16 items-center justify-between rounded-t border-b p-4 ">
        <h3 className="text-xl font-semibold text-gray-900 ">
          {modalPayload?.title}
        </h3>
        <CloseModalButton />
      </div>

      <div className="h-[calc(100vh_-_6rem)] space-y-6 overflow-y-scroll p-6">
        <Markdown>{text}</Markdown>
      </div>
    </>
  );
};

export default DocModal;
