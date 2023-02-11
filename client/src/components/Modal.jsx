import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Modal = ({ children }) => {
  //   const [type, setType] = useState(1);
  //   const [isApproved, setIsApproved] = useState(false);
  //   const [modalIsOpen, setIsOpen] = useState(false);
  //   useEffect(() => {
  //     if(type !== -1){
  //       setIsOpen(true)
  //     }else{
  //       setIsOpen(false)
  //     }

  //   }, [type])
  //   modalPayload, {title, detail, callback}

  //   const generateModal = useCallback(
  //     (payload, callback = () => {}) => {
  //       switch (type) {
  //         case 0:
  //           return (
  //             <>
  //               <div className="flex items-start justify-between rounded-t border-b p-4 ">
  //                 <h3 class="text-xl font-semibold text-gray-900 ">
  //                   Terms of Service
  //                 </h3>
  //                 <button
  //                   type="button"
  //                   class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
  //                   data-modal-hide="defaultModal"
  //                 >
  //                   <svg
  //                     aria-hidden="true"
  //                     class="h-5 w-5"
  //                     fill="currentColor"
  //                     viewBox="0 0 20 20"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path
  //                       fill-rule="evenodd"
  //                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
  //                       clip-rule="evenodd"
  //                     ></path>
  //                   </svg>
  //                   <span class="sr-only">Close modal</span>
  //                 </button>
  //               </div>

  //               <div class="space-y-6 p-6">
  //                 <p class="text-base leading-relaxed text-gray-500 ">
  //                   With less than a month to go before the European Union enacts
  //                   new consumer privacy laws for its citizens, companies around
  //                   the world are updating their terms of service agreements to
  //                   comply.
  //                 </p>
  //                 <p class="text-base leading-relaxed text-gray-500 ">
  //                   The European Union’s General Data Protection Regulation
  //                   (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
  //                   common set of data rights in the European Union. It requires
  //                   organizations to notify users as soon as possible of high-risk
  //                   data breaches that could personally affect them.
  //                 </p>
  //               </div>
  //             </>
  //           );

  //         case 1:
  //           // document Markdown

  //           return (
  //             <>
  //               <div class="h-16  flex items-center justify-between rounded-t border-b p-4 ">
  //                 <h3 class="text-xl font-semibold text-gray-900 ">
  //                   Terms of Service
  //                 </h3>
  //                 <button
  //                   type="button"
  //                   class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
  //                   data-modal-hide="defaultModal"
  //                 >
  //                   <svg
  //                     aria-hidden="true"
  //                     class="h-5 w-5"
  //                     fill="currentColor"
  //                     viewBox="0 0 20 20"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path
  //                       fill-rule="evenodd"
  //                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
  //                       clip-rule="evenodd"
  //                     ></path>
  //                   </svg>
  //                   <span class="sr-only">Close modal</span>
  //                 </button>
  //               </div>

  //               <div class="space-y-6 p-6 h-[calc(100vh_-_6rem)] overflow-y-scroll">
  //                 <ReactMarkdown
  //                   className="markdown"
  //                   remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
  //                 >
  //                   {`## Bunni Bebe
  // ![](https://i.imgur.com/eKCnz5W.jpg)
  // # h1 Heading
  // ## h2 Heading
  // ### h3 Heading
  // #### h4 Heading
  // ##### h5 Heading
  // ###### h6 Heading
  // ![Alt text][someref]

  // With a reference later in the document defining the URL location:

  // [someref]: https://public.sanity.io/modell_@2x.png  "Headless CMS"

  // `}
  // </ReactMarkdown>
  //               </div>
  //             </>
  //           );

  //         case 2:
  //           // Alert

  //           return (
  //             <>
  //               <button
  //                 type="button"
  //                 class="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
  //                 data-modal-hide="popup-modal"
  //               >
  //                 <svg
  //                   aria-hidden="true"
  //                   class="h-5 w-5"
  //                   fill="currentColor"
  //                   viewBox="0 0 20 20"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     fill-rule="evenodd"
  //                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
  //                     clip-rule="evenodd"
  //                   ></path>
  //                 </svg>
  //                 <span class="sr-only">Close modal</span>
  //               </button>
  //               <div class="p-6 text-center">
  //                 <svg
  //                   aria-hidden="true"
  //                   class="mx-auto mb-4 h-14 w-14 text-gray-400 "
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                 >
  //                   <path
  //                     stroke-linecap="round"
  //                     stroke-linejoin="round"
  //                     stroke-width="2"
  //                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //                   ></path>
  //                 </svg>
  //                 <h3 class="mb-5 text-lg font-normal text-gray-500 ">
  //                   Are you sure you want to delete this product?
  //                 </h3>
  //                 <button
  //                   data-modal-hide="popup-modal"
  //                   type="button"
  //                   onClick={() => {
  //                     callback(true);
  //                   }}
  //                   class="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  "
  //                 >
  //                   Yes, I'm sure
  //                 </button>
  //                 <button
  //                   data-modal-hide="popup-modal"
  //                   type="button"
  //                   onClick={() => {
  //                     callback(false);
  //                   }}
  //                   class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 "
  //                 >
  //                   No, cancel
  //                 </button>
  //               </div>
  //             </>
  //           );

  //         case 3:
  //           return (
  //             <>
  //               {/* <p className={styles.modalText}>
  //               Oops, you don't have AVAX tokens in your account
  //             </p>
  //             <CustomButton
  //               title="Grab some test tokens"
  //               handleClick={() => window.open('https://faucet.avax.network/', '_blank')}
  //             /> */}
  //             </>
  //           );

  //         default:
  //           return <p></p>;
  //       }
  //     },
  //     [type]
  //   );

  return (
    <>
      {/* <div className="fixed  inset-0 z-[998]  overflow-y-auto overflow-x-hidden bg-white bg-opacity-10  backdrop-blur backdrop-filter md:inset-0 md:h-full" />

      <div className="fixed  inset-0 z-[999] flex h-full items-center justify-center overflow-y-auto">
        <div className="relative h-auto w-full max-w-5xl md:h-auto ">
          <div className="relative rounded-lg  bg-white shadow">
            {generateModal("1")}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Modal;
