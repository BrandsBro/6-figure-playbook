"use client";
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#problem',    label: 'The Problem' },
    { href: '#cart',       label: 'Cart' },
    { href: '#checkout',   label: 'Checkout' },
    { href: '#yes-ladder', label: 'Upsells' },
    { href: '#testing',    label: 'Testing' },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        Brands<span>Bro</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#cta" className={styles.ctaLink} onClick={() => setMenuOpen(false)}>
            Book a Call
          </a>
        </li>
      </ul>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.rotateTop : ''} />
        <span className={menuOpen ? styles.hide : ''} />
        <span className={menuOpen ? styles.rotateBottom : ''} />
      </button>
    </nav>
  )
}
