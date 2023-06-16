import styles from './Subtitulo.module.scss'

export default function Subtitulo({ children }) {
    return (
        <p className={styles.subtitulo}>{children}</p>
    )
}