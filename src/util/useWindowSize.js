import { useState, useEffect } from 'react'

// From: https://usehooks.com/useWindowSize/ Note: for some reason, putting
// getSize in useState like this: useState(getSize) makes it render weirdly?
// Instead, I just put getSize() on mount / unmount which is just hacky. Is this
// a problem with Next?

function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      // default is 400px width
      width: isClient ? window.innerWidth : '400',
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState({ width: '400' })

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    handleResize() // run it once

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export default useWindowSize
