import Container from "../../componentes/Container";
import Titulo from "../../componentes/Titulo";
import styles from './Bazar.module.scss'
import { BsCart4 } from 'react-icons/bs'
import { BsBagHeart } from 'react-icons/bs'
import Subtitulo from "../../componentes/Subtitulo";
import { useContext } from "react";
import { UsuarioContext } from "../../common/context/Usuario";
import bazar from './bazar.json'
import Produtos from "../../componentes/Produtos";
import { useNavigate } from "react-router-dom";

export default function Bazar() {
    const {nome, saldo = 0} = useContext(UsuarioContext)
    const navigate = useNavigate()
    
    return (
        <Container>
            <section className={styles.feira}>
                <div className={styles.carrinho}>
                    <BsBagHeart
                        onClick={() => navigate('/favoritos')}
                        size={25} 
                        color="#4b4b4b"
                    />
                    <BsCart4 
                        onClick={() => navigate('/carrinho')}
                        size={25} 
                        color="#4b4b4b"
                    />
                </div>
                <div className={styles.informacoes}>
                    <Titulo>Olá, {nome}!</Titulo>
                    <Titulo>Saldo: R${saldo.toFixed(2)}</Titulo>
                </div>
                <div className={styles.produtos}>
                    <Subtitulo>Produtos:</Subtitulo>
                    {bazar.map(produto => (
                        <Produtos 
                            {...produto}    
                            key={produto.id}
                        />
                    ))}
                </div>
            </section>
        </Container>
    )
}