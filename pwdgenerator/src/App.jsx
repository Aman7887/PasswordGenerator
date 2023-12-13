import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789"
    if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz"
    if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz"
    if (charAllowed) str += "~!@#$%^&*()?|}{:;"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed,lowerCaseAllowed, charAllowed, setPassword])

  const handleRefresh = async () => {
    setLength(8)
    passwordGenerator()
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed,lowerCaseAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-7 gap-x-2 pb-9 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-xl text-center my-10'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
          <svg className= 'bg-[skyblue] hover:cursor-pointer' onClick={handleRefresh} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="32" viewBox="0 0 30 30">
            <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
          </svg>
        </div>
        <dir className='option  flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" onChange={(e) => setLength(e.target.value)} min={8} max={100} value={length} className='cursor-pointer' />
            <label htmlFor="">Len : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={lowerCaseAllowed} id='lowerCaseInput' onChange={() => setLowerCaseAllowed((prev) => !prev)} />
            <label htmlFor="lowerCaseInput">LowerCase</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => setNumberAllowed((prev) => !prev)} />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='charInput' onChange={() => setCharAllowed((prev) => !prev)} />
            <label htmlFor="charInput">Character</label>
          </div>
        </dir>
      </div>
    </>
  )
}

export default App
