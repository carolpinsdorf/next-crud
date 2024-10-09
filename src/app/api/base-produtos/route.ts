
import { TipoProduto } from "@/types";
import { promises as fs} from "fs";
import { NextResponse } from "next/server";

export async function GET(){
    
    // le o banco de dados
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');

    // transforma os elementos em json
    const produtos = JSON.parse(file);

    return NextResponse.json(produtos);

}

export async function POST(request:Request){

    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    
    const data =  JSON.parse(file);

    // pega os dados que o cliente passa e transforma em json
    const {nome, preco, estoque} = await request.json()
    // transforma o json em um objeto
    const produto = {nome, preco,estoque} as TipoProduto

    // fake cria um id
    produto.id = Number(Date.now())

    // insere no banco
    data.push(produto)
    const json = JSON.stringify(data)
    await fs.writeFile(process.cwd()+'/src/data/base.json', json)

    return NextResponse.json(produto)

}