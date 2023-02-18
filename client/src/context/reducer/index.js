
export { default as alertReducer } from "./alertReducer";
export { default as modalReducer } from "./modalReducer";


const dispatch = {
    isReady: false,
    fn: () => {
      console.error('store is NOT ready')
    },
  }
  
  export default dispatch