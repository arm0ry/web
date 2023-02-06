
export { default as alertReducer } from "./alertReducer";


const dispatch = {
    isReady: false,
    fn: () => {
      console.error('store is NOT ready')
    },
  }
  
  export default dispatch