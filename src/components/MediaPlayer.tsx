import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import onimaiAlbum from "@/assets/onimai-album.jpeg";
import foundAlbum from "@/assets/until-i-found-you-album.png";
import pasilyoAlbum from "@/assets/pasilyo-album.png";

const tracks = [
  { name: "Opening", artist: "Onimai Soundtrack", url: "/audio/opening.mp3", album: onimaiAlbum },
  { name: "Ending", artist: "Onimai Soundtrack", url: "/audio/ending.mp3", album: onimaiAlbum },
  { name: "Until I Found You", artist: "Stephen Sanchez", url: "/audio/until-i-found-you.mp3", album: foundAlbum },
  { name: "Pasilyo", artist: "SunKissed Lola", url: "/audio/pasilyo.mp3", album: pasilyoAlbum },
];

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <Card 
      ref={cardRef}
      className="fixed z-50 p-4 w-80 backdrop-blur-md bg-card/95 border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover-lift shadow-xl group"
      style={{
        left: position.x ? `${position.x}px` : 'auto',
        top: position.y ? `${position.y}px` : 'auto',
        right: position.x ? 'auto' : '1rem',
        bottom: position.y ? 'auto' : '1rem',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{ background: 'var(--gradient-card)' }} />
      
      <div className="relative z-10 space-y-3">
        {/* Header with Album Cover */}
        <div 
          className="flex items-center gap-3 mb-2 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="relative group">
            <img 
              src={tracks[currentTrack].album} 
              alt={`${tracks[currentTrack].name} album cover`}
              className="w-14 h-14 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300 ring-2 ring-primary/30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm flex items-center gap-1 truncate">
              <Sparkles className="w-3 h-3 text-accent animate-pulse flex-shrink-0" />
              <span className="truncate">{tracks[currentTrack].name}</span>
            </h3>
            <p className="text-xs text-muted-foreground truncate">{tracks[currentTrack].artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground hover:shadow-lg hover:scale-110 transition-all duration-300 btn-press"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTrack}
              className="h-8 w-8 hover:text-accent hover:scale-110 transition-all duration-300 btn-press"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8 hover:text-accent hover:scale-110 transition-all duration-300 btn-press"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={(value) => setVolume(value[0])}
              className="w-20"
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />
    </Card>
  );
};

export default MediaPlayer;
