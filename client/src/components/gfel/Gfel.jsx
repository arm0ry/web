import React, { useEffect, useState } from 'react';
import { get, useForm } from "react-hook-form";
import { ethers } from "ethers";
import { Spinner} from "@components";
import { DynamicWidget } from "@dynamic-labs/sdk-react";
import useWriteContract from "@hooks/useWriteContract";
import { useAccount, useContractRead } from "wagmi";
import { pushAlert } from "@context/actions/alertAction";
import { shortenAddress } from "@utils/shortenAddress";
import { Avatar } from "@components";


import BULLETIN_ABI from "../../contract/playground/Bulletin.json";
import LOGGER_ABI from "../../contract/playground/Log.json";
import TOKEN_MINTER_ABI from "../../contract/playground/TokenMinter.json";
import TOKEN_CURVE_ABI from "../../contract/playground/TokenCurve.json";
import ResponseCard from '../playground/responses/ResponseCard';

export const Bulletin = {
  address: "0x84c56F92DB38A08304965C888C530c805A1BC523",
  abi: BULLETIN_ABI,
};

export const Logger = {
  address: "0x6F23F3CB957Bee8c3CDCe348902d34b629f65946",
  abi: LOGGER_ABI,
};

export const TokenMinter = {
  address: "0x98C826A8e48A936278Dc3f2D31c4E4d3E18341Cc",
  abi: TOKEN_MINTER_ABI,
};

export const TokenCurve = {
  address: "0x925a2f9791c6A40E76105F14544500F6FDbCef83",
  abi: TOKEN_CURVE_ABI,
};

const Gfel = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const [inPrepare, setInPrepare] = useState(false);
  const { address, isConnected } = useAccount();
  const [touchpoints, setTouchpoint] = useState([]);

  const {
    register,
    handleSubmit
  } = useForm({
    defaultValues: { question1: "", question2: "", feedback: ""},
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

    console.log(data, structuredData)

    structuredData = abiCoder.encode(["uint256", "uint256"], [data.question1, data.question2]);



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
      if (parseInt(nonce._hex) > 0 && parseInt(logId._hex) > 0) {
        console.log("hello", )

        
        const logger = new ethers.Contract(Logger.address, Logger.abi, provider);
        let _tps = [];
        
        for (let i = 1; i <= logId; i++) {
          try {
            const log = await logger.getLog(i);
            const tps = await logger.getTouchpointsByLog(i);
            console.log(tps)
  
            for (let j = 0; j <= tps.length; j++) {
              console.log(tps[j][3])
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

        console.log(_tps);
        setTouchpoint(_tps);

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
                Donate 3 xDAI
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
                className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                alt="Supporter Token"
                  ></img>
              </div>

              {/* Feedback */}
              <div className='flex flex-col w-1/2 space-y-2 bg-slate-100 items-center'>
                <form onSubmit={handleSubmit(onSubmit)}>

                {/* Inputs */}
                <div className='flex flex-col h-4/5 w-full space-y-4 mb-6 items-start my-10'>
                  <div className="flex flex-col space-y-2">
                    <label className=" block text-md font-medium text-gray-900 ">
                      Did you have coffee with food?
                    </label>
                    
                    <input required type="number" max={1} min={0}
                      {...register("question1")}
                      className="rounded-md text-center p-1 w-full" placeholder="1" />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className=" block text-md font-medium text-gray-900 ">
                      How are you feeling?
                    </label>
                    
                    <input required type="number" max={10} min={1}
                      {...register("question2")}
                      className="rounded-md text-center p-1 w-full" placeholder="1" />
                  </div>

                  <div className="flex flex-col space-y-2 w-full">
                    <label className=" block text-md font-medium text-gray-900 ">
                      Feedback
                    </label>
                    
                    <textarea
                      id="feedback"
                      className="w-full h-100vh rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Fried chicken was so good~"
                      {...register("feedback")}
                    ></textarea>
                    
                    </div>
                
                </div>  

                {/* Buttons */}
                <div className='flex w-full h-1/5 space-x-5 items-center justify-center'>
                   {/* <button className='w-2/5 h-2/3 bg-sky-300 rounded-md'>
                    Submit
                  </button> */}
                     <button
                type="submit"
                disabled={logState.writeStatus > 0}
                className="text-gray px-auto flex w-4/5 h-2/3 bg-yellow-300 rounded-md flex-row items-center justify-center py-2 text-center text-base font-medium transition duration-300 ease-in-out  hover:ring-4 hover:ring-yellow-200 active:ring-2 disabled:pointer-events-none disabled:opacity-25"
              >
                {(logState.writeStatus === 0) && (inPrepare ? "Wait..." : "Share")}
                {(logState.writeStatus > 0) && <Spinner />}
                <div className={`${(logState.writeStatus > 0) ? "ml-2" : ""}`}>

                  {(logState.writeStatus === 1) && "Waiting for approval"}
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
                {/* <div className="bg-slate-100 text-slate-400 h-32 rounded-lg flex items-center justify-center">
                      Patiently waiting... | 等待中... 
                </div> */}
                
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