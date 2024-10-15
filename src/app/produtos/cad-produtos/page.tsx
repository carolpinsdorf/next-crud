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
        <main className="grow p-5">
            <h1 className="text-3xl text-center font-bold mb-2 text-indigo-600">Cadastro de Produtos</h1>
            <p className="text-xl text center font-bold mb-4">Aqui inserimos um novo produtos assim que ele chega na loja.</p>
            
            <form className="w-1/3 m-auto border border-indigo-950 p-2 rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col p2">
                    <label className="text-gray-700" htmlFor="idnome">Nome: </label>
                    <input className=" border gray-700 p-1 rounded-md" type="text" name="nome" id="idnome"
                    onChange={handleChange} value={produto.nome} />
                </div>
                <div className="flex flex-col p2">
                    <label className="text-gray-700"  htmlFor="idpreco">Preço: R$</label>
                    <input className=" border gray-700 p-1 rounded-md" type="number" step={'0.01'} name="preco" id="idpreco"
                    onChange={handleChange} value={produto.preco} />
                </div>
                <div className="flex flex-col p2">
                    <label className="text-gray-700" htmlFor="idestoque">Estoque: </label>
                    <input className=" border gray-700 p-1 rounded-md" type="number" name="estoque" id="idestoque"
                    onChange={handleChange} value={produto.estoque} />
                </div>
                <button className="bg-green-700 text-white text-xl p-2 rounded-md block ms-auto me-2"  type="submit">Cadastrar</button>
            </form>
        </main>
    )
}