import styles from './Botao.module.scss'

export default function Botao({ children, disabled, onClick, onChange }) {
    return (
        <button 
            className={styles.botao}
            disabled={disabled}
            onClick={onClick}
            onChange={onChange}
        >{children}</button>
    )
}