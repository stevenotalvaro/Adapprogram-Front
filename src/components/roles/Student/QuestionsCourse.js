import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { fetchSinToken } from '../../../helpers/fetch'
import { useFetch } from '../../../hooks/useFetch'
import { useForm } from '../../../hooks/useForm'
import { AnswerQuestion } from './AnswerQuestion'

export const QuestionsCourse = ({url}) => {
    console.log(url)
    const {loading, data} = useFetch(url)

    const [answerOne, setAnswerOne] = useState('')
    const [answerTwo, setAnswerTwo] = useState('')
    const [answerThree, setAnswerThree] = useState('')
    const [answerFour, setAnswerFour] = useState('')
    const [answerFive, setAnswerFive] = useState('')
    const [answerSix, setAnswerSix] = useState('')
    const [answerSeven, setAnswerSeven] = useState('')
    const [answerEight, setAnswerEight] = useState('')
    
    const [formValues, handleInputChange] = useForm({
        op1: 0,
        op2: 0,
        op3: 0,
        op4: 0,
        op5: 0,
        op6: 0,
        op7: 0,
        op8: 0,
    })

    const {op1, op2, op3, op4, op5, op6, op7 , op8 } = formValues

    const handleSendQuestions = async (e) => {
        e.preventDefault();


        if(url.includes('/variables')) {
            console.log(+op1, +op2, +op3)
            console.log(isValid())
            const dataRes = [
                {
                    respuesta: +op1
                },
                {
                    respuesta: +op2
                },
                {
                    respuesta: +op3
                },
                {
                    respuesta: +op4
                },
                {
                    respuesta: +op5
                },
                {
                    respuesta: +op6
                },
                {
                    respuesta: +op7
                },
                {
                    respuesta: +op8
                },
            ]
            if(isValid()) {
                setAnswerOne((await fetchSinToken('http://127.0.0.1:5000/question/variables/1', dataRes[0], 'POST')))
                setAnswerTwo((await fetchSinToken('http://127.0.0.1:5000/question/variables/2', dataRes[1], 'POST')))
                setAnswerThree((await fetchSinToken('http://127.0.0.1:5000/question/variables/3', dataRes[2], 'POST')))

                const Toast = Swal.mixin({
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Bien hecho, Revisa tus respuestas',
                  })
            }
        }

    }

    const isValid = () => {
        if(url.includes('/variables')) {
            if((+op1 &&  +op2 && +op3) >= 1 && (+op1 &&  +op2 && +op3) <= 5 ) {
                console.log('true')
                return true
            }

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Debes seleccioanar todas las respuestas',
                showConfirmButton: false,
                timer: 2500
            })
            return false
            
        }
    }

    console.log(answerOne, answerTwo, answerThree)

  return (
    <div className='questions'>
        <h1>Preguntas</h1>

        {
             loading ?
             (
                 <CircularProgress color="primary" />
             ) :
                <form onSubmit={handleSendQuestions} className='questions__form'>
                    {(data.map((son, i) => { 
                        return ( <>
                                
                                <h2> pregunta #{i+1} {son.question}</h2>
                                {son.option.map((sonquestion => {
                                    return (
                                            <p>{sonquestion}</p>
                                    )
                                }))}

                                    {
                                    ( i+1 === 1 )
                                                ? (<><select
                                                        type='number'
                                                        onChange={handleInputChange}
                                                        className='auth__input-value input-select'
                                                        autoComplete='off'
                                                        value={op1}
                                                        name="op1"
                                                    >
                                                        <option  value={0}>Selecciona tu respuesta</option>
                                                        <option  value={1}>1</option>
                                                        <option  value={2}>2</option>
                                                        <option  value={3}>3</option>
                                                        <option  value={4}>4</option>
                                                    </select>

                                                        {
                                                            answerOne != '' ? <AnswerQuestion petition={answerOne} /> : ''
                                                        }
                                                        </>
                                                )
                                                        


                                                : ( i+1 === 2 ) 
                                                    ? (<>
                                                        <select
                                                            type='number'
                                                            onChange={handleInputChange}
                                                            className='auth__input-value input-select'
                                                            autoComplete='off'
                                                            value={op2}
                                                            name="op2"
                                                        >
                                                            <option  value={0}>Selecciona tu respuesta</option>
                                                            <option  value={1}>1</option>
                                                            <option  value={2}>2</option>
                                                            <option  value={3}>3</option>
                                                            <option  value={4}>4</option>
                                                        </select>

                                                        {
                                                            answerTwo != '' ? <AnswerQuestion petition={answerTwo} /> : ''
                                                        }
                                                        </>
                                                        )
                                                : ( i+1 === 3 ) 
                                                    ? (<><select
                                                            type='number'
                                                            onChange={handleInputChange}
                                                            className='auth__input-value input-select'
                                                            autoComplete='off'
                                                            value={op3}
                                                            name="op3"
                                                        >
                                                            <option  value={0}>Selecciona tu respuesta</option>
                                                            <option  value={1}>1</option>
                                                            <option  value={2}>2</option>
                                                            <option  value={3}>3</option>
                                                            <option  value={4}>4</option>
                                                        </select>

                                                        {
                                                            answerThree != '' ? <AnswerQuestion petition={answerThree} /> : ''
                                                        }
                                                        </>
                                                        )
                                                    : ( i+1 === 4 ) 
                                                    ? (<select
                                                            type='number'
                                                            onChange={handleInputChange}
                                                            className='auth__input-value input-select'
                                                            autoComplete='off'
                                                            value={op4}
                                                            name="op4"
                                                        >
                                                            <option  value={0}>Selecciona tu respuesta</option>
                                                            <option  value={1}>1</option>
                                                            <option  value={2}>2</option>
                                                            <option  value={3}>3</option>
                                                            <option  value={4}>4</option>
                                                        </select>)
                                                    : ( i+1 === 5 ) 
                                                    ? (<select
                                                            type='number'
                                                            onChange={handleInputChange}
                                                            className='auth__input-value input-select'
                                                            autoComplete='off'
                                                            value={op5}
                                                            name="op5"
                                                        >
                                                            <option  value={0}>Selecciona tu respuesta</option>
                                                            <option  value={1}>1</option>
                                                            <option  value={2}>2</option>
                                                            <option  value={3}>3</option>
                                                            <option  value={4}>4</option>
                                                        </select>)
                                                    : ( i+1 === 6 ) 
                                                    ? (<select
                                                            type='number'
                                                            onChange={handleInputChange}
                                                            className='auth__input-value input-select'
                                                            autoComplete='off'
                                                            value={op6}
                                                            name="op6"
                                                        >
                                                            <option  value={0}>Selecciona tu respuesta</option>
                                                            <option  value={1}>1</option>
                                                            <option  value={2}>2</option>
                                                            <option  value={3}>3</option>
                                                            <option  value={4}>4</option>
                                                        </select>)
                                                    : ( i+1 === 7 ) 
                                                    ? (<select
                                                            type='number'
                                                            onChange={handleInputChange}
                                                            className='auth__input-value input-select'
                                                            autoComplete='off'
                                                            value={op7}
                                                            name="op7"
                                                        >
                                                            <option  value={0}>Selecciona tu respuesta</option>
                                                            <option  value={1}>1</option>
                                                            <option  value={2}>2</option>
                                                            <option  value={3}>3</option>
                                                            <option  value={4}>4</option>
                                                        </select>)
                                                    : (<select
                                                        type='number'
                                                        onChange={handleInputChange}
                                                        className='auth__input-value input-select'
                                                        autoComplete='off'
                                                        value={op8}
                                                        name="op8"
                                                    >
                                                        <option  value={0}>Selecciona tu respuesta</option>
                                                        <option  value={1}>1</option>
                                                        <option  value={2}>2</option>
                                                        <option  value={3}>3</option>
                                                        <option  value={4}>4</option>
                                                    </select>)
                                                
                                    }

                        </>
                        )
                    }))}
                    <button type='submit' className='btn btn-primary btn-block'>Enviar</button>
                </form>
        }
    </div>
  ) 
}
