import { useContext } from "react"
import { useCarrinhoContext } from "../../common/context/Carrinho"
import { UsuarioContext } from "../../common/context/Usuario"
import styles from './Produtos.module.scss'
import { MdExpandMore } from 'react-icons/md'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { useFavoritoContext } from "../../common/context/Favoritos";
import { useNavigate } from "react-router-dom"

export default function Produtos({id, nome, foto, valor, unidade, quantidadeMaxima}) { 
    const navigate = useNavigate()
    const { carrinho, adicionarProduto, removerProduto, valorTotal  } = useCarrinhoContext()
    const { saldo } = useContext(UsuarioContext)
    const itemNoCarrinho = carrinho.find(item => item.id === id)
    const { favorito, adicionarFavorito } = useFavoritoContext();
    const ehFavorito = favorito.some((fav) => fav.id === id);
    const icone = ehFavorito ? 
        <AiFillHeart
            size={22} 
            color="#7f1515"
            cursor="pointer"
        /> :
        <AiOutlineHeart 
            size={22} 
            color="#4b4b4b"
            cursor="pointer"
        /> 

    return (
        <main className={styles.produto}>
            <div className={styles.produto__principal}>
                <img src={foto} alt={nome}/>
                <h5>{nome} - R$ {valor.toFixed(2)}</h5>
            </div>

            <section className={styles.itens}>
                <div className={styles.itens__btnFavoritar}>
                    <button onClick={() => {
                        adicionarFavorito({
                            id, 
                            nome, 
                            foto, 
                            valor, 
                            unidade, 
                            quantidadeMaxima
                        })
                    }}> 
                        {icone}
                    </button>
                </div>

                <div className={styles.itens__qtdItens}>
                    <button 
                        className={styles.diminuir}
                        disabled={!itemNoCarrinho || itemNoCarrinho.quantidade === 0}
                        onClick={() => removerProduto(id)}
                    > 
                        -
                    </button>
                        {itemNoCarrinho?.quantidade || 0}
                    <button 
                        className={styles.aumentar}
                        disabled={
                            saldo < valor || 
                            saldo < valorTotal || 
                            itemNoCarrinho?.quantidade >= quantidadeMaxima
                        }
                        onClick={() => adicionarProduto({
                            id,
                            nome,
                            foto,
                            valor,
                            unidade,
                        })}
                    >
                        +
                    </button>
                </div>

                <div onClick={() => navigate(`/produto/${id}`)}>
                    <MdExpandMore
                        size={25}
                        color="#4b4b4b"
                        cursor="pointer"
                    />
                </div>
            </section>
        </main>
    )
}