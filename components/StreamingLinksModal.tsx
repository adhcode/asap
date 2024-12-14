// components/StreamingLinksModal.tsx
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Share2 } from 'lucide-react';

interface StreamingLinksModalProps {
    isOpen: boolean;
    onClose: () => void;
    songTitle?: string;
    artistName?: string;
    coverArt?: string;
}

const streamingPlatforms = [
    {
        name: "Apple Music",
        icon: "/apple.svg",
        link: "https://music.apple.com/us/album/asap-single/1781579654?uo=4&app=music&at=1001lry3&ct=dashboard"
    },
    {
        name: "Spotify",
        icon: "/spotify.svg",
        link: "https://open.spotify.com/album/7ADIyz4k0AtqZq0xOdAv6O"
    },
    {
        name: "Audiomack",
        icon: "/audiomack.svg",
        link: "https://audiomack.com/meekturna/song/asap"
    },
    {
        name: "Boomplay",
        icon: "/boomplay.png",
        link: "https://www.boomplay.com/songs/190576761?srModel=COPYLINK&srList=WEB"
    },
    {
        name: "Deezer",
        icon: "/deezer.png",
        link: "https://www.deezer.com/album/674504181"
    },
    {
        name: "YouTube Music",
        icon: "/youtubemusic.png",
        link: "https://music.youtube.com/watch?v=5DZmTUZrhT0&si=Ga3EU361Bh8V4q5h"
    },
    {
        name: "Tidal",
        icon: "/tidal.svg",
        link: "https://listen.tidal.com/album/401387221/track/401387228"
    },
    {
        name: "iHeartRadio",
        icon: "/iheartradio.jpg",
        link: "https://www.iheart.com/artist/id-42195439/albums/id-300369958"
    }
];

const StreamingLinksModal = ({
    isOpen,
    onClose,
    songTitle = "ASAP",
    artistName = "MeekTurna",
    coverArt = "/asap.png"
}: StreamingLinksModalProps) => {
    const handleShare = async () => {
        const shareData = {
            title: `${songTitle} by ${artistName}`,
            text: `Listen to ${songTitle} by ${artistName}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 font-golos"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#1A1A1A] rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl relative 
                scrollbar-none"
                style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {/* Album Art and Title Section */}
                <div className="flex flex-col items-center mb-8 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={coverArt}
                            width={240}
                            height={240}
                            alt="Album Cover"
                            className="rounded-lg shadow-2xl mb-6 hover:shadow-white/10 transition-all duration-300"
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[14px] font-[700] text-white mb-2"
                    >
                        {artistName}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[#7E7E7E] text-[28px] font-[600]"
                    >

                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-[80px] font-bold tracking-tighter leading-[0.8] mt-4"
                        style={{
                            WebkitTextStroke: '2px white',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        {songTitle}
                    </motion.div>
                </div>

                {/* Close Button */}
                <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-black/50 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>

                {/* Share Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <Button
                        onClick={handleShare}
                        className="w-full text-white text-sm bg-black/50 backdrop-blur-sm flex items-center 
                        justify-center gap-3 py-5 border border-white/10 hover:bg-white/10 
                        transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 
                        group font-golos"
                    >
                        <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="group-hover:tracking-wide transition-all duration-300">
                            Share with Friends
                        </span>
                    </Button>
                </motion.div>

                {/* Streaming Platforms */}
                <div className="space-y-4">
                    {streamingPlatforms.map((platform, index) => (
                        <motion.div
                            key={platform.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Link href={platform.link} target="_blank" rel="noopener noreferrer">
                                <div className="bg-black/50 hover:bg-white/10 rounded-[4px] p-4 
                                transition-all duration-300 border border-white/10 hover:scale-105 
                                transform hover:-translate-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={platform.icon}
                                                width={44}
                                                height={44}
                                                alt={`${platform.name} logo`}
                                                className="object-contain rounded-full"
                                            />
                                            <span className="text-white font-medium text-lg">{platform.name}</span>
                                        </div>
                                        <Button className="rounded-[4px] text-[#101010] text-[16px] 
                                        bg-gradient-to-r from-white to-gray-100 font-[600] tracking-wide 
                                        border-none shadow-lg hover:shadow-white/10">
                                            Listen Now
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                            {index < streamingPlatforms.length - 1 && (
                                <Separator className="my-4 bg-white/10" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* UVISE Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 pt-4 border-t border-white/10"
                >
                    <Link
                        href="https://uvise.media"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-[#7E7E7E] hover:text-white transition-colors text-sm"
                    >
                        Powered by
                        <span className="font-semibold">UVISE</span>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default StreamingLinksModal;