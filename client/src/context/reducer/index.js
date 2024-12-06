
export { default as alertReducer } from "./alertReducer";
export { default as modalReducer } from "./modalReducer";
export { default as userReducer } from "./userReducer";
export { default as playgroundReducer } from "./playgroundReducer";
export { default as bulletinReducer } from "./bulletinReducer";
export { default as remixReducer } from "./remixReducer";


const dispatch = {
    isReady: false,
    fn: () => {
      console.error('store is NOT ready')
    },
  }
  
  export default dispatch