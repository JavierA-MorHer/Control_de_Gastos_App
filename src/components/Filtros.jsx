import {useState, useEffect} from 'react'

export const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form action="">
            <div className='campo'>
                <label>Filtrar gastos</label>
                <select 
                    value={filtro} 
                    onChange={ ({target})=>{setFiltro(target.value)} }
                >
                    <option value="">-- Todas las categorias --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Otros Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}
