import { useState } from "react"

export const RulesLists = () => {
  //Estados para pasos, editor y adicional manejo de errores

  const  [reglas, setReglas] = useState([
    {id: 1, nombre: 'Bienvenida', disparador: "Cliente creado", activa: true },
    {id: 2,  nombre: 'Confirmar pago', disparador: "Pago recibido", activa: true},
    {id: 3, nombre: 'Ticket pendiente', disparador: "Ticket sin respuesta", activa: true }
  ])

  const [editor, setEditor] = useState(null)
  const [paso, setPaso] = useState(1)

  const [error, setError] = useState('')


  //Actualizar
  const actualizar = (cambios) => {
    setEditor((prev) => prev ? {...prev, ...cambios} : null)
    // Aqui se deberia manejar el error
    setError('')
  }
  
  // Manejo de condicion dinamica 
  const agregarCondicion = () => {
    if(!editor) return


  }



  // Manejo de abrir Editor


  // Manejo del cambio de disparador





  const cambiarEstado = (id: number) => {
    setReglas((previa) => 
      previa.map((regla) => 
        regla.id === id ? 
        {...regla, activa: !regla.activa} 
        : regla
      )

    )
  }







  return (
    <main className="contenedor">               
      <h1>Administrador/Listado de Reglas</h1>
      <hr />

      <section>
        <button>
          Nueva Regla 
        </button>
      </section>

      <section className="card">
        <table className="tabla-reglas">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Disparador</th>
              <th>Activa</th>

            </tr>

            <tbody>
              {
                reglas.map(regla => (
                  <tr>
                    <td>{regla.nombre}</td>
                    <td>{regla.disparador}</td>
                    <td><input type="checkbox" checked={regla.activa}  onChange={() => cambiarEstado(regla.id)}/></td>
                  </tr>
                ))
              }
            </tbody>
          </thead>
        </table>
      </section>


      <section>
        <h2>Editor de regla</h2>

        <div>
          <button>
            Paso X
          </button>
        </div>
      </section>


      <div>
        <h2>Disparador</h2>

        <label htmlFor="nombreregla">Nombre de la regla</label>

        <input type="text" />

        <select>
          
        </select>

      </div>
    </main>
  )
}
