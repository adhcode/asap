"use client"

import Image from "next/image"
import { Loader2, ChevronDown, Cloud, Music } from 'lucide-react'
import { FaSpotify, FaYoutube, FaTiktok, FaApple, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const carouselImages = [
  "/asap-1.jpg",
  "/asap-2.jpg",
  "/asap-3.jpg"

];

const PAGE_SOCIAL_LINKS = [
  {
    icon: FaXTwitter,
    url: 'https://x.com/meekturna',
  },
  {
    icon: FaYoutube,
    url: 'https://www.youtube.com/@meekturna/',
  },
  {
    icon: FaInstagram,
    url: 'https://www.instagram.com/meekturna1?igsh=aW1ma2h1bjRyaXZt&utm_source=qr',
  },
  {
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@meekturna?_t=8rxrMZGgePv&_r=1',
  },
  {
    icon: FaSpotify,
    url: 'https://open.spotify.com/artist/yourid',
  },
  {
    icon: FaApple,
    url: 'https://music.apple.com/us/album/asap-single/1781579654',
  },
  {
    icon: Cloud,
    url: 'https://soundcloud.com/meekturna?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  }
];

const MODAL_SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    url: 'https://www.instagram.com/meekturna1?igsh=aW1ma2h1bjRyaXZt&utm_source=qr',
    hoverColor: 'hover:text-pink-500',
    label: 'Instagram'
  },
  {
    icon: FaXTwitter,
    url: 'https://x.com/meekturna',
    hoverColor: 'hover:text-blue-500',
    label: 'Twitter'
  },


  {
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@meekturna?_t=8rxrMZGgePv&_r=1',
    hoverColor: 'hover:text-purple-500',
    label: 'TikTok'
  },
  {
    icon: FaYoutube,
    url: 'https://www.youtube.com/@meekturna/',
    hoverColor: 'hover:text-red-500',
    label: 'YouTube'
  }
];

export default function MusicPromo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const audioElement = new Audio('/asap.mp3');
    setAudio(audioElement);
    setShowPlayButton(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const playPromise = audio?.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setShowPlayButton(true);
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  useEffect(() => {
    audio?.addEventListener('ended', () => {
      setIsPlaying(false);
      setIsFinished(true);
    });

    return () => {
      audio?.removeEventListener('ended', () => {
        setIsPlaying(false);
        setIsFinished(true);
      });
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  if (!isMounted) {
    return null;
  }

  const handlePlay = () => {
    setIsPlaying(true);
    audio?.play().catch(e => {
      console.error('Play failed:', e);
      setIsPlaying(false);
    });
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-y-auto min-h-screen lg:overflow-hidden lg:flex lg:items-center lg:justify-center">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row lg:gap-8 p-4 lg:p-0 lg:h-[752px] pb-20 lg:pb-4">
        {/* Info Container */}
        <div className="w-full lg:w-[596px] bg-[#1A1A1A] p-4 lg:p-8 rounded-none lg:rounded-lg shrink-0 flex flex-col justify-between relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#2A2A2A] to-[#1A1A1A] pointer-events-none" />

          {/* Background image */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <Image
              src="/mask-group.png"
              alt="Background pattern"
              width={596}
              height={200}
              className="w-full object-cover"
            />
          </div>

          {/* Content Container */}
          <div className="flex flex-col h-full justify-between">
            {/* Upper Content */}
            <div className="flex flex-col relative">
              <h1 className="text-[14px] lg:text-[16px] font-[700] leading-[19.2px] text-[#FFFFFF] font-golos mb-16">
                MEEKTURNA
              </h1>
              <p className="text-[#7E7E7E] text-[32px] lg:text-[40px] font-[600] leading-[1.2] lg:leading-[48px] font-golos mb-12">
                The Newest Single
              </p>
              <h2 className="text-[120px] lg:text-[160px] font-bold tracking-tighter leading-[0.8] mb-4 lg:mb-16"
                style={{
                  WebkitTextStroke: '2px white',
                  WebkitTextFillColor: 'transparent'
                }}>
                ASAP
              </h2>

              {/* Button and Release Date */}
              <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between w-full lg:mb-16">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-[4px] text-[#101010] text-[14px] lg:text-[16px] w-[156px] mt-4 lg:mt-0 mb-16 lg:mb-0">
                      PreSave to listen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1A1A1A] border-gray-800 w-[90%] sm:max-w-[425px] rounded-xl m-4">
                    <DialogHeader className="space-y-4">
                      <DialogTitle className="text-white text-2xl font-bold text-center">
                        Choose Your Platform
                      </DialogTitle>
                      <p className="text-gray-400 text-center text-sm">
                        Pre-save ASAP now and be the first to listen when it drops
                      </p>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-6">
                      <Button
                        className="flex items-center gap-3 h-14 text-lg transition-all hover:scale-[1.02]"
                        onClick={() => window.open('https://spotify.com', '_blank')}
                        style={{ background: '#1DB954' }}
                      >
                        <FaSpotify className="w-6 h-6" />
                        Presave on Spotify
                      </Button>

                      <Button
                        className="flex items-center gap-3 h-14 text-lg transition-all hover:scale-[1.02] bg-gradient-to-r from-pink-500 to-purple-500"
                        onClick={() => window.open('https://music.apple.com/us/album/asap-single/1781579654', '_blank')}
                      >
                        <FaApple className="w-6 h-6" />
                        Presave on Apple Music
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center gap-3 h-14 text-lg border-gray-700 hover:bg-gray-800 transition-all hover:scale-[1.02]"
                        onClick={() => window.open('https://soundcloud.com/meekturna?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', '_blank')}
                      >
                        <Cloud className="w-6 h-6" />
                        Follow on SoundCloud
                      </Button>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-6">
                      <p className="text-gray-400 text-center text-sm mb-4">Follow on social media</p>
                      <div className="flex justify-center gap-6">
                        {MODAL_SOCIAL_LINKS.map((social) => {
                          const Icon = social.icon;
                          return (
                            <a
                              key={social.label}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-gray-400 ${social.hoverColor} transition-colors duration-300`}
                              aria-label={social.label}
                            >
                              <Icon className="w-6 h-6" />
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                      Release Date: December 13, 2024
                    </div>
                  </DialogContent>
                </Dialog>
                <p className="text-[#FFFFFF] text-[14px] font-[400] leading-[1.5] text-left lg:text-right font-golos lg:w-[199px]">
                  Coming out on all platform on December 13
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 relative z-10 mt-auto">
              {PAGE_SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400 transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="w-full lg:w-[596px] h-[446.26px] lg:h-[752px] bg-[#7E1717] rounded-none lg:rounded-lg shrink-0">
          <div className="w-full h-full relative">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <Image
                  src={image}
                  alt={`ASAP promo image ${index + 1}`}
                  fill
                  priority={index === 0}
                  quality={100}
                  className="w-full h-full object-cover rounded-none lg:rounded-lg"
                  style={{
                    objectPosition: 'center top',
                    imageRendering: 'auto'
                  }}
                />
                <div className="absolute inset-0 bg-black/50 lg:bg-black/70 rounded-none lg:rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Down Arrow */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center lg:hidden">
        <ChevronDown className="w-8 h-8 text-white animate-bounce" />
      </div>

      {/* Play Button */}
      {showPlayButton && (
        <Button
          onClick={handlePlay}
          className="fixed top-4 right-4 bg-white/10 hover:bg-white/20 flex items-center gap-2 text-sm lg:text-base"
          disabled={isPlaying}
        >
          {isPlaying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Playing...
            </>
          ) : isFinished ? (
            <span className="text-xs sm:text-sm">
              I know you can&apos;t wait to hear ASAP, Pre Save now
            </span>
          ) : (
            <>
              <Music className="h-4 w-4" />
              Play Music
            </>
          )}
        </Button>
      )}
    </div>
  )
}

