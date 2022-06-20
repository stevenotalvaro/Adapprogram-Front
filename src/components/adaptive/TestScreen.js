import React from 'react'

export const TestScreen = () => {
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
        <form className='test__form'>
            <div className='test__container'>

                <div className='test__container-type'>
                    <div className='test__box'>
                        <span>1. Puedo recordar algo mejor si lo escribo</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>2. Al leer, oigo las palabras en mi cabeza o leo en voz alta.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>3. Necesito hablar las cosas para entenderlas mejor.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>4. No me gusta leer o escuchar instrucciones, prefiero simplemente comenzar a hacer las cosas.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>5. Puedo visualizar imágenes en mi cabeza..</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>6. Puedo estudiar mejor si escucho música.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>7. Necesito recreos frecuentes cuando estudio.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>8. Pienso mejor cuando tengo la libertad de moverme, estar sentado detrás de un escritorio no es para mí.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>9. Tomo muchas notas de lo que leo y escucho.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>10. Me ayuda MIRAR a la persona que está hablando. Me mantiene enfocado.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>11. Se me hace difícil entender lo que una persona está diciendo si hay ruidos alrededor.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>12. Prefiero que alguien me diga cómo tengo que hacer las cosas que leer las instrucciones.</span>
                        <input />
                    </div>
                </div>
                <div className='test__container-type'>
                    <div className='test__box'>
                        <span>13. Prefiero escuchar una conferencia o una grabación a leer un libro.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>14. "Cuando no puedo pensar en una palabra específica, uso mis manos y llamo al objeto “coso”."</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>15. Puedo seguir fácilmente a una persona que está hablando aunque mi cabeza esté hacia abajo o me encuentre mirando por una ventana.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>16. Es más fácil para mí hacer un trabajo en un lugar tranquilo.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>17. Me resulta fácil entender mapas, tablas y gráficos.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>18. Cuando comienzo un artículo o un libro, prefiero espiar la última página.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>19. Recuerdo mejor lo que la gente dice que su aspecto.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>20. Recuerdo mejor si estudio en voz alta con alguien.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>21. Tomo notas, pero nunca vuelvo a releerlas.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>22. Cuando estoy concentrado leyendo o escribiendo, la radio me molesta.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>23. Me resulta difícil crear imágenes en mi cabeza.</span>
                        <input />
                    </div>
                    <div className='test__box'>
                        <span>24. Me resulta útil decir en voz alta las tareas que tengo para hacer.</span>
                        <input />
                    </div>                
                </div>
                <div className='test__container-type'>
                    <div className='test__box'>
                        <span>25. Mi cuaderno y mi escritorio pueden verse un desastre, pero sé exactamente dónde está cada cosa.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>26. Cuando estoy en un examen, puedo “ver” la página en el libro de textos y la respuesta.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>27. No puedo recordar una broma lo suficiente para contarla luego.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>28. Al aprender algo nuevo, prefiero escuchar la información, luego leer y luego hacerlo.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>29. Me gusta completar una tarea antes de comenzar otra.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>30. Uso mis dedos para contar y muevo los labios cuando leo.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>31. No me gusta releer mi trabajo.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>32. Cuando estoy tratando de recordar algo nuevo, por ejemplo, un número de teléfono, me ayuda formarme una imagen mental para lograrlo.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>33. Para obtener una nota extra, prefiero grabar un informe a escribirlo.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>34. Fantaseo en clase.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>35. Para obtener una calificación extra, prefiero crear un proyecto a escribir un informe.</span>
                        <input />
                    </div>  
                    <div className='test__box'>
                        <span>36. Cuando tengo una gran idea, debo escribirla inmediatamente, o la olvido con facilidad.</span>
                        <input />
                    </div>  
                </div>
            </div>

            <button className='btn btn-primary'>
                Enviar
            </button>
        </form>
    </div>
  )
}
