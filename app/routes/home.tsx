import type { Route } from "./+types/home"
import { useState, useEffect, useRef } from "react"
import { HugeiconsIcon } from '@hugeicons/react'
import {
    MusicNote03Icon,
    Yoga01Icon,
    Coffee01Icon,
    AudioWave01Icon,
    FireIcon,
    Calendar03Icon,
    Clock01Icon,
    UserGroup02Icon,
    ArrowDown01Icon,
    Mail01Icon,
    TelegramIcon,
    SparklesIcon
} from "@hugeicons/core-free-icons"
import { openTelegramLink, retrieveLaunchParams } from "@tma.js/sdk"


const TELEGRAM_BOT_URL = "https://t.me/aleteo_vibrante_bot"


function isTelegramMiniApp(): boolean {
    if (typeof window === 'undefined') return false
    try {
        const params = retrieveLaunchParams()
        return !!params?.tgWebAppData
    } catch {
        return false
    }
}


function openTelegramBot() {
    if (isTelegramMiniApp()) {
        openTelegramLink(TELEGRAM_BOT_URL)
    } else {
        window.open(TELEGRAM_BOT_URL, '_blank', 'noopener,noreferrer')
    }
}


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Aleteo Vibrante | Sound Healing & Transformational Experiences" },
        { name: "description", content: "Immersive sound healing journeys, cacao ceremonies, ecstatic dance, and transformational rituals" },
    ];
}


const experiences = [
    {
        id: 'healing',
        tag: 'IMMERSIVE EXPERIENCE',
        title: 'Healing Resonance Portal',
        description: 'Electronic-instrumental concert with body practices and aromatherapy. Deep immersion into the sound space of healing.',
        icon: SparklesIcon,
        image: '/images/healing.jpg',
        steps: [
            { num: '01', title: 'Tuning', desc: 'Introduction and preparation for the process' },
            { num: '02', title: 'Meditation', desc: 'Sound journey' },
            { num: '03', title: 'Integration', desc: 'Sharing and tea ceremony' }
        ],
        stats: { team: '5 people', duration: '3 hours', guests: '20 optimal' },
    },
    {
        id: 'cacao',
        tag: 'ECSTATIC DANCE',
        title: 'Cacao Dance',
        description: 'Cacao ceremony with live instruments, medicine songs and 2-hour DJ set from Lamas\'s Dream & Ivan Latyshev.',
        icon: Coffee01Icon,
        image: '/images/cacao.jpg',
        steps: [
            { num: '01', title: 'Opening', desc: 'Welcoming the light and opening the space' },
            { num: '02', title: 'Intention', desc: 'Setting personal and group intentions' },
            { num: '03', title: 'Dance', desc: 'Ecstatic Dance practice' }
        ],
        stats: { team: '3 people', duration: '3 hours', guests: 'Up to 50' },
    },
    {
        id: 'ambient',
        tag: 'ORIGINAL MUSIC',
        title: 'Ambient Concert',
        description: 'Electronic-instrumental performance by Ivan Latyshev. 1.5 hours of sound journey.',
        icon: MusicNote03Icon,
        image: '/images/ambient.jpg',
        stats: { duration: '1.5 hours', guests: 'Venue dependent' },
    },
    {
        id: 'ceremonies',
        tag: 'RITUAL',
        title: 'Opening & Closing Ceremonies',
        description: 'Authentic rituals with traditional medicine songs and intention setting using sacred tobacco.',
        icon: FireIcon,
        image: '/images/ceremony.jpg',
        stats: { team: '2+ people', duration: '30-40 min', guests: 'Unlimited' },
    },
    {
        id: 'temazcal',
        tag: 'TRADITION',
        title: 'Temazcal (Inipi)',
        description: 'Deep transformational ceremony with traditional songs and prayer. A sacred sweat lodge experience.',
        icon: Yoga01Icon,
        image: '/images/temazcal.jpg',
        stats: { team: '3 people', duration: '4-5 hours', guests: '6 optimal' },
    },
    {
        id: 'medicine',
        tag: 'LIVE MUSIC',
        title: 'Medicine Songs Concert',
        description: 'Healing vocal practices and traditional melodies performed live. Team of 2-3 musicians.',
        icon: AudioWave01Icon,
        image: '/images/concert.jpg',
        stats: { duration: '1.5 hours', guests: 'Venue dependent' },
    }
]


export default function Home() {
    const [activeExperience, setActiveExperience] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const heroRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const scrollToExperiences = () => {
        document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/images/hero.jpg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--color-bg)]" />

                <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-[var(--color-primary)] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 sm:mb-6 font-light drop-shadow-lg">
                        Sound Healing Collective
                    </p>

                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-4 sm:mb-6 drop-shadow-2xl">
                        <span className="text-shimmer">Aleteo</span>
                        <br />
                        <span className="text-[var(--color-text)]">Vibrante</span>
                    </h1>

                    <p className="text-base sm:text-xl md:text-2xl text-[var(--color-primary)] max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-12 drop-shadow-lg px-4">
                        Transformational sound journeys, sacred ceremonies, and healing experiences
                    </p>

                    <button
                        onClick={scrollToExperiences}
                        className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 gradient-border rounded-full text-[var(--color-primary)] hover:opacity-80 transition-all duration-300 text-sm sm:text-base"
                    >
                        <span className="tracking-wider">Discover Experiences</span>
                        <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            size={18}
                            className="group-hover:translate-y-1 transition-transform sm:w-5 sm:h-5"
                        />
                    </button>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 gradient-border rounded-full flex justify-center backdrop-blur-sm">
                        <div className="w-1.5 h-3 gradient-gold rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Experiences Section */}
            <section id="experiences" className="py-12 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-20">
                        <p className="text-[var(--color-primary)] tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">Our Offerings</p>
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-light text-[var(--color-text)]">
                            Transformational Experiences
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {experiences.map((exp, index) => (
                            <ExperienceCard
                                key={exp.id}
                                experience={exp}
                                index={index}
                                isActive={activeExperience === exp.id}
                                onClick={() => setActiveExperience(activeExperience === exp.id ? null : exp.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-16 sm:py-32 px-4 sm:px-6 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/images/meditation.jpg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <p className="text-[var(--color-primary)] tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">About Us</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--color-text)] mb-6 sm:mb-8">
                        The Collective
                    </h2>
                    <p className="text-base sm:text-xl text-[var(--color-muted)] leading-relaxed mb-8 sm:mb-12">
                        We are a collective of musicians, healers, and facilitators dedicated to creating
                        transformational experiences through sound, movement, and ancient traditions.
                        Our events blend electronic and acoustic instruments with traditional practices
                        to guide participants on profound inner journeys.
                    </p>

                    <div className="flex items-center justify-center gap-6 sm:gap-12 max-w-2xl mx-auto px-4">
                        <StatItem number="2" label="Musicians" />
                        <div className="w-px h-12 bg-[var(--color-primary)]/20" />
                        <StatItem number="1" label="Vocalist" />
                        <div className="w-px h-12 bg-[var(--color-primary)]/20" />
                        <StatItem number="2" label="Therapists" />
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[var(--color-bg)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-16">
                        <p className="text-[var(--color-primary)] tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">Moments</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--color-text)]">
                            Gallery
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                        <GalleryImage src="/images/hero.jpg" alt="Musicians performing" className="col-span-2 md:row-span-2" />
                        <GalleryImage src="/images/cacao.jpg" alt="Cacao ceremony gathering" />
                        <GalleryImage src="/images/dance.jpg" alt="Ecstatic dance" />
                        <GalleryImage src="/images/healing.jpg" alt="Sound healing session" />
                        <GalleryImage src="/images/ceremony.jpg" alt="Opening ceremony" />
                        <GalleryImage src="/images/concert.jpg" alt="Live concert" className="col-span-2" />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative py-16 sm:py-32 px-4 sm:px-6 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/images/dance.jpg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/80 to-black/70" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <p className="text-[var(--color-primary)] tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">Get in Touch</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--color-text)] mb-6 sm:mb-8">
                        Book an Experience
                    </h2>
                    <p className="text-base sm:text-xl text-[var(--color-muted)] leading-relaxed mb-8 sm:mb-12">
                        Ready to embark on a transformational journey? Contact us to discuss
                        your event, venue, and customize the perfect experience for your community.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                        <button
                            onClick={openTelegramBot}
                            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 gradient-gold rounded-full text-[var(--color-bg)] hover:opacity-90 transition-all duration-300 animate-pulse-glow cursor-pointer text-sm sm:text-base"
                        >
                            <HugeiconsIcon icon={TelegramIcon} size={20} className="sm:w-6 sm:h-6" />
                            <span className="tracking-wider font-medium">Write on Telegram</span>
                        </button>
                        <a
                            href="mailto:hello@aleteovibrante.com"
                            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 gradient-border rounded-full text-[var(--color-primary)] hover:opacity-80 transition-all duration-300 text-sm sm:text-base"
                        >
                            <HugeiconsIcon icon={Mail01Icon} size={20} className="sm:w-6 sm:h-6" />
                            <span className="tracking-wider">Email Us</span>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    )
}


interface ExperienceCardProps {
    experience: typeof experiences[0]
    index: number
    isActive: boolean
    onClick: () => void
}

function ExperienceCard({ experience, index, isActive, onClick }: ExperienceCardProps) {
    const Icon = experience.icon

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 transition-all duration-500 cursor-pointer ${isActive ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={onClick}
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${experience.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />

            <div className="relative z-10 p-4 sm:p-6 md:p-8 min-h-[280px] sm:min-h-[320px] flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <HugeiconsIcon icon={Icon} size={14} className="text-[var(--color-primary)] sm:w-4 sm:h-4" />
                    <span className="text-[var(--color-primary)] text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                        {experience.tag}
                    </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-[var(--color-text)] mb-3 sm:mb-4 transition-colors">
                    {experience.title}
                </h3>

                <p className="text-[var(--color-muted)] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    {experience.description}
                </p>

                {isActive && experience.steps && (
                    <div className="mb-6 space-y-4 animate-fade-in-up">
                        {experience.steps.map(step => (
                            <div key={step.num} className="flex items-start gap-4">
                                <span className="text-[var(--color-primary)] font-light text-sm">{step.num}</span>
                                <div className="border-l border-[var(--color-primary)]/30 pl-4">
                                    <p className="text-[var(--color-text)] font-medium">{step.title}</p>
                                    <p className="text-[var(--color-muted)] text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                    {experience.stats.team && (
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[var(--color-muted)]">
                            <HugeiconsIcon icon={UserGroup02Icon} size={14} className="text-[var(--color-primary)] sm:w-4 sm:h-4" />
                            <span>{experience.stats.team}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[var(--color-muted)]">
                        <HugeiconsIcon icon={Clock01Icon} size={14} className="text-[var(--color-primary)] sm:w-4 sm:h-4" />
                        <span>{experience.stats.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[var(--color-muted)]">
                        <HugeiconsIcon icon={Calendar03Icon} size={14} className="text-[var(--color-primary)] sm:w-4 sm:h-4" />
                        <span>{experience.stats.guests}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


function StatItem({ number, label }: { number: string; label: string }) {
    return (
        <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--color-primary)] mb-1">{number}</p>
            <p className="text-[var(--color-muted)] text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">{label}</p>
        </div>
    )
}


function GalleryImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden rounded-lg sm:rounded-xl group ${className}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ minHeight: '120px' }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
        </div>
    )
}
