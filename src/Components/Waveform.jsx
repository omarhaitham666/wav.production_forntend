import React, { useEffect, useRef, useState } from "react";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";
import WaveSurfer from "wavesurfer.js";
import { useAudioPlayer } from "../Context/AudioPlayerContext";

const formWaveSurferOptions = ref => ({
  container: ref,
  width: "100%",
  waveColor: "#575757",
  progressColor: "#30B797",
  cursorColor: "#EEB440",
  barWidth: 3,
  barGap: 10,
  barRadius: 3,
  responsive: true,
  height: 100,
  normalize: true,
  partialRender: true,
  backend: "WebAudio",
});

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};


export default function Waveform({ url, song, setCurrentWaveSurfer, currentWaveSurfer }) {
  const { loadSong, togglePlayPause, currentSong, playSong, PlayingList } = useAudioPlayer();

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if (!url || wavesurfer.current) return;

    setPlay(false);
    setIsLoaded(false);

    // التأكد من إيقاف الصوت الحالي قبل تشغيل أغنية جديدة
    if (currentWaveSurfer && currentWaveSurfer !== wavesurfer.current) {
      currentWaveSurfer.pause(); // ⛔ إيقاف أي مشغل آخر قبل التشغيل الجديد
    }

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    try {
      wavesurfer.current.load(url);

      wavesurfer.current.on("ready", () => {
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(0);
          setDuration(wavesurfer.current.getDuration());
          setIsLoaded(true);
        }
      });

      wavesurfer.current.on("audioprocess", () => {
        if (wavesurfer.current?.isPlaying()) {
          setCurrentTime(wavesurfer.current.getCurrentTime());
        }
      });

      wavesurfer.current.on("error", (err) => {
        console.error("WaveSurfer error:", err);
      });

    } catch (error) {
      console.error("Error initializing WaveSurfer:", error);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [url]);


  const handlePlayPause = () => {
    if (currentSong?.song_url !== url) {
      playSong(song); // 🎵 تحميل الأغنية للمشغل الرئيسي
    } else {
      togglePlayPause(); // ⏯ تشغيل أو إيقاف المشغل الرئيسي
    }

    setCurrentWaveSurfer(wavesurfer.current); // تحديث المشغل الفرعي النشط
  };

  return (
    <div className="flex flex-row items-center py-8 gap-4 w-full">
      <div className="order-1 w-full flex flex-row items-center gap-3">
        <span className="font-bold">{formatTime(currentTime)}</span>
        <div id="waveform" className="w-full" ref={waveformRef} />
        <span className="font-bold">{formatTime(duration)}</span>
      </div>
      <div className="controls">
        {
          playing ? (
            <IoPauseCircleOutline onClick={handlePlayPause} className="text-black cursor-pointer text-6xl hover:text-[#30B797] transition-all" />
          ) : (
            <IoPlayCircleOutline onClick={handlePlayPause} className="text-black cursor-pointer text-6xl hover:text-[#30B797] transition-all" />
          )}
      </div>
      <div className="text-center text-gray-600">
      </div>
    </div>
  );
}
