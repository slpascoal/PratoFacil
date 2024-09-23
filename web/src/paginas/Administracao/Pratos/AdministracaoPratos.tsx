import { useEffect, useState } from "react"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
    }, [])

    const excluir = (pratoAhSerExcluido: IPrato) => {
        http.delete<IPrato[]>(`pratos/${pratoAhSerExcluido.id}/`)
        .then(() => {
            const listaPrato = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
            setPratos([...listaPrato])
        })
        .catch((error) => console.log(error))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Descrição
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.descricao.slice(0, 40)}...
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">ver mais</a>
                            </TableCell>
                            <TableCell>
                                <Button>
                                    <Link to={`/admin/pratos/${prato.id}`}>
                                        [ Editar ]
                                    </Link>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos