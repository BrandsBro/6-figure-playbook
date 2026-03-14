import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        Brands<span>Bro</span>
      </div>
      <div className={styles.copy}>
        © {new Date().getFullYear()} BrandsBro. All rights reserved.
      </div>
    </footer>
  )
}
