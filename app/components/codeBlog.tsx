import React, { useState } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


type Props = {
  code? : string,
  language? : string,
  enV1?:string,
  enV2?:string,
}
function CodeBlog({code,language,enV1,enV2}:Props) {
  const [copied,setCopied] = useState(false);
  const fullText = [enV1,enV2,code].filter(Boolean).join('n')

 const  handleClick = async() => {
try{
  await navigator.clipboard.writeText(fullText);

  setCopied(true);
  setTimeout(()=>{setCopied(false)},2000)
}catch(e){
  console.log(e)
}
  }
  return (
    <div className='relative group my-4'>
       <button onClick={()=>handleClick()} className='btn btn-xs  absolute top-2 right-2 z-10' >
        {copied ? 'copié !':"copier"}
       </button>
       {(enV1 || enV2) && (
        <SyntaxHighlighter
        language='bash'
        style={materialDark}
        showLineNumbers={true}
        customStyle={{
          borderRadius: "0.5rem",
          paddingTop: '1.5rem',
          fontSize : '0.875rem'
        }}
        >
         { [enV1 , enV2].filter(Boolean).join('\n')}
        </SyntaxHighlighter>
       )}
    </div>
  )
}

export default CodeBlog