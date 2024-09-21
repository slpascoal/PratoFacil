import { useEffect } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';

const ListaRestaurantes = () => {

  const restaurantes: IRestaurante[] = [
    {
      id: 1,
      nome: "Lyllys Cafe",
      pratos: [
        {
          id: 1,
          descricao: 'Lasanha à Bolonhesa',
          imagem: 'https://static.itdg.com.br/images/360-240/ec2a5e38702c60bf1ace0b5f1c8e9415/shutterstock-739787011.jpg',
          nome: 'Lasanha',
          restaurante: 1,
          tag: 'Italiana'
        },
        {
          id: 2,
          descricao: 'Strogonoff de Frango à brasileira',
          imagem: 'https://static.itdg.com.br/images/360-240/7e781068a839f15cdf1c85f18b3ea9d6/332854-original-1-1-.jpg',
          nome: 'Strogonoff',
          restaurante: 1,
          tag: 'Russa'
        },
        {
          id: 3,
          descricao: 'Empadão de Frango',
          imagem: 'https://static.itdg.com.br/images/360-240/8542e00db2cd0f6761670765607e6255/shutterstock-2048280131-1-.jpg',
          nome: 'Empadão de Frango',
          restaurante: 1,
          tag: 'Portuguesa'
        }
      ]
    },
    {
      id: 2,
      nome: "Sugiro Sushi",
      pratos: [
        {
          id: 1,
          descricao: 'Combinado de 8 peças',
          imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg',
          nome: 'Sushi',
          restaurante: 1,
          tag: 'Japonesa'
        },
        {
          id: 2,
          descricao: 'Sashimi de Salmão',
          imagem: 'https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2009/04/sashimi_facil.jpg',
          nome: 'Sashimi',
          restaurante: 1,
          tag: 'Japonesa'
        }
      ]
    },
    {
      id: 3,
      nome: "Cantina da Escola",
      pratos: [
        {
          id: 1,
          descricao: 'Salgado de queijo com presunto',
          imagem: 'data:image/jpeg;base64,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',
          nome: 'Quejunto',
          restaurante: 1,
          tag: 'Lanche'
        },
        {
          id: 2,
          descricao: 'Coxinha de Frango',
          imagem: 'https://t1.rg.ltmcdn.com/pt/posts/1/9/1/coxinha_simples_191_600.jpg',
          nome: 'Coxinha',
          restaurante: 1,
          tag: 'Lanche'
        },
        {
          id: 3,
          descricao: 'Risole de Palmito',
          imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfjtOFJZ5O4Ex-N6pDR0VmBo1F4Iw5GftDw&s',
          nome: 'Risole',
          restaurante: 1,
          tag: 'Lanche'
        }
      ]
    }
  ]

  useEffect(() => {
    // obter restaurantes
    axios.get('http://localhost:8000/api/v1/restaurantes/')
    .then(resposta => {
      console.log(resposta)
    })
    .catch(erro => {
      console.log(erro)
    })
  },[])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
  </section>)
}

export default ListaRestaurantes