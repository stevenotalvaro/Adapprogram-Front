import React from 'react'

export const AnswerQuestion = ({petition}) => {

  const {answer, validation} = petition

  return (
    <div className={`answer__container ${validation ? 'correct' : 'incorrect'}`}>
        {
           validation ? <p className="answer__container--info"><img src="https://cdn-icons-png.flaticon.com/512/2550/2550322.png" width="36px" height="36px" alt="Correcto iconos creados por Aldo Cervantes - Flaticon" title="" class="img-small" /> Respuesta correcta</p> : <p className="answer__container--info"><img src="https://cdn-icons-png.flaticon.com/512/2550/2550327.png" width="36px" height="36px" alt="Negativo iconos creados por Aldo Cervantes - Flaticon" title=""/> Respuesta Incorrecta, {answer} </p>
        }
    </div>
  )
}
