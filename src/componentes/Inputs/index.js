import styles from './Input.module.scss'

export default function Input({ placeholder, value, type, onChange, maxLength }) {
    return (
        <input 
            className={styles.input}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={onChange}
            maxLength={maxLength}
        ></input>
    )
}