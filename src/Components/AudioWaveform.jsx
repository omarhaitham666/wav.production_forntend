import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref, audioElement) => ({
    container: ref,
    waveColor: "#C7C7C7",
    progressColor: "#30B797",
    cursorColor: "#EEB440",
    barWidth: 2,
    barGap: 4,
    barRadius: 3,
    minPxPerSec: 2,
    responsive: true,
    height: 100,
    normalize: true,
    partialRender: true,
    backend: "MediaElement",
    media: audioElement,
});

const AudioWaveform = ({ audioElement }) => {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    useEffect(() => {
        if (!audioElement || !waveformRef.current) return;

        // إعداد الموجات الصوتية وربطها بمشغل الصوت
        const options = formWaveSurferOptions(waveformRef.current, audioElement);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(audioElement);

        return () => wavesurfer.current.destroy();
    }, [audioElement]);

    return <div ref={waveformRef} style={{height: "80px" }}></div>;
};

export default AudioWaveform;
