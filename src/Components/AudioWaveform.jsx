// import React, { useEffect, useRef, useState } from "react";
// import WaveSurfer from "wavesurfer.js";

// const formWaveSurferOptions = (ref, audioElement) => ({
//     container: ref,
//     waveColor: "#C7C7C7",
//     progressColor: "#30B797",
//     cursorColor: "#EEB440",
//     barWidth: 2,
//     barGap: 4,
//     barRadius: 3,
//     minPxPerSec: 2,
//     responsive: true,
//     height: 100,
//     normalize: true,
//     partialRender: true,
//     backend: "MediaElement",
//     media: audioElement,
// });

// const AudioWaveform = ({ audioElement , isPlaying }) => {
//     const waveformRef = useRef(null);
//     const wavesurfer = useRef(null);
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(() => {
//         if (!audioElement || !waveformRef.current || isLoaded) return;

//         // انتظر حتى يتم تحميل الصوت بالكامل
//         audioElement.oncanplaythrough = () => {
//             if (!isLoaded) {
//                 const options = formWaveSurferOptions(waveformRef.current, audioElement);
//                 wavesurfer.current = WaveSurfer.create(options);
//                 wavesurfer.current.load(audioElement);
//                 setIsLoaded(true);
//             }
//         };

//         return () => {
//             if (wavesurfer.current) {
//                 wavesurfer.current.destroy();
//                 wavesurfer.current = null;
//             }
//         };
//     }, [isPlaying]);

//     return <div ref={waveformRef} style={{height: "80px" }}>
//         {isLoaded && <div className="waveform" />}
//     </div>;
// };

// export default AudioWaveform;
