import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { UsuarioContext } from "./Usuario";
import { usePagamento } from "./Pagamento";

const CarrinhoContext = createContext()
CarrinhoContext.displayName = "Carrinho"

export default function Carrinho({ children }) {
    const [carrinho, setCarrinho] = useState([])
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                setCarrinho,
                quantidadeCarrinho,
                setQuantidadeCarrinho,
                valorTotal,
                setValorTotal
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}

export function useCarrinhoContext() {
    const {
        carrinho,
        setCarrinho,
        quantidadeCarrinho,
        setQuantidadeCarrinho,
        valorTotal,
        setValorTotal
    } = useContext(CarrinhoContext)
    
    const { saldo, setSaldo } = useContext(UsuarioContext)
    const saldoRestante = useMemo(() => saldo - valorTotal, [saldo, valorTotal])
    const { formaPagamento } = usePagamento()

    const mudarQuantidade = (id, quantidade) => carrinho.map(item => {
        if (item.id === id) item.quantidade += quantidade
        return item;
    })

    function adicionarProduto(novoProduto) {
        const temOProduto = carrinho.some(item => item.id === novoProduto.id)
        let novoCarrinho = [...carrinho]

        if(!temOProduto) {
            novoProduto.quantidade = 1
            novoCarrinho.push(novoProduto)
            return setCarrinho(novoCarrinho)
        }
        novoCarrinho = mudarQuantidade(novoProduto.id, 1)
        setCarrinho(novoCarrinho)
    }


    function removerProduto(id) {
        const produto = carrinho.find(item => item.id === id);
        const ultimoItemDoCarrinho = produto.quantidade === 1

        let novoCarrinho
        if (ultimoItemDoCarrinho) { 
            novoCarrinho = carrinho.filter(item => item.id !== id)
            return setCarrinho(novoCarrinho)
        }
        novoCarrinho = mudarQuantidade(id, -1)
        setCarrinho(novoCarrinho)
    }

    function comprar() {
        setCarrinho([])
        setSaldo(saldo - valorTotal)
        alert("Compra feita com sucesso!")
    }

    function verificaSaldo() {
        if (saldoRestante < 0) {
            alert('Você não pode fazer uma compra com o saldo negativo. Por favor elimine algum item ou mude a forma de pagamento.')
        } else {
            comprar()
        }
    }

    useEffect(() => {
        let { novaQuantidade, novoTotal } = carrinho.reduce((contador, novoItem) => ({
            novaQuantidade: contador.novaQuantidade + novoItem.quantidade,
            novoTotal: contador.novoTotal + (novoItem.valor * novoItem.quantidade)
        }), { novaQuantidade: 0, novoTotal: 0 });
        setQuantidadeCarrinho(novaQuantidade)
        setValorTotal(novoTotal * formaPagamento.juros)
    }, [carrinho, formaPagamento, setQuantidadeCarrinho, setValorTotal])

    return {
        carrinho,
        adicionarProduto,
        removerProduto,
        quantidadeCarrinho,
        valorTotal,
        verificaSaldo
    }
}