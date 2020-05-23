import * as React from "react"

function SvgPercentage(props) {
    const alc = `` + props.alc + `%`;
    return (
        <svg viewBox="0 0 128.85 177.73" {...props}>
            <g data-name="Layer 2">
                <g data-name="Layer 1">
                    <path
                        d="M128.52 121.7a61.44 61.44 0 01-9.63 26.3c-5.45 8.49-12.22 15.71-21 20.7-9.11 5.19-18.83 9-29.25 8.93-27 1.51-47.33-9.86-60.54-32.37C-1.65 128.53-2.49 110.4 5 92c7.72-19 18.6-36.1 29.72-53.17C42.94 26.16 52.28 14.4 61.13 2.24c2.19-3 3.82-2.95 6.09 0 10 13 20.18 25.88 29 39.81 6.8 10.8 14 21.38 19.67 32.76 7.32 14.71 14.63 29.69 12.63 46.89z"
                        fill="#f6a91f"
                    />
                    <text
                        transform="translate(8.35 133.76)"
                        fontSize={56.2}
                        fill="#fff"
                        fontFamily="FFFTusj-Bold,FFF Tusj"
                        fontWeight={700}
                    >
                        {alc}
                    </text>
                </g>
            </g>
        </svg>
    )
}

export default SvgPercentage