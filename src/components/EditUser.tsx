import { useState } from 'react';
import styles from '@/styles/EditUser.module.scss';

import { UserCircleMinus, PencilLine } from 'phosphor-react'

export default function EditUser(props: any) {
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
    <div className={styles.edit}>
      <UserCircleMinus
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
      />
    </div>

  )
}