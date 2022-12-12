import React from 'react'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { startNewGroup } from '../../../actions/groups';
import { removeError, setError } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';

export const SessionsScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const { active:group } = useSelector(state => state.groups)
    
    const generarID = () => {
        const random = Math.random().toString(36).substr(2).toUpperCase();
        const fecha = Date.now().toString(36);
    
        return (random + fecha).substr(1,5);
    }
    const generedId = generarID();

    const currentTime = new Date();
    const year = currentTime.getFullYear()
    const currentMonth = currentTime.getMonth() + 1;
    let peri = 0;

    currentMonth <= 6 ? peri = 1 : peri = 2;

    const [formValues, handleInputChange, reset] = useForm({
        carrera: '',
        periodo: `${year}-${peri}`,
        grupo: '',
        jornada: '',
        codigo: generedId,
        descripcion: ''
    })
    
    const {carrera, periodo, grupo, jornada, codigo, descripcion} = formValues
    
    const handleRegister = (e) =>{
        e.preventDefault()
        if (isFormValid()) {
            dispatch(startNewGroup(carrera, periodo, grupo, jornada, codigo, descripcion))
            reset({
                carrera: '',
                periodo: `${year}-${peri}`,
                grupo: '',
                jornada: '',
                codigo: generedId,
                descripcion: ''
            })
        }
    }

    const activeId = useRef( group.id )

    useEffect(() => {
      if(group.id !== activeId.current) {
        reset(group);
        activeId.current = group.id
      }
    }, [group, reset])    

    const isFormValid = () => {
        if(carrera === "") {
            dispatch(setError("Por favor selecciona algua de las carreras "))
            return false;
        } else if (periodo.trim().length <= 5) {
            dispatch(setError('Por favor inserta un periodo valido; Ej 2022-2'))
            return false
        } else if(grupo.trim().length <= 1 ) {
            dispatch(setError('Por favor inserta un grupo valido; Ej 50'))
            return false;
        } else if (jornada !== 'Diurna' && jornada !== 'Nocturna') {
            dispatch(setError('Por faovr selecciona una jornada valida')) 
            return false;
        } else if (codigo !== codigo) {
            dispatch(setError('No se puede modificar el codigo')) 
            return false;
        }

        dispatch(removeError())
        return true;
    }



    return (
        <div className='sessions__main-content'>
            <div className='admin__main'>
                <div> 

                    <h2 className='auth__title'>Añadir Grupo</h2>
                    <div className='admin__box-container'>


                        {
                            msgError && 
                            (
                                <div className='auth__alert-error'>{msgError}</div>
                            )
                        }

                        <form onSubmit={handleRegister}>
                            <label 
                                htmlFor="carrera" 
                                className="admin__box-label"
                            >
                                Carrera:
                            </label>
                            <select
                                id="carrera"
                                type='text'
                                placeholder='Ingrese el nombre de la carrera'
                                onChange={handleInputChange}
                                className='auth__input-admin input-select'
                                autoComplete='off'
                                value={carrera}
                                name="carrera"
                            >
                                <option  value="">Selecciona la carrera</option>
                                <option  value="Ingenieria de sistemas">Ingenieria de sistemas</option>
                                <option  value="Tecnologia en desarrollo de software">Tecnologia en desarrollo de software</option>
                            </select>

                        
                            <label 
                                htmlFor="periodo" 
                                className="admin__box-label"
                            >
                                Periodo:
                            </label>

                            <input
                                id='periodo'
                                type='text'
                                placeholder='Ingrese el periodo'
                                name='periodo'
                                className='auth__input-admin'
                                autoComplete='off'
                                value={periodo}
                                onChange={handleInputChange}
                            />
                            <label 
                                htmlFor="grupo" 
                                className="admin__box-label"
                            >
                                Grupo:
                            </label>

                            <input
                                id='grupo'
                                type='number'
                                placeholder='Ingrese el grupo'
                                name='grupo'
                                className='auth__input-admin'
                                value={grupo}
                                onChange={handleInputChange}
                            />

                            <label 
                                htmlFor="jornada" 
                                className="admin__box-label"
                            >
                                Jornada:
                            </label>

                            <select
                                id="jornada"
                                type='text'
                                placeholder='Ingrese la jornada'
                                onChange={handleInputChange}
                                className='auth__input-admin input-select'
                                autoComplete='off'
                                value={jornada}
                                name="jornada"
                            >
                                <option  value="">Selecciona la jornada</option>
                                <option  value="Diurna">Diurna</option>
                                <option  value="Nocturna">Nocturna</option>
                            </select>

                            <label 
                                htmlFor="codigo" 
                                className="admin__box-label"
                            >
                                Codigo:
                            </label>

                            <input
                                id='codigo'
                                type='text'
                                placeholder='Agrega El codigo'
                                name='codigo'
                                className='auth__input-admin'
                                value={codigo}
                                onChange={handleInputChange}
                                disabled={true}
                            />

                            <label 
                                htmlFor="descripcion" 
                                className="admin__box-label"
                            >
                                Descripcion (opcional):
                            </label>

                            <textarea
                                id='descripcion'
                                placeholder='Agregue una descripcion'
                                name='descripcion'
                                className='auth__input-admin input-area'
                                value={descripcion}
                                onChange={handleInputChange}
                            />

                            <button type='submit' className='btn btn-primary btn-block'>
                                <i className="fa-regular fa-floppy-disk"></i>
                                <span> Save</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
