import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useFetch } from '../../../hooks/useFetch';
import arrow from '../../../images/arrow.png'
import { QuestionsCourse } from './QuestionsCourse';

export const NavCourse = () => {

    const { learningStyle } = useSelector( state => state.auth.styleLearning );
    const { loading, data } = useFetch(`http://127.0.0.1:5000/video/list/${learningStyle}`)
    const [ urlPlayer, setUrlPlayer ] = useState('')
    const [ urlQuestion, setUrlQuestion ] = useState('')
    const [ viewSelected, setViewSelected ] = useState('')

    let arrayUrlQuestions = ['question/variables', 'question/estructurasdecision', 'question/estructurasiterativa', 'question/funcionesiterativas']

    useEffect(() => {
      
        let listElements = document.querySelectorAll('.list__button--click');
    
        console.log(listElements)
        
        listElements.forEach(listElement => {
            listElement.addEventListener('click', () => {
                listElements.forEach(listElement => {
                    listElement.classList.remove('arrow');
                    let menu = listElement.nextElementSibling;
                    
                    if(menu.clientHeight !== '0') {
                        menu.style.height = 0 ;
                        menu.style.visibility = 'hidden';
                    }
                    
                })

                listElement.classList.toggle('arrow')
                console.log('hola')
                let height = 0;
                let menu = listElement.nextElementSibling;
                
                if(menu.clientHeight == '0') {
                    height = menu.scrollHeight;
                    menu.style.visibility = 'visible';

                }
    
                menu.style.height = height+'px' ;
            })
        })
      
    }, [loading])
    
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
                                {console.log(son)}
                                return (<li key={i} className='list__item list__item--click'>
                                    <div className={`btn__list list__button list__button--click`}>
                                        <button className='btn__list nav__link'>{son.temas}</button>
                                        <img src={arrow} alt='Arrow icons created by Freepik - Flaticon' className='list__arrow' />
                                    </div>
                                    <ul className='list__show'>

                                        {
                                            son.contenido.map((sonconte, i) => {
                                                console.log(sonconte)
                                                return (<li key={i} className='list__inside'>
                                                    <button onClick={() => {setUrlPlayer(sonconte.url); setViewSelected(true)}} className='btn__list nav__link nav__link--inside'>{sonconte.titulo}</button>
                                                </li>)
                                            })
                                        }
                                        {/* setUrlQuestion(`http://127.0.0.1:5000/${arrayUrlQuestions[i]}`) */}
                                        <li key={i} className='list__inside'>
                                            <button onClick={() => {setUrlQuestion(`http://127.0.0.1:5000/${arrayUrlQuestions[i]}`); setViewSelected(false)}} className='btn__list nav__link nav__link--inside'>Preguntas</button>
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
