
export { default as alertReducer } from "./alertReducer";
export { default as modalReducer } from "./modalReducer";
export { default as userReducer } from "./userReducer";
export { default as playgroundReducer } from "./playgroundReducer";


const dispatch = {
    isReady: false,
    fn: () => {
      console.error('store is NOT ready')
    },
  }
  
  export default dispatch