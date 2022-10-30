import { CenterFocusStrong } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { startGetGroupsStudents } from '../../../actions/groups'
import { BarChart } from './group-student/BarChart'
import { PieChart } from './group-student/PieChart'
import { StudentsEntry } from './group-student/StudentsEntry'

export const GroupScreen = () => {
    const { groupId } = useParams()
    const dispatch = useDispatch();  
    useEffect(() => {
        dispatch(startGetGroupsStudents(groupId))
    }, [])
    
    const { groupsStudents } = useSelector( state => state.groups );
    const [dataChart, setDataChart] = useState({})
    const [chartOption, setChartOption] = useState(true)

    let auditivo = 0
    let noRealizado = 0
    let visual = 0
    let kinestico = 0

    useEffect(() => {
        
      groupsStudents?.map(data => {
          data.styleLearning?.learningStyle === 'visual' ? visual++ : data.styleLearning?.learningStyle === 'auditivo' ? auditivo++ : data.styleLearning?.learningStyle === 'kinestesico' ? kinestico++ : noRealizado++
      })
    
      setDataChart({
          labels:['Visual', 'Auditivo', 'Kinestesico', 'No Realizado'],
          datasets: [{
              label: "Resultados de los estilos de aprendizajes acorde al test",
              data: [visual, auditivo, kinestico, noRealizado],
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#2a71d0",
                "#f13195",
                "#ecf0f1",
                "#f3ba2f",
              ],
              borderColor: "black",
              borderWidth: 2,
          }]
      })
      
    }, [groupsStudents])

    const handleCLick = (e) => {
        e.preventDefault();
        setChartOption(!chartOption)
    }

    return (
        <>
            {
                groupsStudents &&
                <>
                    <div className="number__students">
                        <img src="https://cdn-icons-png.flaticon.com/512/599/599928.png" alt='People icons created by Freepik - Flaticon' width={52} height={52} />
                        <span >Cantidad de estudiantes registrados</span>
                        <span>{ groupsStudents.length }</span>
                    </div>

                    <div className='student__container'>
                        <div className='student__entries'>
                        {
                            groupsStudents.map(group => (
                                <StudentsEntry 
                                    key={group.id}
                                    {...group}
                                />
                            ))
                        }
                        </div>

                        <p className='student__container-title'>Reportes</p>

                        {
                            chartOption ?
                                        <div style={{ width: '30%', minWidth: '450px'}}>
                                            <PieChart chartData={dataChart} />
                                        </div>
                                        :
                                        <div style={{width: '50%', minWidth: '450px'}}>
                                            <BarChart chartData={dataChart} />
                                        </div>
                        }

                        <button className='btn btn-primary' onClick={handleCLick}>
                                Ver en formato de {chartOption ? 'barras' : 'pastel'}
                            </button>
                        </div>

                </>
            }
        </>
    )
}
