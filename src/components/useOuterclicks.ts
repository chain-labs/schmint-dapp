import { useEffect, useRef } from "react";

export default function useOuterClick(callback) {
  const callbackRef = useRef(); // initialize mutable ref, which stores callback
  const innerRef = useRef(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'current' does not exist on type 'RefObject<HTMLElement>'.
        !innerRef?.current?.contains(e.target)
      )
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'current' does not exist on type 'RefObject<HTMLElement>'.
        callbackRef?.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}
