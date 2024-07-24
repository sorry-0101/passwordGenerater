import { useEffect, useState,useRef } from 'react'

function App() {

  const [passwordLength, setPasswordLength]= useState(6);
  const [password, setPassword]=useState('')
  const [numberAllowed, setNumberAllowed]= useState(false);
  const [specialCharAllowed, setSpecialCharAllowed]= useState(false);

  const passwordRef= useRef(null);

  const passwordGenerator=()=>{
      let pass='';
      let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnlpqrstuvwxyz';

      if(numberAllowed) str+='0123456789';
      if(specialCharAllowed) str+='!@#$%^&*()~{}=-+[]/.,<>';

      for (let i = 1; i <= passwordLength; i++) {
        let char = Math.floor(Math.random()*str.length+1);
         pass+=str.charAt(char);
      }
      setPassword(pass);
  };

  const copyPassword=()=>{
    passwordRef.current?.select();
    passwordRef?.current.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>passwordGenerator(),[passwordLength,numberAllowed,specialCharAllowed,setPassword]);

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-center text-white '>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input 
          type="text"
          name="password"
          id="password" 
          className='outline-none w-full py-1 px-3'
          value={password}
          readOnly
          placeholder='password'
          ref={passwordRef}
        />
        <button type="button" className='outline-none bg-blue-600 text-white px-2' onClick={()=>copyPassword()}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
            value={passwordLength}
            min={6}
            max={100}
            className='cursor-pointer'
            onChange={(e)=>{
              setPasswordLength(e.target.value);
            }}
             />
             <label htmlFor="">Length: {passwordLength}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
                name='numberAllowed'
                defaultChecked={numberAllowed}
                id='numberAllowed'
                onChange={()=>{
                  setNumberAllowed((previous)=>!previous)
                }}
              />
              <label htmlFor="numberAllowed">Number</label>
             </div>
          <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
                defaultChecked={specialCharAllowed}
                name='specialCharAllowed'
                id='specialCharAllowed'
                onChange={()=>{
                  setSpecialCharAllowed((previous)=>!previous)
                }}
              />
              <label htmlFor="specialCharAllowed">special character</label>
             </div>
          </div>


      
     </div>

    </>
  )
}

export default App
