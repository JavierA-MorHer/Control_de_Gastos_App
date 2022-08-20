import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import cerrarBtn from "../img/cerrar.svg";

export const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guadarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      Swal.fire("Error", "Completa el formulario", "error");
      return;
    }
    guadarGasto({ nombre, cantidad, categoria, id, fecha });
  };

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo gasto"}</legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>

          <input
            type="text"
            id="nombre"
            placeholder="Agregar el nombre del gasto"
            value={nombre}
            onChange={({ target }) => setNombre(target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad gasto</label>

          <input
            type="number"
            id="cantidad"
            placeholder="Agregar la cantidad del gasto ej. 300"
            value={cantidad}
            onChange={({ target }) => setCantidad(Number(target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>

          <select
            id="categoria"
            value={categoria}
            onChange={({ target }) => setCategoria(target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Otros gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={gastoEditar.nombre ? "Guardar cambios" : "Agregar"}
        />
      </form>
    </div>
  );
};
