import Container from '../../componentes/Container';
import bazar from '../Bazar/bazar.json'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Produto.module.scss'
import Titulo from '../../componentes/Titulo';
import Subtitulo from '../../componentes/Subtitulo';
import Botao from '../../componentes/Botao'

export default function Produto() {
    const { id } = useParams();
    const produto = bazar.find(item => item.id === id);
    const navigate = useNavigate()

    return (
        <Container>
            <section className={styles.produto}>
                <Titulo>{produto.nome}</Titulo>
                <img src={produto.foto} alt={produto.nome}/>

                <div className={styles.produto__informacoes}>
                    <div className={styles.produto__informacao}>
                        <Subtitulo>Valor: </Subtitulo>
                        <p className={styles.descricao}>
                            {produto.valor.toFixed(2)}
                        </p>
                    </div>

                    <div className={styles.produto__informacao}>
                        <Subtitulo>Descrição: </Subtitulo>
                        <p className={styles.descricao}>
                            {produto.descricao}
                        </p>
                    </div>
                    
                    <div className={styles.produto__informacao}>
                        <Subtitulo>Tamanho: </Subtitulo>
                        <p className={styles.descricao}>
                            {produto.tamanho}
                        </p>
                    </div>
                    
                    <div className={styles.produto__informacao}>
                        <Subtitulo>Quantidade máxima: </Subtitulo>
                        <p className={styles.descricao}>
                            {produto.quantidadeMaxima}
                        </p>
                    </div>
                </div>
                <Botao
                    onClick={() => navigate('/bazar')}
                >Ir comprar</Botao>
            </section>
        </Container>
    );
}
