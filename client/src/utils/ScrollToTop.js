import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // const body = document.querySelector('#root');
    // body.scrollIntoView({
    //     behavior: 'smooth'
    // }, 500)
    try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      } catch (error) {
        // for older browser
        window.scrollTo(0, 0)
      }

}, [pathname]);

  return null;
}