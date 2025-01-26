import React from "react"
import SevenSegmentSvg from "../assets/SevenSegmentSvg"
import { bitReadAll, segmentMap } from "./functions.ts"

type SevenSegmentDigitProps = {
  value: string,
  w: number,
  onColor: string,
  offColor: string
}

function SevenSegmentDigit({ w, onColor, offColor, value }: SevenSegmentDigitProps): React.JSX.Element {
  const [g, f, e, d, c, b, a] =
    value in segmentMap ? segmentMap[value] : bitReadAll(Number(value));
  return (
    <SevenSegmentSvg
      a={a}
      b={b}
      c={c}
      d={d}
      e={e}
      f={f}
      g={g}
      onColor={onColor}
      offColor={offColor}
      segmentWidth={w}

    />
  )
}

export default SevenSegmentDigit