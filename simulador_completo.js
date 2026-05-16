// Sonicse
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

function ocultarSecciones() {
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("credito").classList.remove("activa");
  document.getElementById("listaCreditos").classList.remove("activa");
}

function mostrarSeccion(id) {
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
    let tasa = recuperarFloat("tasaInteres");
 
    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;   // guarda en la variable global
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

function guardarCliente() {
    let cedula   = recuperaraTexto("cedula");
    let nombre   = recuperaraTexto("nombre");
    let apellido = recuperaraTexto("apellido");
    let ingresos = recuperarFloat("ingresos");
    let egresos  = recuperarFloat("egresos");

    let clienteExistente = buscarCliente(cedula);
 
    if (clienteExistente === null) {

        let nuevoCliente = {
            cedula   : cedula,
            nombre   : nombre,
            apellido : apellido,
            ingresos : ingresos,
            egresos  : egresos
        };
        clientes.push(nuevoCliente);
 
    } else {
        clienteExistente.nombre   = nombre;
        clienteExistente.apellido = apellido;
        clienteExistente.ingresos = ingresos;
        clienteExistente.egresos  = egresos;
    }
    pintarClientes();
    limpiar();         
}

function pintarClientes() {
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";
 
    for (let i = 0; i < clientes.length; i++) {
        let c = clientes[i];
        tabla.innerHTML += `
            <tr>
                <td>${c.cedula}</td>
                <td>${c.nombre}</td>
                <td>${c.apellido}</td>
                <td>${c.ingresos}</td>
                <td>${c.egresos}</td>
                <td>
                    <button onclick="seleccionarCliente('${c.cedula}')">Actualizar</button>
                    <button onclick="eliminarCliente('${c.cedula}')">Eliminar</button>
                </td>
            </tr>`;
    }
}

function buscarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            return clientes[i];
        }
    }
    return null;
}

function seleccionarCliente(cedula) {
    let cliente = buscarCliente(cedula);
 
    if (cliente !== null) {
        clienteSeleccionado = cliente;

        mostrarTextoEnCaja("cedula",   cliente.cedula);
        mostrarTextoEnCaja("nombre",   cliente.nombre);
        mostrarTextoEnCaja("apellido", cliente.apellido);
        mostrarTextoEnCaja("ingresos", cliente.ingresos);
        mostrarTextoEnCaja("egresos",  cliente.egresos);
    }
}

function limpiar() {
    mostrarTextoEnCaja("cedula",   "");
    mostrarTextoEnCaja("nombre",   "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos",  "");
    clienteSeleccionado = null;
}

function eliminarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            clientes.splice(i, 1); // splice(posición, cuántos eliminar)
            break;
        }
    }
    pintarClientes(); // redibuja la tabla sin ese cliente
}

function buscarClienteCredito()  { /* próximo taller */ }
function calcularCredito()       { /* próximo taller */ }
function solicitarCredito()      { /* próximo taller */ }
function buscarCreditosCliente() { /* próximo taller */ }
function pintarCreditos(lista)   { /* próximo taller */ }