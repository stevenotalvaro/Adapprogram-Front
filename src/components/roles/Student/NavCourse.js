import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useFetch } from '../../../hooks/useFetch';
import arrow from '../../../images/arrow.png'
import { QuestionsCourse } from './QuestionsCourse';

export const NavCourse = () => {

    const { learningStyle } = useSelector( state => state.auth.styleLearning );
    const { course } = useSelector( state => state.auth );
    const { loading, data } = useFetch(`http://127.0.0.1:5000/video/list/${learningStyle}`)
    const [ urlPlayer, setUrlPlayer ] = useState('')
    const [ urlQuestion, setUrlQuestion ] = useState('')
    const [ viewSelected, setViewSelected ] = useState('')
    console.log(course)

    let arrayUrlQuestions = ['question/variables', 'question/estructurasdecision', 'question/estructurasiterativa', 'question/funcionesiterativas']

    useEffect(() => {
      
        let listElements = document.querySelectorAll('.list__button--click');
    
        listElements.forEach(listElement => {
            listElement.addEventListener('click', () => {
                listElement.classList.toggle('arrow')

                let height = 0;
                let menu = listElement.nextElementSibling;
                
                if(menu.clientHeight == '0') {
                    menu.style.display = 'block';
                    height = menu.scrollHeight;
                    menu.style.height = height+'px' ;
                    menu.style.opacity = 1 ;
                }

                if(menu.clientHeight != '0') {
                    menu.style.height = 0 ;
                    menu.style.opacity = 0 ;
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
                
            })
        })

        let buttonDisabled = document.querySelectorAll('button[disabled]')

        buttonDisabled.forEach(buttonElement => {
            buttonElement.addEventListener('click', () => {
                
            })
        })


    }, [loading])

    const handleCourse = (urlContent, content) => {

        if(!content) {
            return (Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Debes completar la seccion anterior para ver el contenido',
                showConfirmButton: false,
                timer: 2500
            }))
        }
        setUrlPlayer(urlContent); 
        setViewSelected(true)

    }

    const handleAnswer = (urlQuestion) => {
        setUrlQuestion(urlQuestion); 
        setViewSelected(false);
    }
    
  return (
    <nav className='nav'>
        {
            loading ?
                (
                    <CircularProgress color="primary" />
                ) :
                    (<ul className='list'>
                        <div className='nav__title'>
                            <div className='nav__title--text'>
                                <h1>Adapprogram: Curso para estudiantes de 1er semestre acorde a su estilo de aprendizaje.</h1>
                            </div>
                        </div>
                        
                        {
                            data.map((son, i)=> {
                                let content = i == 0  ? course[i].variables.content : i === 1 ? course[i].decisionStructures.content : i === 2 ? course[i].iterativeStructures.content : course[i].iterativeFunctions.content 
                                let requireAnswer = i === 0 ? course[i].variables.requireAnswer : i === 1 ? course[i].decisionStructures.requireAnswer : i === 2 ? course[i].iterativeStructures.requireAnswer : course[i].iterativeFunctions.requireAnswer 
                                console.log(course[0].variables.content, content)
                                
                                return (<li key={i} className='list__item list__item--click'>
                                    <div className={`btn__list list__button list__button--click`}>
                                        <button className='btn__list nav__link'>{son.temas}</button>
                                        <img src={arrow} alt='Arrow icons created by Freepik - Flaticon' className='list__arrow' />
                                    </div>
                                    <ul className='list__show'>

                                        {
                                            son.contenido.map((sonconte, i) => {
                                                console.log(content)
                                                return (<li key={i} className='list__inside'>
                                                    <button onClick={()=>{handleCourse(sonconte.url, content)}} className='btn__list nav__link nav__link--inside'>{sonconte.titulo}</button>
                                                </li>)
                                            })
                                        }
                                        <li key={i} className='list__inside'>
                                            <button disabled={!requireAnswer} onClick={() => {handleAnswer(`http://127.0.0.1:5000/${arrayUrlQuestions[i]}`)}} className='btn__list nav__link nav__link--inside'>Preguntas</button>
                                        </li>
                                    </ul>
                                </li>
                                )
                            })

                        }

                    </ul>
                    
                    )
                    
        }

        { 
            (urlPlayer && viewSelected) &&
                <div className='player'>
                    <ReactPlayer 
                        url={urlPlayer}
                        controls
                        width='70%'
                        height='70%'
                        className="player__react--player"
                    />
                </div>
        }
        {
            (urlQuestion && !viewSelected) &&
                <>
                    <QuestionsCourse url={urlQuestion} />
                </>
        }
    </nav>
  )
}
