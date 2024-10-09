import Menu from './Menu'

export default function Cabecalho(){
    return(
        <header className='bg-indigo-600 min-h-20 p-5 flex justify-evenly items-center'>
            <h1 className='text-4xl text-white'>FIAP - Eletro</h1>
             <Menu/>
        </header>
    )
}

