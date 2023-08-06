import React from 'react'
import './Techs.css'

function Techs() {

    const technologies = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB']

  return (
  
    <section className='techs' id='technologies'>
    <div className='techs__container'>
        <h2 className='techs__title'>Технологии</h2>
        <div className='techs__textblock'>
            <h3 className='techs__textblock-title'>7 технологий</h3>
            <p className='techs__textblock-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className='techs__list'>
            {technologies.map(item => {
                return(
                <li key={item} className='techs__item'>
                    {item}
                </li>
                )
            })}
        </ul>
    </div>
    </section>    
  )
}

export default Techs