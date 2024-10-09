"use client"
import { TipoProduto } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function CadastroProdutos(){

    const navigate =  useRouter()

    const [produto, setProduto] = useState<TipoProduto>({
        // cria objeto fake
        id:0,
        nome: '',
        preco: 0,
        estoque:0
    })

    // evento para pegar as informacoes digitadas no campo de forma dinamica
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setProduto({...produto, [name]:value})
    }

    // evento que envia dados capturados para o banco de dados
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const cabecalho = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        }

        try{
            const response = await fetch("http://localhost:3000/api/base-produtos", cabecalho)

            if(response.ok){
                alert(`${produto.nome} cadastrado com sucesso`)
                setProduto({
                    id: 0,
                    nome: '',
                    preco:0,
                    estoque: 0
                })
                navigate.push("/produtos")
            }else{
                alert("Erro ao cadastrar")
            }
        }catch(error){
            console.error("Erro ao cadastrar produto: ", error)
        }
    }

    return(
        <main>
            <h1>Cadastro de Produtos</h1>
            <p>Aqui inserimos um novo produtos assim que ele chega na loja.</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idnome">Nome: </label>
                    <input type="text" name="nome" id="idnome"
                    onChange={handleChange} value={produto.nome} />
                </div>
                <div>
                    <label htmlFor="idpreco">Preço: R$</label>
                    <input type="number" step={'0.01'} name="preco" id="idpreco"
                    onChange={handleChange} value={produto.preco} />
                </div>
                <div>
                    <label htmlFor="idestoque">Estoque: </label>
                    <input type="number" name="estoque" id="idestoque"
                    onChange={handleChange} value={produto.estoque} />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </main>
    )
}