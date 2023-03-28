import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { At, Phone, User, UserList, DotsThreeCircle, UserCircleMinus, PencilLine } from 'phosphor-react'

import Logos from './assets/logo.svg'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
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
        <form >
          <input type='text' placeholder='nome' />
          <input type='email' placeholder='email' />
          <input type='tel' placeholder='telefone' />
          <textarea placeholder='descrição' />

          <button className={styles.btnSubmit} type='submit'>Enviar</button>
        </form>
        <div className={styles.boxContatos}>
          <div  className={styles.wrapInput}>
          <UserList size={36} color='#f3f3f3'/>  <input type="text" placeholder='buscar...' />
          </div>
          <div className={styles.contatos}>
            <div className={styles.edit}> 
              <UserCircleMinus  
              size={23}
              color={userCircleMinusColor}
              onMouseOver={() => handleMouseOver('userCircleMinus')}
              onMouseOut={() => handleMouseOut('userCircleMinus')}
              alt='Remover Usuário'
               />
              <PencilLine 
              size={23}
              color={pencilLineColor}
              onMouseOver={() => handleMouseOver('pencilLine')}
              onMouseOut={() => handleMouseOut('pencilLine')}
              alt='Editar usuário'
              />
            </div>
            <p className={styles.nome}> <User size={23} color='#f3f3f3'/> Eduardo</p>
            <p className={styles.email}> <At size={23} color='#f3f3f3'/> eduardo@gmail.com </p>
            <p className={styles.telefone}> <Phone size={23} color='#f3f3f3'/> (11) 99999-9999 </p>
            <p className={styles.descricao}> <DotsThreeCircle size={23} color="#f3f3f3" /> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
        </div>
      </main>
    </>
  )
}
