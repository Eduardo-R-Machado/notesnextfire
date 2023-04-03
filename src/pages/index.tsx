import { FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { At, Phone, User, UserList, DotsThreeCircle, UserCircleMinus, PencilLine } from 'phosphor-react'

import { database } from '../../services/firebase'

import Logos from './assets/logo.svg'

type Contato = {
  key: string,
  nome: string,
  email: string,
  telefone: string,
  descricao: string
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [descricao, setDescricao] = useState('')

  const [contatos, setContatos] = useState<Contato[]>([])

  const [busca, setBusca] = useState<Contato[]>([])
  const [search, setSearch] = useState(false)

  useEffect(() => {
    const refContatos = database.ref('contatos');

    refContatos.on('value', snapshot => {
      const resultadoContatos = Object.entries<Contato>(snapshot.val() ?? {}).map(([key, value]) => {
        return {
          'key': key,
          'nome': value.nome,
          'email': value.email,
          'telefone': value.telefone,
          'descricao': value.descricao
        }
      })
      setContatos(resultadoContatos)
    })

  }, [])

  function saveContact(event: React.FormEvent) {
    event.preventDefault()

    const dados = {
      nome,
      email,
      telefone,
      descricao
    }
    const ref = database.ref('contatos')
    ref.push(dados)

    setNome('')
    setEmail('')
    setTelefone('')
    setDescricao('')
  }

  function searchUser(event: FormEvent) {
    const keyword = event.target.value

    if (keyword.length > 0) {
      setSearch(true)
      const data = new Array

      contatos?.map(contato => {
        const regra = new RegExp(event.target.value, "gi")
        if (regra.test(contato.email) || regra.test(contato.nome) || regra.test(contato.telefone) || regra.test(contato.descricao)) {  
          data.push(contato)
        }
      })
      setBusca(data);
    } else {
      setSearch(false)
    }

  }

  function deleteUser(key: string) {
    const ref = database.ref(`contatos/${key}`)
    ref.remove()
  }

  function editUser(contato: Contato) {
    setNome(contato.nome)
    setEmail(contato.email)
    setTelefone(contato.telefone)
    setDescricao(contato.descricao)
  }

  const [iconHover, setIconHover] = useState({
    userCircleMinus: false,
    pencilLine: false,
  });

  const handleMouseOver = (iconName: string) => {
    setIconHover((prevState) => ({
      ...prevState,
      [iconName]: true,
    }));
  };

  const handleMouseOut = (iconName: string) => {
    setIconHover((prevState) => ({
      ...prevState,
      [iconName]: false,
    }));
  };

  const userCircleMinusColor = iconHover.userCircleMinus ? '#dd4b4b' : '#7889d4';
  const pencilLineColor = iconHover.pencilLine ? '#dd4b4b' : '#7889d4';
  return (
    <>
      <div className={styles.wrapLogo}>
        <Image className={styles.notes} src={Logos} alt='logo' width={100} height={100} />
      </div>

      <main className={styles.main}>
        <form onSubmit={saveContact} >
          <input type='text' value={nome} onChange={event => setNome(event.target.value)} placeholder='nome' />
          <input type='email' value={email} onChange={event => setEmail(event.target.value)} placeholder='email' />
          <input type='tel' value={telefone} onChange={event => setTelefone(event.target.value)} placeholder='telefone' />
          <textarea value={descricao} onChange={event => setDescricao(event.target.value)} placeholder='descrição' />

          <button className={styles.btnSubmit} type='submit'>Enviar</button>
        </form>
        <div className={styles.boxContatos}>
          <div className={styles.wrapInput}>
            <UserList size={36} color='#f3f3f3' />  <input onChange={searchUser} type="text" placeholder='buscar...' />
          </div>

          <div className={styles.contatos}>
            {search ?
             busca?.map(contato => {
              return (
                <div key={contato.key}>
                  <div className={styles.edit}>
                  <UserCircleMinus
                    onClick={() => removeUser(contato)}
                    size={23}
                    color={userCircleMinusColor}
                    onMouseOver={() => handleMouseOver('userCircleMinus')}
                    onMouseOut={() => handleMouseOut('userCircleMinus')}
                    alt={'Remover Usuário'}
                  />
                  <PencilLine
                    size={23}
                    color={pencilLineColor}
                    onMouseOver={() => handleMouseOver('pencilLine')}
                    onMouseOut={() => handleMouseOut('pencilLine')}
                    alt={'Editar Usuário'}
                    onClick={() => editUser(contato)}
                  />
    </div>
                  <p className={styles.nome}> <User size={23} color='#f3f3f3' />{contato.nome}</p>
                  <p className={styles.email}> <At size={23} color='#f3f3f3' />{contato.email}</p>
                  <p className={styles.telefone}> <Phone size={23} color='#f3f3f3' />{contato.telefone} </p>
                  <p className={styles.descricao}> <DotsThreeCircle size={23} color="#f3f3f3" /> {contato.descricao} </p>
                </div>
              )
            }
            )
             :  contatos.map(contato => {
                return (
                  <div key={contato.key}>
                    <p className={styles.nome}> <User size={23} color='#f3f3f3' />{contato.nome}</p>
                    <p className={styles.email}> <At size={23} color='#f3f3f3' />{contato.email}</p>
                    <p className={styles.telefone}> <Phone size={23} color='#f3f3f3' />{contato.telefone} </p>
                    <p className={styles.descricao}> <DotsThreeCircle size={23} color="#f3f3f3" /> {contato.descricao} </p>
                  </div>
                )
              }
              )
            }
          </div>

        </div>
      </main>
    </>
  )
}
