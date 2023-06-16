import { usePagamento } from "../../common/context/Pagamento";
import { useContext, useMemo } from "react";
import { useCarrinhoContext } from "../../common/context/Carrinho";
import { UsuarioContext } from "../../common/context/Usuario";
import Subtitulo from "../Subtitulo";
import styles from './FormaPagamento.module.scss'

export default function FormaPagamento() {
    const {  valorTotal = 0 } = useCarrinhoContext();
    const { saldo = 0 } = useContext(UsuarioContext);
    const total = useMemo(() => saldo - valorTotal, [saldo, valorTotal])
    const { formaPagamento, mudarFormaPagamento, tiposPagamento } = usePagamento();
    return (
        <section className={styles.pagamentos}>
            <div className={styles.pagamentos__forma}>
                <label htmlFor="formaPagamento">Forma de Pagamento:</label>
                <select
                    id="formaPagamento"
                    value={formaPagamento.id}
                    onChange={(event) => mudarFormaPagamento(event.target.value)}
                >
                    {tiposPagamento.map((pagamento) => (
                        <option 
                            key={pagamento.id} 
                            value={pagamento.id}
                        >
                            {pagamento.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.pagamentos__valores}>
                <Subtitulo>
                    Total: 
                    <strong> R$ {valorTotal.toFixed(2)}</strong>
                </Subtitulo>
                <Subtitulo>
                    Saldo Restante: 
                    <strong> R$ {total.toFixed(2)}</strong>
                    </Subtitulo>
                <Subtitulo>
                    Saldo Inicial:
                    <strong> R$ {saldo.toFixed(2)}</strong>
                </Subtitulo>
            </div>
        </section>
    )
}
