import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

import { TickIcon } from "@assets";
import { cleanModal } from "@context/actions/modalAction";
import CloseModalButton from "../CloseModalButton";
import { Spinner } from "@components";

import { useGlobalContext } from "@context/store";
import { getQuestId } from "@context/actions/userAction";
// import { Arm0ryQuests, Arm0ryTravelers } from "@contract";
import useWriteContract from "@hooks/useWriteContract";
const progressBarW = {
  "0": 'w-0',
  "1/6": 'w-1/6',
  "1/3": 'w-1/3',
  "1/2": 'w-1/2',
  "2/3": 'w-2/3',
  "5/6": 'w-5/6',
  "3/3": 'w-3/3',
}
const progressBarH = {
  "0": 'h-0',
  "1/6": 'h-1/6',
  "1/3": 'h-1/3',
  "1/2": 'h-1/2',
  "2/3": 'h-2/3',
  "5/6": 'h-5/6',
  "3/3": 'h-3/3',
}
const tickColor1 = {
  "0": 'fill-[#F7F7F7] stroke-[#949494]',
  "1/6": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "1/3": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "1/2": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "2/3": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "5/6": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "3/3": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
}
const tickColor2 = {
  "0": 'fill-[#F7F7F7] stroke-[#949494]',
  "1/6": 'fill-[#F7F7F7] stroke-[#949494]',
  "1/3": 'fill-[#F7F7F7] stroke-[#949494]',
  "1/2": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "2/3": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "5/6": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "3/3": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
}
const tickColor3 = {
  "0": 'fill-[#F7F7F7] stroke-[#949494]',
  "1/6": 'fill-[#F7F7F7] stroke-[#949494]',
  "1/3": 'fill-[#F7F7F7] stroke-[#949494]',
  "1/2": 'fill-[#F7F7F7] stroke-[#949494]',
  "2/3": 'fill-[#F7F7F7] stroke-[#949494]',
  "5/6": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
  "3/3": 'fill-[#ffe9b3e8] stroke-[#FFC600]',
}
// const StartQuestModal = ({ modalPayload }) => {
//   const navigate = useNavigate();
//   const [progress, setProgress] = useState("0")
//   const { address, isConnected } = useAccount();
//   const { playground, userInfo } =
//     useGlobalContext();
//   const { write: _startQuest, state: startQuestState } = useWriteContract({
//     ...Arm0ryQuests,
//     functionName: "startQuest",
//   });
//   const { write: _approve, state: approveState } = useWriteContract({
//     ...Arm0ryTravelers,
//     functionName: "approve",
//   });
//   useEffect(() => {
//     if (userInfo.isApproved && !userInfo.inQuest) {
//       setProgress("2/3")
//     }
//     if (userInfo.inQuest) {
//       setProgress("3/3")
//     }

//   }, [userInfo.isApproved, userInfo.inQuest])

//   const onSuccess = async () => {
//     setProgress("3/3")
//     await getQuestId(address);
//   };
//   const startQuest = () => {
//     setProgress("5/6")
//     _startQuest({
//       args: [parseInt(modalPayload.content?.missionId, 10)],
//       onSuccess,
//     });
//   }
//   // const approveOnSuccess = async() => {
//   //   setProgress("1/2")
//   //   await checkApprove(userInfo.tokenId)
//   // };
//   const approve = () => {
//     setProgress("1/6")
//     _approve({
//       args: [
//         Arm0ryQuests.address,
//         BigNumber.from(address).toBigInt().toString(10),
//       ],
//       onSuccess: approveOnSuccess,
//     });
//   }

//   return (
//     <>
//       <div className="flex items-start justify-between rounded-t px-4 pt-4 pb-2 ">
//         <CloseModalButton />
//       </div>
//       <div className="relative flex px-5 pb-8 pt-4 sm:flex-col ">
//         <div className="box- absolute left-4 my-2 h-[31.5rem] w-2 rounded-full bg-gray-200 sm:left-10   sm:h-2 sm:w-[calc(100%_-_4rem)]">
//           <div
//             className={`   ${progressBarH[progress]} w-2 rounded-full bg-gradient-to-b from-[#fff877] to-[#fde047]  sm:hidden`}
//           // style="height: 15%"
//           ></div>
//           <div
//             className={` hidden h-2 ${progressBarW[progress]} rounded-full  bg-gradient-to-r from-[#fff877] to-[#fde047] sm:block sm:px-4`}
//           // style="width: 15%"
//           ></div>
//         </div>
//         <ol className="flex h-[31.5rem] flex-col border-l border-gray-200 sm:ml-0 sm:flex sm:h-auto sm:flex-row sm:border-l-0">
//           <li className="relative mb-6 ml-6 h-36 flex-1 sm:ml-0 sm:mb-0 sm:h-auto ">
//             <div className="flex items-center">
//               <div className="absolute -left-9 top-1.5 z-10 flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-blue-100 ring-8 ring-white sm:static sm:inset-0">

//                 <TickIcon className={`h-6 w-6 flex-none ${tickColor1[progress]} stroke-2`} />
//               </div>

//               {/* <div className="hidden h-0.5 w-full bg-gray-200  sm:flex"></div> */}
//             </div>
//             <div className="sm:pr-4">
//               <span className="text-sm font-normal text-gray-400 ">Step 1</span>
//               <h3 className="mb-2 text-lg font-semibold text-gray-900 ">
//                 Approve
//               </h3>

//               <p className="text-base font-normal text-gray-500 ">
//                 You need to approve contract send your Traveler Pass to Arm0ry
//                 Contract.
//               </p>
//             </div>
//           </li>
//           <li className="relative mb-6 ml-6 h-36 flex-1 sm:ml-0 sm:mb-0 sm:h-auto ">
//             <div className="flex items-center">
//               <div className="absolute -left-9 top-1.5 z-10 flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-blue-100 ring-8 ring-white sm:static sm:inset-0">
//                 <TickIcon className={`h-6 w-6 flex-none ${tickColor2[progress]} stroke-2`} />
//               </div>

//               {/* <div className="hidden h-0.5 w-full bg-gray-200  sm:flex"></div> */}
//             </div>
//             <div className="sm:pr-4">
//               <span className="text-sm font-normal text-gray-400 ">Step 2</span>
//               <h3 className="mb-2 text-lg font-semibold text-gray-900 ">
//                 Wait for Transaction
//               </h3>

//               <p className="text-base font-normal text-gray-500 ">
//                 The waiting period is required to ensure you have approved
//                 Arm0ry contract to transfer your Traveler Pass.
//               </p>
//             </div>
//           </li>
//           <li className="relative mb-6 ml-6 h-36 flex-1 sm:ml-0 sm:mb-0 sm:h-auto">
//             <div className="flex items-center">
//               <div className="absolute -left-9 top-1.5 z-10 flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-blue-100 ring-8 ring-white sm:static sm:inset-0">
//                 <TickIcon className={`h-6 w-6 flex-none ${tickColor3[progress]} stroke-2`} />
//               </div>

//               {/* <div className="hidden h-0.5 w-full bg-gray-200  sm:flex"></div> */}
//             </div>
//             <div className="sm:pr-4">
//               <span className="text-sm font-normal text-gray-400 ">Step 3</span>
//               <h3 className="mb-2 text-lg font-semibold text-gray-900 ">
//                 Start Quest
//               </h3>

//               <p className="text-base font-normal text-gray-500 ">
//                 You will send your Traveler Pass to Arm0ry contract.
//                 <br /> Don't panic.
//                 {/*  If you sure want to start Quest, please press the Start Button */}
//               </p>
//             </div>
//           </li>
//         </ol>
//       </div>
//       <div className="flex px-4  pb-3 sm:px-6">
//         {!userInfo.inQuest ? (
//           userInfo.isMinted ? (
//             !userInfo.isApproved ? (
//               <button
//                 type="button"
//                 disabled={approveState.writeStatus > 0}
//                 className=" flex flex-row ml-auto mr-2 mb-2 w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto disabled:opacity-60"
//                 onClick={approve}
//               >
//                 {approveState.writeStatus === 0 && "Approve!"}
//                 {approveState.writeStatus > 0 && <Spinner pathColor="border-white" />}
//                 <div className={`${approveState.writeStatus > 0 ? "ml-2" : ""}`}>
//                   {approveState.writeStatus === 1 && "Waiting for approval"}
//                   {approveState.writeStatus === 2 && "pending"}
//                 </div>
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 disabled={startQuestState.writeStatus > 0}
//                 className=" flex flex-row ml-auto mr-2 mb-2 w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto disabled:opacity-60"
//                 onClick={startQuest}
//               >
//                 {startQuestState.writeStatus === 0 && "Start Quest"}
//                 {startQuestState.writeStatus > 0 && <Spinner pathColor="border-white" />}
//                 <div className={`${startQuestState.writeStatus > 0 ? "ml-2" : ""}`}>
//                   {startQuestState.writeStatus === 1 && "Waiting for approval"}
//                   {startQuestState.writeStatus === 2 && "pending"}
//                 </div>
//               </button>
//             )
//           ) : (
//             <button
//               type="button"
//               onClick={() => { navigate("/playground/traveller-pass"); cleanModal(); }}
//               className=" ml-auto mr-2 mb-2 w-full rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
//             >
//               Mint your Traveler Pass First
//             </button>
//           )
//         ) : (
//           <></>
//         )}
//         { }
//       </div>
//     </>
//   );
// };

// export default StartQuestModal;
