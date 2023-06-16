import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./paginas/Login";
import Bazar from "./paginas/Bazar";
import UsuarioProvider from "./common/context/Usuario";
import { PagamentoProvider } from "./common/context/Pagamento";
import CarrinhoProvider from "./common/context/Carrinho";
import Carrinho from "./paginas/Carrinho";
import FavoritosProvider from "./common/context/Favoritos";
import Favoritos from "./paginas/Favoritos";
import Produto from "./paginas/Produto";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <UsuarioProvider>
                <CarrinhoProvider>
                    <FavoritosProvider>
                        <PagamentoProvider>
                            <Routes>   
                                <Route path="/" element={<Login/>}/>
                                <Route path="/bazar" element={<Bazar/>}/>
                                <Route path="/favoritos" element={<Favoritos/>}/>
                                <Route path="/carrinho" element={<Carrinho/>}/>
                                <Route path="/produto/:id" element={<Produto/>}/>
                            </Routes>
                        </PagamentoProvider>
                    </FavoritosProvider>
                </CarrinhoProvider>
            </UsuarioProvider>
        </BrowserRouter>
    )
}