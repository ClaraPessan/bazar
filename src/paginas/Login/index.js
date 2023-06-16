import Botao from "../../componentes/Botao";
import Input from "../../componentes/Inputs";
import Subtitulo from "../../componentes/Subtitulo";
import Titulo from "../../componentes/Titulo";
import Container from "../../componentes/Container";
import styles from './Login.module.scss'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../../common/context/Usuario";

export default function Login() {
    const navigate = useNavigate()
    const {nome, setNome, saldo, setSaldo} = useContext(UsuarioContext)

    return (
        <Container>
            <div className={styles.titulos}>
                <Titulo>Bem vindo ao nosso mini-bazar!</Titulo>
                <Subtitulo>Digite seu nome e seu saldo:</Subtitulo>
            </div>
            <div className={styles.dados}>
                <Input 
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Nome:" 
                    type="text"
                    maxLength={12}
                />
                <Input 
                    value={saldo}
                    onChange={(event) => setSaldo(Number(event.target.value))}
                    type="number"
                />
                <Botao 
                    onClick={() => navigate('/bazar')}
                > 
                    Continuar
                </Botao>
            </div>
        </Container>
    )

}