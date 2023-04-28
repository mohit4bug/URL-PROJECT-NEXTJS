"use client"
import { INITIAL_STATE, linkReducer } from "@/reducers/linkReducer";
import axios from "axios";
import { useReducer, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";



export default function Home() {

  const shortLinkRef = useRef()
  const [source, setSource] = useState('')
  const [keyword, setKeyword] = useState('')

  const [state, dispatch] = useReducer(linkReducer, INITIAL_STATE)
  const generateShortLink = async () => {
    dispatch({ type: "FETCH_START" })
    try {
      const res = await axios.post('/api/generate', {
        source,
        keyword
      })
      dispatch({
        type: "FETCH_SUCCESS", payload: {
          message: res.data.message,
          shortLink: res.data.link
        }
      })
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.response.data.error })
    }
  }


  const copyToClipboard = () => {
    const text = shortLinkRef.current.value
    navigator.clipboard.writeText(text)
    dispatch({ type: "COPY", payload: 'Link copied!' })
  }



  return (
    <div className={'h-screen w-full flex items-center justify-center'}>
      <form className={'flex flex-col gap-2'} onSubmit={e => e.preventDefault()}>
        {/* SINGLE INPUT */}
        <div className={'flex gap-2 border-2 border-teal-600 p-2 rounded-xl'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6 text-neutral-500 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          <input
            onChange={e => setSource(e.target.value)}
            name="source"
            type="url"
            value={source}
            autoComplete="off"
            placeholder={'Link to the source'}
            className={'outline-none border-none bg-transparent caret-teal-600 '} />
          <svg onClick={() => setSource('')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6 text-neutral-500 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        {/* SINGLE INPUT */}
        <div className={'flex gap-2 border-2 border-teal-600 p-2 rounded-xl'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          <input
            value={keyword}
            name="keyword"
            autoComplete="off"
            onChange={e => setKeyword(e.target.value)}
            placeholder={'Enter some keyword'}
            className={'outline-none border-none bg-transparent caret-teal-600 '} />
          <svg onClick={() => setKeyword('')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6 text-neutral-500 cursor-pointer"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        {/* SINGLE INPUT SHORT LINK*/}
        {
          state.shortLink &&
          <div className={'flex gap-2 border-2 border-teal-600 p-2 rounded-xl'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-6 h-6 text-neutral-500 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
            <input
              readOnly
              ref={shortLinkRef}
              defaultValue={state.shortLink}
              className={'outline-none border-none bg-transparent caret-teal-600 '}
            />
            <svg onClick={copyToClipboard} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-6 h-6 text-neutral-500 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </div>
        }
        <button onClick={generateShortLink} className={'bg-teal-600 p-2 rounded-xl text-white disabled:bg-teal-800'}>
          {state.loading ? <BeatLoader color="#36d7b7" size={10} /> : 'Generate'}
        </button>
        {state.error && <p className="text-center text-red-500">{state.error}</p>}
        {state.message && <p className="text-center text-green-500">{state.message}</p>}
      </form>
    </div>
  )
}