import { useEffect, useRef, useState } from 'react'

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const useLocalStorage = (storageItem, valueOrCallback) => {
  const [stateValue, dispatch] = useState(typeof valueOrCallback === 'function' ? valueOrCallback() : valueOrCallback);

  useEffect(() => {
    localStorage[storageItem] = stateValue;
  }, [stateValue]);

  return [stateValue, dispatch];
};
