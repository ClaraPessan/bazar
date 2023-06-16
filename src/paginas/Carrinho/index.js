import Container from "../../componentes/Container"
import Titulo from "../../componentes/Titulo"
import Botao from "../../componentes/Botao"
import styles from './Carrinho.module.scss'
import { useCarrinhoContext } from "../../common/context/Carrinho"
import { useContext, useMemo } from "react"
import { UsuarioContext } from "../../common/context/Usuario"
import Produtos from "../../componentes/Produtos"
import FormaPagamento from "../../componentes/FormaPagamento"

export default function Carrinho() {
    const { carrinho, quantidadeCarrinho, verificaSaldo, valorTotal = 0} = useCarrinhoContext()
    const { saldo = 0 } = useContext(UsuarioContext)
    const saldoRestante = useMemo(() => saldo - valorTotal, [saldo, valorTotal])
    return (
        <Container>
            <Titulo>Carrinho</Titulo>
            <section className={styles.carrinho}>
                {carrinho.map((produto) => (
                    <Produtos
                        {...produto}
                        key={produto.id}
                    />
                ))}
            </section>
                <FormaPagamento/>
                <Botao
                    onClick={() => {
                        verificaSaldo(saldoRestante)
                    }}
                    disabled={quantidadeCarrinho === 0}
                >
                    Comprar
                </Botao>
        </Container>
    )
}