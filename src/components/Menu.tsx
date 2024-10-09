import Link from "next/link";

export default function Menu(){

    return(
        <nav className="flex">
            <ul className="flex gap-6 links">
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/produtos'}>Produtos</Link></li>
                <li><Link href={'/produtos/cad-produtos'}>Cadastro de Produtos</Link></li>
            </ul>
        </nav>
    )
}

