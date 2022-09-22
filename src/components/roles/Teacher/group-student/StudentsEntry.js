import React from 'react'

export const StudentsEntry = ({name, email, styleLearning}) => {
    return (
        <div className='student-entry'>
            <p> <img src="https://cdn-icons-png.flaticon.com/512/994/994642.png" width={40} height={40} alt="Name icons created by geotatah - Flaticon" />{ name }</p>
            <p> <img src=" https://cdn-icons-png.flaticon.com/512/8307/8307897.png" width={40} height={40} alt="Receive icons created by bearicons - Flaticon" />{ email }</p>
            <p> <img src=" https://cdn-icons-png.flaticon.com/512/2995/2995522.png"width={40} height={40} alt="Test icons created by Freepik - Flaticon"/>
                {
                    styleLearning?.learningStyle ? styleLearning.learningStyle : 'No realizado' 
                }
            </p> 
        </div>
    )
}
