import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/CharanBS18' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/charan-b-s-25a70b35a/' },
  { label: 'Twitter', href: 'https://twitter.com/CharanBS114' },
  { label: 'Instagram', href: 'https://www.instagram.com/charan._._25' },
  { label: 'Discord', href: 'https://discord.com/users/charan00002' },
] as const;

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4';

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

function VaultLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      overflow="visible"
      viewBox="0 0 256 256"
      aria-hidden="true"
    >
      <path
        d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z"
        fill="#2c3440"
      />
    </svg>
  );
}

export default function VaultShieldHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <section
      className="relative w-full min-h-screen font-body text-[#2c3440]"
      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="relative z-10 flex min-h-screen flex-col">
        <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <a href="#" className="inline-flex shrink-0 items-center gap-3" aria-label="CHARAN.BS home">
            <VaultLogo />
            <span
              className="hidden text-sm font-semibold tracking-tight text-[#2c3440] sm:inline"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              CHARAN.BS
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#2c3440] opacity-80 transition hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden text-sm font-medium text-[#2c3440] opacity-80 md:block">
            ù 2026
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} color="#2c3440" /> : <Menu size={24} color="#2c3440" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close menu backdrop"
                className="fixed inset-0 z-40 md:hidden"
                style={{
                  background: 'rgba(25,40,55,0.35)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
              />

              <motion.aside
                className="fixed right-0 top-0 z-50 flex h-[100dvh] flex-col md:hidden"
                style={{
                  width: 'min(88vw, 360px)',
                  background: '#e8e6e0',
                  boxShadow: '-12px 0 48px rgba(25,40,55,0.18)',
                }}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between px-6 py-5">
                  <div className="flex items-center gap-3">
                    <VaultLogo />
                    <span
                      className="text-sm font-semibold tracking-tight text-[#2c3440]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      CHARAN.BS
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex rounded-lg p-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X size={22} color="#2c3440" />
                  </button>
                </div>

                <div className="mx-6 h-px bg-[#2c3440]/15" />

                <nav className="flex flex-1 flex-col gap-1 px-6 py-6">
                  {SOCIAL_LINKS.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg px-2 py-3 text-base font-medium text-[#2c3440] opacity-90 transition hover:opacity-100"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.18 + i * 0.07,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="px-6 pb-8">
                  <p className="text-sm font-medium text-[#2c3440] opacity-70">
                    ù 2026. Built for the future.
                  </p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div
          className="mx-auto w-full max-w-[1280px] px-5 sm:px-8"
          style={{ paddingTop: 'clamp(40px, 8vw, 72px)' }}
        >
          <div className="max-w-[560px]">
            <motion.h1
              className="mb-6 text-[#2c3440]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.65rem, 5vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              CHARAN.BS
            </motion.h1>

            <motion.p
              className="mb-8 max-w-[560px] opacity-80"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                lineHeight: 1.65,
              }}
              variants={fadeUp(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              ù 2026. Built for the future.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={fadeUp(2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[110px] items-center justify-center rounded-[50px] bg-[#446e9a] px-6 py-[17px] font-semibold text-white"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    boxShadow: '0 4px 24px rgba(68,110,154,0.28)',
                  }}
                  whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.96 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
