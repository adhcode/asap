"use client"

import Image from "next/image"
import { ChevronDown, Share2 } from 'lucide-react'
import { FaSpotify, FaYoutube, FaTiktok, FaApple, FaInstagram, FaCloud } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useEffect, useState, memo } from "react"
import { motion } from "framer-motion";
import { IconType } from 'react-icons';
import StreamingLinksModal from './StreamingLinksModal';

const carouselImages = [
  "/asap-1.jpg",
  "/asap-2.jpg",
  "/asap-3.jpg"

];

interface SocialLink {
  icon: IconType;
  url: string;
}

const PAGE_SOCIAL_LINKS: SocialLink[] = [
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
    url: 'https://open.spotify.com/artist/6lXdinu2W0JE2i7pxVJ1DP?si=QF6zRHlERdGbPyimRRUvVQ&nd=1&dlsi=242ab1e334ec431f',
  },
  {
    icon: FaApple,
    url: 'https://music.apple.com/album/asap-single/1781579654',
  },
  {
    icon: FaCloud,
    url: 'https://soundcloud.com/meekturna?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  }
];

// Update the share functionality to use the main website URL
const MAIN_WEBSITE_URL = 'https://www.asap.uvise.media';


const CarouselImage = memo(({ image, index, currentIndex }: {
  image: string;
  index: number;
  currentIndex: number;
}) => (
  <div
    className={`absolute w-full h-full transition-all duration-700 ease-in-out ${index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
    <div className="absolute inset-0 bg-black/80 lg:bg-black/70 rounded-none lg:rounded-lg" />
  </div>
));
CarouselImage.displayName = 'CarouselImage';

export default function MusicPromo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStreamClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'MEEKTURNA - ASAP',
          text: '🔥 Check out this hot new track ASAP by MEEKTURNA',
          url: MAIN_WEBSITE_URL
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(MAIN_WEBSITE_URL);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const audioElement = new Audio('/asap.mp3');
    audioElement.preload = 'auto';
    setAudio(audioElement);

    // Attempt to play the audio when the user interacts
    const handleUserInteraction = () => {
      audioElement.play().then(() => {
      }).catch((error) => {
        console.error('Play failed:', error);
      });
    };

    // Add event listeners for user interaction
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
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
      playPromise.catch((error) => {
        console.error('Audio playback failed:', error);
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
    const handleEnded = () => {
      // Add your ended logic here if needed
      if (audio) {
        audio.currentTime = 0;
      }
    };

    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('ended', handleEnded);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-y-auto min-h-screen lg:overflow-hidden lg:flex lg:items-center lg:justify-center animate-fadeIn font-golos">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row lg:gap-8 p-4 lg:p-0 lg:h-[752px] pb-20 lg:pb-4">
        {/* Info Container */}
        <div className="w-full lg:w-[596px] bg-[#1A1A1A] p-6 lg:p-8 rounded-none lg:rounded-lg shrink-0 flex flex-col justify-between relative overflow-hidden animate-slideUp">
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
              <h1 className="text-[14px] lg:text-[16px] font-[700] leading-[19.2px] text-[#FFFFFF] font-golos mb-8 lg:mb-16">
                MEEKTURNA
              </h1>
              <p className="text-[#7E7E7E] text-[28px] lg:text-[40px] font-[600] leading-[1.2] lg:leading-[48px] font-golos mb-8 lg:mb-12">
                Stream The Hit Single
              </p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-[120px] sm:text-[100px] md:text-[120px] lg:text-[160px] font-bold tracking-tighter leading-[0.8] mb-4 lg:mb-16 font-golos w-full"
                style={{
                  WebkitTextStroke: '2px white',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ASAP
              </motion.div>

              {/* Button and Release Date */}
              <div className="flex flex-col w-full lg:w-auto gap-6 mt-8 lg:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    className="rounded-[4px] text-[#101010] text-[16px] w-full lg:w-[200px] py-6 lg:py-5 
                    transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 
                    bg-gradient-to-r from-white to-gray-100 font-[600] tracking-wide
                    transform hover:-translate-y-1 font-golos"
                    style={{ fontFamily: 'var(--font-golos)' }}
                    onClick={handleStreamClick}
                  >
                    Listen Now
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    className="text-white text-sm bg-black/50 backdrop-blur-sm flex items-center 
                    justify-center gap-3 py-5 w-full lg:w-[200px] border border-white/10
                    hover:bg-white/10 transition-all duration-300 hover:scale-105
                    transform hover:-translate-y-1 group font-golos"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="group-hover:tracking-wide transition-all duration-300">
                      Share with Friends
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="w-full lg:w-[596px] h-[446.26px] lg:h-[752px] bg-[#7E1717] rounded-none lg:rounded-lg shrink-0 relative">
          <div className="w-full h-full relative">
            {carouselImages.map((image, index) => (
              <CarouselImage
                key={index}
                image={image}
                index={index}
                currentIndex={currentIndex}
              />
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />

          {/* Social Icons */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center gap-6"
            >
              {PAGE_SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white transform hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-6 h-6 drop-shadow-lg" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Down Arrow */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center lg:hidden">
        <ChevronDown className="w-8 h-8 text-white animate-bounce" />
      </div>

      <StreamingLinksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

