import { useState } from 'react'
import InputBox from './Components/InputBox'
import useCurrencyInfo from './hooks/usecurrencyinfo'


function App() {
  const [amount,setAmount]=useState()
  const [from,setFrom]=useState("usd")
  const [to,setTo]=useState("inr")
  const[convertedAmount,setConvertedAmount]=useState(0)

  const CurrencyInfo =useCurrencyInfo(from)

  const options=Object.keys(CurrencyInfo)

  const Swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  const convert=()=>{setConvertedAmount(amount*CurrencyInfo[to])}

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://blog.magmalabs.io/wp-content/uploads/2020/02/exchange.jpeg')`,
        }}
    >
        <div className="w-full"> 
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 ">
            <h1 className='text-center text-white border-2 border-white rounded-md bg-blue-600 mb-4'>Currency Convertor</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-3">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            selectCurrency={from}
                            onCurrencyChange={(currency)=>setAmount(amount)}
                            onAmountChange={(amount)=>setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5 ">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={Swap}
                        >
                            Swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-8">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=>setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                    <button className='absolute left-1/2 -translate-x-1/2 -translate-y-8 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 '
                    onClick={()=>setAmount(amount==0)}>
                Clear
               </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
 