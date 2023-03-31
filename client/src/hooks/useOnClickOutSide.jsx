import {useEffect} from 'react'

const useOnClickOutSide = (ref, handler) => {

  
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            handler()
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
}

export default useOnClickOutSide