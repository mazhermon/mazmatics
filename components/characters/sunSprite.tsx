import React, { useRef, useState, useEffect } from 'react'

import styles from './sunSprite.module.css'

const imageData = {
  src: '../../images/sunSprite-min.png',
  width: 2700,
  height: 800,
  frameSize: {
    width: 900,
    height: 800,
  },
}

let lastSunFrame = 0
let srcX = 0
const srcY = 0
let setInternalSunAnimateID: any

function between(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

const SunSprite = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const [loadedSpriteImage, setLoadedSpriteImage] =
    useState<CanvasImageSource | null>(null)

  useEffect(() => {
    const loadImage = () => {
      if (window !== undefined) {
        const img = new window.Image()
        img.src = imageData.src
        imageRef.current = img
        img.onload = () => {
          setLoadedSpriteImage(imageRef.current)
        }
      }
    }

    if (typeof window !== 'undefined') {
      loadImage()
    }

    return () => {
      // cancel the setInternal
      // console.log('should be calling celar internal')
      clearInterval(setInternalSunAnimateID)
    }
  }, [])

  useEffect(() => {
    const drawImage = (ctx: unknown) => {
      if (!loadedSpriteImage || !ctx) return

      // doing this as I want janky timing lol
      const staggerAnimationNumber = between(0, 10)
      const shouldChangeFrame = staggerAnimationNumber > 3

      const magicNum = between(0, 3)
      srcX = shouldChangeFrame
        ? magicNum * imageData.frameSize.width
        : lastSunFrame

      lastSunFrame = srcX
      ;(ctx as any).clearRect(
        0,
        0,
        imageData.frameSize.width,
        imageData.frameSize.height
      )
      ;(ctx as any).drawImage(
        loadedSpriteImage as CanvasImageSource,
        srcX,
        srcY,
        imageData.frameSize.width,
        imageData.frameSize.height,
        0,
        0,
        imageData.frameSize.width,
        imageData.frameSize.height
      )
    }

    const ctx = canvasRef?.current?.getContext('2d')

    const loopingFunction = () => {
      drawImage(ctx)
    }

    // not using req animation frame as I don't need the high fps
    // console.log('setting the internal calling celar internal')
    setInternalSunAnimateID = setInterval(loopingFunction, 500)
  }, [loadedSpriteImage, canvasRef])

  return (
    <>
      <canvas
        width={imageData.frameSize.width}
        height={imageData.frameSize.height}
        className={styles.sunCanvas}
        ref={canvasRef}
        id="sunSpriteCanvas"
      ></canvas>
    </>
  )
}

export default SunSprite
