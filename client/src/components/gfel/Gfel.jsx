import React, { useEffect, useState } from 'react';
import { get, useForm } from "react-hook-form";
import { ethers } from "ethers";
import { Spinner} from "@components";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import useWriteContract from "@hooks/useWriteContract";
import { useAccount, useContractRead } from "wagmi";
import { pushAlert } from "@context/actions/alertAction";

import BULLETIN_ABI from "../../contract/playground/Bulletin.json";
import LOGGER_ABI from "../../contract/playground/Log.json";
import TOKEN_MINTER_ABI from "../../contract/playground/TokenMinter.json";
import TOKEN_CURVE_ABI from "../../contract/playground/TokenCurve.json";
import ResponseCard from '../playground/responses/ResponseCard';

export const Bulletin = {
  address: "0x389A8899d3Fe6E755bFFAB7d0467b700602023f9",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x9012072B1fc4a67a60DC53365592bf0B7ad722F4",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x5A629972C39fbb6d96c5Ff6074b7C9AAcA5b39D2",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x118BF134Ac905bd4fE25081eee681aCFde41f0b0",
  abi: TOKEN_CURVE_ABI,
};

const MoodRadio = ({ moon, value, register }) => {
    return (
      <>
        <div className="flex items-center m-2">
          <input
            type="radio"
            value={value}
            {...register("moon")}
          />

          <label
            className="ml-2 text-sm font-normal text-gray-900 "
          >
            {moon}
          </label>
        </div>
      </>
    );
  };

const Gfel = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const [inPrepare, setInPrepare] = useState(false);
  const [error, setError] = useState('');
  const { address, isConnected } = useAccount();
  const [touchpoints, setTouchpoint] = useState([]);

  const {
    register,
    handleSubmit
  } = useForm({
    defaultValues: { moon: "2", question: ""},
  }); 

  const { write: log, state: logState } = useWriteContract({
    ...Logger,
    functionName: "log",
  });

  const { data:  nonce} = useContractRead({
    ...Logger,
    functionName: 'getNonceByItemId',
    args: [Bulletin.address, 1, 0]
  })

  const { data:  logId} = useContractRead({
    ...Logger,
    functionName: 'logId'
  })

  const { data:  svg} = useContractRead({
    ...TokenMinter,
    functionName: 'svg',
    args: [1]
  })

  const { data:  price} = useContractRead({
    ...TokenCurve,
    functionName: 'getCurvePrice',
    args: [true, 1, 0]
  })

  const clickMint = async () => {
    const curveId = 1;

    const signer = await provider.getSigner();
    const tokenCurve = new ethers.Contract(TokenCurve.address, TokenCurve.abi, signer)
    const basePrice = await tokenCurve.getCurvePrice(true, curveId, 0);

    try {
      const tx = await tokenCurve.support(curveId, address, 0, { value: basePrice });

      pushAlert({
        msg: (
          <span>
            Success! Check your mint transaction on
            <a
              href={`https://gnosis-chiado.blockscout.com/tx/${tx.hash}`}
              target="_blank"
              rel="noreferrer"
              className="font-extrabold text-green-900"
            >
              &nbsp;Blockscout &#128279;
            </a>
          </span>
        ),
        type: "success",
      });

    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data) => {
    const ROLE = 1 << 5;
    const listId = 1;
    const itemId = 0;
    let structuredData = ethers.constants.HashZero;
    const abiCoder = ethers.utils.defaultAbiCoder;


    if (data.moon == "2") {
      setError("Must fill all fields.")
      return;
    } else {
      setError("")
    }

    try {
      structuredData = abiCoder.encode(["uint256", "uint256"], [data.moon, data.question]);
    } catch (err) {
      console.log(err)
    }



    if (isConnected) {
      setInPrepare(true);

      try {
        log({
          args: [ROLE, Bulletin.address, listId, itemId, data.feedback, structuredData],
        })
        setInPrepare(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const loadTps = async () => {
      if (nonce != undefined && logId != undefined) {
        if (parseInt(nonce._hex) > 0 && parseInt(logId._hex) > 0) {
          const logger = new ethers.Contract(Logger.address, Logger.abi, provider);
          let _tps = [];
          
          for (let i = 1; i <= logId; i++) {
            try {
              const log = await logger.getLog(i);
              const tps = await logger.getTouchpointsByLog(i);
              // console.log(tps)
    
              for (let j = 0; j <= tps.length; j++) {
                if (tps[j][3] != undefined) {
                  _tps.push({
                    user: log.user,
                    feedback: tps[j][3],
                  });
                }
              }
  
            } catch (err) {
              console.log(err)
            }
            
          }
          setTouchpoint(_tps);
        }
      }
    }
    loadTps();
  }, [nonce, logId]);

  useEffect(() => {
  }, [touchpoints]);

  return (  
    <>
      <div className="flex flex-col space-y-2 justify-center items-center h-screen">
        <div className="flex w-2/3 justify-end ">  
          {isConnected ?
            (<div className='mx-4'>
              <button
                disabled={!clickMint}
                onClick={() => clickMint()}
                className='w-40 h-10 bg-yellow-300 rounded-md font-medium'>
                Donate {(price != undefined) ? ethers.utils.formatEther(price) : price} xDAI
              </button> 
            </div>) : 
            <></>
          }
          <DynamicWidget
            buttonClassName="connectButton"
            innerButtonComponent="Connect Wallet"
          />
        </div>
        <div className='w-2/3 h-2/3 rounded-sm'>
          <div className='flex flex-col w-full h-full bg-amber-100 space-y-4'>
            <div className='flex w-full h-2/3 bg-amber-100 space-x-4'>
              
              {/* NFT */}
              <div className='flex w-1/2 h-full justify-center items-center bg-slate-300'>
                <img
                className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg w-4/5 2xl:w-3/5"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                alt="Supporter Token"
                  ></img>
              </div>

              {/* Feedback */}
              <div className='flex flex-col w-1/2 space-y-2 bg-slate-100 items-center overflow-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                {/* Inputs */}
                  <div className='flex flex-col w-full space-y-3 mb-4 items-start my-10'>
                    <div className="flex flex-col space-y-1">
                      <label className=" block text-sm font-medium text-gray-900 lg:text-md md:text-sm sm:text-left">
                        Did you have coffee with food?
                      </label>
                    
                      <MoodRadio moon="Yes" value={1} register={register} />
                      <MoodRadio moon="No" value={0} register={register} />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <label className=" block text-sm font-medium text-gray-900 ">
                        How are you feeling? (1-10)
                      </label>
                      
                      <input required type="number" max={10} min={1}
                        {...register("question")}
                        className="rounded-md text-center p-1 w-full" placeholder="8" />
                    </div>

                    <div className="flex flex-col space-y-2 w-full">
                      <label className=" block text-sm font-medium text-gray-900 ">
                        Feedback
                      </label>
                      
                      <textarea
                        id="feedback"
                        className="w-full h-100vh rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Have a great day~"
                        {...register("feedback")}
                      ></textarea>
                    </div>
                
                </div>  

                  {/* Buttons */}
                  <div className='flex w-full text-sm text-yellow-800 items-center justify-center pb-2'>{(error != "") ? error : "" }</div>
                  <div className='flex w-full items-center justify-center pb-2'>
                     <button
                        type="submit"
                        disabled={logState.writeStatus > 0}
                        className="text-gray px-auto flex w-4/5 h-2/3 bg-yellow-300 rounded-md flex-row items-center justify-center py-2 text-center text-sm transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
                    >     
                      {(logState.writeStatus === 0) && (inPrepare ? "Wait..." : "Share")}
                      {(logState.writeStatus > 0) && <Spinner />}
                      <div className={`${(logState.writeStatus > 0) ? "ml-2" : ""}`}>
                        {(logState.writeStatus === 1) && "pending"}
                        {(logState.writeStatus === 2) && "pending"}
                      </div>
                    </button>
                  </div>
                    
                </form>   
              </div>
            </div>

            {/* Comments */}
            <div className='grid w-full h-1/3 bg-blue-100 overflow-auto'>
                <div className='flex w-full h-full font-medium ml-4 mt-2'>Feedback</div>
              
              <div className="m-4 grid grid-cols-2 gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {(touchpoints.length > 0) ? (touchpoints.reverse().map((response, id) => {
                  return <ResponseCard key={id} response={response} />
                }))
                  : (
                    <div className="bg-slate-100 text-slate-400 h-32 rounded-lg flex items-center justify-center">
                      Patiently waiting... | 等待中... 
                    </div>
                  )}
                
              </div>
              
      
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Gfel