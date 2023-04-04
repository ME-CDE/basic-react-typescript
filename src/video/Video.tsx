import { useEffect, useRef, useState } from "react";
import {
  VideoContainer,
  Video,
  CustomControl,
  Flex,
  ExtraDisplays,
} from "./video.styles";
import {
  Pause,
  Play,
  FullScreen,
  FastForward,
  ReWind,
} from "../assets/icon/icon";

const VideoPlayer = () => {
  const l =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const [show, setShow] = useState(false);
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(true);
  const [timePlayedRaw, setTimePLayedRaw] = useState(0);
  const [timePlayed, setTimePlayed] = useState("0:00");
  const my_video = useRef<HTMLVideoElement>(null);
  const customControls = useRef<HTMLDivElement>(null);

  const pauseOrplay = (e: any) => {
    e.stopPropagation();
    if (my_video.current?.paused) {
      my_video.current?.play();
      setPaused(false);
    } else {
      my_video.current?.pause();
      setPaused(true);
    }
  };

  const convertToStopFormat = (value: any = 0) => {
    const minute = Math.trunc(value / 60);
    const seconds =
      Math.trunc(value % 60).toString().length < 2
        ? "0" + Math.trunc(value % 60)
        : Math.trunc(value % 60);
    return minute + ":" + seconds;
  };

  const handleFastForward = () => {
    if (my_video.current) {
      my_video.current.currentTime += 10;
    }
  };

  const handleRewind = () => {
    if (my_video.current) {
      my_video.current.currentTime -= 10;
    }
  };

  const volumeUp = () => {
    if (my_video.current) {
      if (my_video.current.volume < 0.85) {
        my_video.current.volume += 0.1;
        console.log(my_video.current.volume);
      } else {
        my_video.current.volume = 1;
      }
    }
  };

  const volumeDown = () => {
    if (my_video.current) {
      if (my_video.current.volume > 0.15) {
        my_video.current.volume -= 0.1;
        console.log(my_video.current.volume);
      } else {
        my_video.current.volume = 0;
      }
    }
  };

  const handleLoadedData = () => {
    setShow(true);
    setLoading(false);
  };

  const toggleFullScreen = () => {
    if (!customControls.current) {
      return;
    }
    if (!document.fullscreenElement) {
      customControls.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleDuration = () => {
    const currentTime = convertToStopFormat(my_video.current?.currentTime);
    setTimePlayed(currentTime);
    setTimePLayedRaw(my_video.current?.currentTime || 0);
  };

  const handleSeeking = (e: any) => {
    if (my_video.current) {
      my_video.current.currentTime = e?.target?.value;
    }
    const currentTime = convertToStopFormat(e?.target?.value);
    setTimePlayed(currentTime);
    setTimePLayedRaw(e.target.value);
  };

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      console.log(e);
      switch (e.key) {
        case "Enter":
          toggleFullScreen();
          break;
        case " ":
          if (document.fullscreenElement) {
            pauseOrplay(e);
          }
          break;
        case "ArrowLeft":
          if (document.fullscreenElement) {
            handleRewind();
          }
          break;
        case "ArrowRight":
          if (document.fullscreenElement) {
            handleFastForward();
          }
          break;
        case "ArrowUp":
          if (document.fullscreenElement) {
            volumeUp();
          }
          break;
        case "ArrowDown":
          if (document.fullscreenElement) {
            volumeDown();
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <VideoContainer data-show={show} ref={customControls}>
      <ExtraDisplays onClick={pauseOrplay} justify="center">
        {loading && "loading..."}
      </ExtraDisplays>
      <CustomControl p={[0, 20]} justify="space-between">
        <Flex m={[0, 50, 0, 0]}>
          {paused ? (
            <Play onClick={pauseOrplay} />
          ) : (
            <Pause onClick={pauseOrplay} />
          )}
        </Flex>
        <Flex justify="space-between" flex={1}>
          <Flex gap={[0, 16]}>
            <ReWind onClick={handleRewind} />
            <FastForward onClick={handleFastForward} />
          </Flex>
          <Flex>
            <input
              type="range"
              name=""
              id=""
              max={my_video.current?.duration}
              value={timePlayedRaw}
              onChange={handleSeeking}
            />
            <Flex m={10} color="white">
              {timePlayed} / {convertToStopFormat(my_video.current?.duration)}
            </Flex>
          </Flex>
          <FullScreen onClick={toggleFullScreen} />
        </Flex>
      </CustomControl>
      <Video
        src={l}
        controls
        ref={my_video}
        onLoadedMetadata={handleLoadedData}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onTimeUpdate={handleDuration}
      ></Video>
    </VideoContainer>
  );
};

export default VideoPlayer;
