import { useFavoritoContext } from "../../common/context/Favoritos"
import Container from "../../componentes/Container"
import Produtos from "../../componentes/Produtos"
import Titulo from "../../componentes/Titulo"
import styles from "./Favoritos.module.scss"

export default function Favoritos() {
    const { favorito } = useFavoritoContext()

    return (
        <Container>
            <Titulo> Favoritos </Titulo>
            <section className={styles.favoritos}>
                {favorito.map((fav) => {
                    return <Produtos {...fav} key={fav.id}/>
                })}
            </section>
        </Container>
    )
}