import React, { useRef, useState, useEffect } from 'react'

// import Image from 'next/image'

// import sunSpriteImage from '../../public/images/sunSprite-min.png'
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
  }, [])

  useEffect(() => {
    console.log('loadedSpriteImage changed', loadedSpriteImage)
  }, [loadedSpriteImage])

  let srcX = 0
  const srcY = 0

  function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  useEffect(() => {
    const drawImage = (ctx: any) => {
      //   console.log('calling loop draw')
      if (!loadedSpriteImage || !ctx) return

      // now need to slow the animation down a lot

      const magicNum = between(0, 3)
      srcX = magicNum * imageData.frameSize.width

      //   console.log('magic', magicNum)

      ctx.clearRect(0, 0, imageData.frameSize.width, imageData.frameSize.height)

      ctx?.drawImage(
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
      // set the src x and y randomly
      drawImage(ctx)
      window.requestAnimationFrame(loopingFunction)
    }

    window.requestAnimationFrame(loopingFunction)
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
