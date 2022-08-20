import { useState, useEffect } from 'react';
import { Filtros, Header, ListadoGastos, Modal } from './components';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import {generarId} from './helpers';

function App() {

  // useStates
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  
  const [modal, setModal]= useState(false);
  const [animarModal, setAnimarModal]=useState(false);
  
  const [gastos, setGastos]=useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')):[]);
  const [gastoEditar, setGastoEditar]= useState({});

  const [filtro, setFiltro]= useState('');
  const [gastosFiltrados, setGastosFiltrados]= useState([]);

// Termina useStates

// useEffects
  useEffect(() => {
    if(Object.keys(gastoEditar).length>0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true)
      }, 200);
    }    
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
  
    const presupuestoLS = Number(localStorage.getItem('presupuesto'??0));
    if(presupuesto>0){
      setIsValidPresupuesto(true);
    }
  }, [])
  
  useEffect(() => {
  localStorage.setItem('gastos',JSON.stringify(gastos)??[])
  }, [gastos])
  
  useEffect(() => {
    if(filtro){
      //Filtrar gastos x categoria
      const gastosFiltrados = gastos.filter( gasto=> gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])
  
  // Finaliza useEffect

  const handleNuevoGasto = ()=>{
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true)
    }, 200);
  }

const guadarGasto = gasto=>{
  if(gasto.id){
    //Actualizando
    const gastosActualizados = gastos.map( gastoState=> gastoState.id
                   === gasto.id ? gasto : gastoState);
    setGastos(gastosActualizados);
    setGastoEditar({})
  }else{
    //Nuevo registro
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);
  }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
}

const eliminarGasto=(id)=>{
  const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
  setGastos(gastosActualizados);
}


  return (
   <div className={modal ? 'fijar' :''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />


      { isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro} 
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
         <div className="nuevo-gasto">
         <img 
            src={IconoNuevoGasto} 
            alt="Icono Nuevo Gasto" 
            onClick={handleNuevoGasto}
            />
        </div>
        </>
      )}

      {modal && <Modal 
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guadarGasto={guadarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                    />}
   </div>
  )
}

export default App
