import React from "react";
import Swal from "sweetalert2";

export const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || Number(presupuesto) < 1) {
      Swal.fire("Error", "Ingresa un numero valido", "error");
      return;
    }
    setIsValidPresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="">Definir presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Ingresa tu presupuesto"
            onChange={({ target }) => setPresupuesto(Number(target.value))}
          />
          <input type="submit" value="agregar" />
        </div>
      </form>
    </div>
  );
};
