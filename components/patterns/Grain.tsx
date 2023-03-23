import React from 'react'

import styles from './grain.module.css'

type Props = {
  mode?: 'light'
}

export const Grain: React.FC<Props> = ({ mode = 'light' }) => {
  if (mode === 'light') {
    return (
      <svg
        className={styles.grainTextureSVG}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 700 700"
      >
        <defs>
          <linearGradient
            gradientTransform="rotate(-217, 0.5, 0.5)"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="gggrain-gradient2"
          >
            <stop stopColor="#47a5f1" stopOpacity="1" offset="-0%"></stop>
            <stop
              stopColor="rgba(255,255,255,0)"
              stopOpacity="0"
              offset="100%"
            ></stop>
          </linearGradient>
          <linearGradient
            gradientTransform="rotate(217, 0.5, 0.5)"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="gggrain-gradient3"
          >
            <stop stopColor="#207bc5" stopOpacity="1"></stop>
            <stop
              stopColor="rgba(255,255,255,0)"
              stopOpacity="0"
              offset="100%"
            ></stop>
          </linearGradient>
          <filter
            id="gggrain-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.52"
              numOctaves="2"
              seed="2"
              stitchTiles="stitch"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="turbulence"
            ></feTurbulence>
            <feColorMatrix
              type="saturate"
              values="0"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="turbulence"
              result="colormatrix"
            ></feColorMatrix>
            <feComponentTransfer
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="colormatrix"
              result="componentTransfer"
            >
              <feFuncR type="linear" slope="3"></feFuncR>
              <feFuncG type="linear" slope="3"></feFuncG>
              <feFuncB type="linear" slope="3"></feFuncB>
            </feComponentTransfer>
            <feColorMatrix
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="componentTransfer"
              result="colormatrix2"
              type="matrix"
              values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 16 -8"
            ></feColorMatrix>
          </filter>
        </defs>
        <g>
          <rect width="100%" height="100%" fill="#8c5fd5"></rect>
          <rect
            width="100%"
            height="100%"
            fill="url(#gggrain-gradient3)"
          ></rect>
          <rect
            width="100%"
            height="100%"
            fill="url(#gggrain-gradient2)"
          ></rect>
          <rect
            width="100%"
            height="100%"
            fill="transparent"
            filter="url(#gggrain-filter)"
            opacity="1"
            style={{ mixBlendMode: 'normal' }}
          ></rect>
        </g>
      </svg>
    )
  } else {
    return (
      <svg
        className={styles.grainTextureSVG}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 700 700"
        // width="700"
        // height="700"
      >
        <defs>
          <linearGradient
            gradientTransform="rotate(-217, 0.5, 0.5)"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="gggrain-gradient2"
          >
            <stop stopColor="#47a5f1" stopOpacity="1" offset="-0%"></stop>
            <stop
              stopColor="rgba(255,255,255,0)"
              stopOpacity="0"
              offset="100%"
            ></stop>
          </linearGradient>
          <linearGradient
            gradientTransform="rotate(217, 0.5, 0.5)"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="gggrain-gradient3"
          >
            <stop stopColor="#207bc5" stopOpacity="1"></stop>
            <stop
              stopColor="rgba(255,255,255,0)"
              stopOpacity="0"
              offset="100%"
            ></stop>
          </linearGradient>
          <filter
            id="gggrain-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.52"
              numOctaves="2"
              seed="2"
              stitchTiles="stitch"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="turbulence"
            ></feTurbulence>
            <feColorMatrix
              type="saturate"
              values="0"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="turbulence"
              result="colormatrix"
            ></feColorMatrix>
            <feComponentTransfer
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="colormatrix"
              result="componentTransfer"
            >
              <feFuncR type="linear" slope="3"></feFuncR>
              <feFuncG type="linear" slope="3"></feFuncG>
              <feFuncB type="linear" slope="3"></feFuncB>
            </feComponentTransfer>
            <feColorMatrix
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="componentTransfer"
              result="colormatrix2"
              type="matrix"
              values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 16 -8"
            ></feColorMatrix>
          </filter>
        </defs>
        <g>
          <rect width="100%" height="100%" fill="#8c5fd5"></rect>
          <rect
            width="100%"
            height="100%"
            fill="url(#gggrain-gradient3)"
          ></rect>
          <rect
            width="100%"
            height="100%"
            fill="url(#gggrain-gradient2)"
          ></rect>
          <rect
            width="100%"
            height="100%"
            fill="transparent"
            filter="url(#gggrain-filter)"
            opacity="1"
            //   style="mix-blend-mode: normal"
            style={{ mixBlendMode: 'normal' }}
          ></rect>
        </g>
      </svg>
    )
  }
}
