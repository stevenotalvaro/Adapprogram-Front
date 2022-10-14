import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setUpdateStyleLearning } from '../../actions/auth';
import { setTestRelized } from '../../actions/rol';
import { useForm } from '../../hooks/useForm'

export const TestScreen = () => {

    const dispatch = useDispatch();
    const { name, codigo, email, id, loadCodeTeacherString} = useSelector( state => state.auth );
    
    const [visual, setVisual] = useState(0);
    const [auditivo, setAuditivo] = useState(0);
    const [kinestesico, setKinestesico] = useState(0);
    const [learningStyle, setLearningStyle] = useState('')
    const [validation, setValidation] = useState(false)

    const [formValues, handleInputChange] = useForm({
        op1: 0,
        op2: 0,
        op3: 0,
        op4: 0,
        op5: 0,
        op6: 0,
        op7: 0,
        op8: 0,
        op9: 0,
        op10: 0,
        op11: 0,
        op12: 0,
        op13: 0,
        op14: 0,
        op15: 0,
        op16: 0,
        op17: 0,
        op18: 0,
        op19: 0,
        op20: 0,
        op21: 0,
        op22: 0,
        op23: 0,
        op24: 0,
        op25: 0,
        op26: 0,
        op27: 0,
        op28: 0,
        op29: 0,
        op30: 0,
        op31: 0,
        op32: 0,
        op33: 0,
        op34: 0,
        op35: 0,
        op36: 0,
    })

    const { op1, op2, op3, op4, op5, op6, op7, op8, op9, op10, op11, op12, op13, op14, op15, op16, op17, op18, op19, op20, op21, op22, op23, op24, op25, op26, op27, op28, op29, op30, op31, op32, op33, op34, op35, op36 } = formValues
    
    useEffect(() => {

        setVisual(+op1 + +op5 + +op9 + +op10 + +op11 + +op16 + +op17 + +op22 + +op26 + +op27 + +op32 + +op36)
        setKinestesico(+op4 + +op6 + +op7 + +op8 + +op14 + +op18 + +op21 + +op25 + +op30 + +op31 + +op34 + +op35)
        setAuditivo(+op2 + +op3 + +op12 + +op13 + +op15 + +op19 + +op20 + +op23 + +op24 + +op28 + +op29 + +op33)
        
    }, [op1, op2, op3, op4, op5, op6, op7, op8, op9, op10, op11, op12, op13, op14, op15, op16, op17, op18, op19, op20, op21, op22, op23, op24, op25, op26, op27, op28, op29, op30, op31, op32, op33, op34, op35, op36 ])
    
    if (validation) {

        return dispatch(setUpdateStyleLearning(name, codigo, email, loadCodeTeacherString, visual, auditivo, kinestesico , learningStyle, id));
    }
    
    const handleValues = (e) => {
        e.preventDefault()
        console.log(formValues, formValues.op1)
        
        dispatch(setTestRelized(true))

        for (const [key, value] of Object.entries(formValues)) {
            if ( value <= 0 || value >= 6) return (Swal.fire('Revisa tus respuestas', 'Debes contestar todas las preguntas','info'))
        }

            
        if(visual >= kinestesico) {
            if(visual >= auditivo) {
                Swal.fire('Tu estilo de aprendizaje es VISUAL.', 'Pronto serás redireccionado al curso con tu estilo de aprendizaje.','success')
                setLearningStyle('visual')
                return setValidation(true)
            } else {
                Swal.fire('Tu estilo de aprendizaje es AUDITIVO.', 'Pronto serás redireccionado al curso con tu estilo de aprendizaje.','success')
                setLearningStyle('auditivo')
                return setValidation(true)
            }
        } else  {
            if (kinestesico > auditivo) {
                setLearningStyle('kinestesico')
                Swal.fire('Tu estilo de aprendizaje es KINESTÉSICO.', 'Pronto serás redireccionado al curso con tu estilo de aprendizaje.','success')
                return setValidation(true)
            } else {
                Swal.fire('Tu estilo de aprendizaje es AUDITIVO.', 'Pronto serás redireccionado al curso con tu estilo de aprendizaje.','success')
                setLearningStyle('auditivo')
                return setValidation(true)
            }
        } 
    }
    return (
        <div className='container'>
            <h1>Test para determinar el Canal de Aprendizaje de Preferencia</h1>
            <h3>INSTRUCCIÓN: Lea cuidadosamente cada oración y piense de qué manera se aplica a usted. En cada línea escriba el número que mejor describe su reacción a cada oración.</h3>
            <div className='test__valoracion'>
                <table className="default">
                    <tbody>
                        <tr>
                            <td>5</td>
                            <td>Casi siempre</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Frecuentemente</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>A veces</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Rara vez</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Casi nunca</td>
                        </tr>
                    </tbody>
                </table>            
            </div>
            <form onSubmit={handleValues} className='test__form'>
                <div className='test__container'>

                    <div className='test__container-type'>
                        <div className='test__box'>
                            <span>1. Puedo recordar algo mejor si lo escribo</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op1}
                                    name="op1"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>2. Al leer, oigo las palabras en mi cabeza o leo en voz alta.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op2}
                                    name="op2"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>3. Necesito hablar las cosas para entenderlas mejor.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op3}
                                    name="op3"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>4. No me gusta leer o escuchar instrucciones, prefiero simplemente comenzar a hacer las cosas.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op4}
                                    name="op4"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>5. Puedo visualizar imágenes en mi cabeza..</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op5}
                                    name="op5"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>6. Puedo estudiar mejor si escucho música.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op6}
                                    name="op6"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>7. Necesito recreos frecuentes cuando estudio.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op7}
                                    name="op7"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>8. Pienso mejor cuando tengo la libertad de moverme, estar sentado detrás de un escritorio no es para mí.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op8}
                                    name="op8"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>9. Tomo muchas notas de lo que leo y escucho.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op9}
                                    name="op9"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>10. Me ayuda MIRAR a la persona que está hablando. Me mantiene enfocado.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op10}
                                    name="op10"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>11. Se me hace difícil entender lo que una persona está diciendo si hay ruidos alrededor.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op11}
                                    name="op11"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>12. Prefiero que alguien me diga cómo tengo que hacer las cosas que leer las instrucciones.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op12}
                                    name="op12"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                    </div>
                    <div className='test__container-type'>
                        <div className='test__box'>
                            <span>13. Prefiero escuchar una conferencia o una grabación a leer un libro.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op13}
                                    name="op13"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>14. "Cuando no puedo pensar en una palabra específica, uso mis manos y llamo al objeto “coso”."</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op14}
                                    name="op14"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>15. Puedo seguir fácilmente a una persona que está hablando aunque mi cabeza esté hacia abajo o me encuentre mirando por una ventana.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op15}
                                    name="op15"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>16. Es más fácil para mí hacer un trabajo en un lugar tranquilo.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op16}
                                    name="op16"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>17. Me resulta fácil entender mapas, tablas y gráficos.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op17}
                                    name="op17"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>18. Cuando comienzo un artículo o un libro, prefiero espiar la última página.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op18}
                                    name="op18"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>19. Recuerdo mejor lo que la gente dice que su aspecto.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op19}
                                    name="op19"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>20. Recuerdo mejor si estudio en voz alta con alguien.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op20}
                                    name="op20"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>21. Tomo notas, pero nunca vuelvo a releerlas.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op21}
                                    name="op21"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>22. Cuando estoy concentrado leyendo o escribiendo, la radio me molesta.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op22}
                                    name="op22"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>23. Me resulta difícil crear imágenes en mi cabeza.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op23}
                                    name="op23"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>
                        <div className='test__box'>
                            <span>24. Me resulta útil decir en voz alta las tareas que tengo para hacer.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op24}
                                    name="op24"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>                
                    </div>
                    <div className='test__container-type'>
                        <div className='test__box'>
                            <span>25. Mi cuaderno y mi escritorio pueden verse un desastre, pero sé exactamente dónde está cada cosa.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op25}
                                    name="op25"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>26. Cuando estoy en un examen, puedo “ver” la página en el libro de textos y la respuesta.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op26}
                                    name="op26"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>27. No puedo recordar una broma lo suficiente para contarla luego.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op27}
                                    name="op27"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>28. Al aprender algo nuevo, prefiero escuchar la información, luego leer y luego hacerlo.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op28}
                                    name="op28"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>29. Me gusta completar una tarea antes de comenzar otra.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op29}
                                    name="op29"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>30. Uso mis dedos para contar y muevo los labios cuando leo.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op30}
                                    name="op30"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>31. No me gusta releer mi trabajo.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op31}
                                    name="op31"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>32. Cuando estoy tratando de recordar algo nuevo, por ejemplo, un número de teléfono, me ayuda formarme una imagen mental para lograrlo.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op32}
                                    name="op32"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>33. Para obtener una nota extra, prefiero grabar un informe a escribirlo.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op33}
                                    name="op33"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>34. Fantaseo en clase.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op34}
                                    name="op34"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>35. Para obtener una calificación extra, prefiero crear un proyecto a escribir un informe.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op35}
                                    name="op35"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                        <div className='test__box'>
                            <span>36. Cuando tengo una gran idea, debo escribirla inmediatamente, o la olvido con facilidad.</span>
                            <select
                                    type='number'
                                    placeholder='Ingrese el nombre de la carrera'
                                    onChange={handleInputChange}
                                    className='auth__input-value input-select'
                                    autoComplete='off'
                                    value={op36}
                                    name="op36"
                                >
                                    <option  value={0}>-</option>
                                    <option  value={1}>1</option>
                                    <option  value={2}>2</option>
                                    <option  value={3}>3</option>
                                    <option  value={4}>4</option>
                                    <option  value={5}>5</option>
                                </select>
                        </div>  
                    </div>
                </div>

                <button type='submit' className='btn btn-primary'>
                    Enviar
                </button>
            </form>
        </div>
    )
}
