// Sonicse
let clientes = [];
let creditos = [];
 
let tasaInteres         = 15;
let clienteSeleccionado = null;
let cuotaCalculada      = 0;
let montoCalculado      = 0;
let plazoCalculado      = 0;
let creditoAprobado     = false;

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
        tasaInteres = tasa;
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
                <td>$${c.ingresos}</td>
                <td>$${c.egresos}</td>
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
 
function eliminarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            clientes.splice(i, 1);
            break;
        }
    }
    pintarClientes();
}
 
function limpiar() {
    mostrarTextoEnCaja("cedula",   "");
    mostrarTextoEnCaja("nombre",   "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos",  "");
    clienteSeleccionado = null;
}

// Si lees esto, espero que estes teniendo un lindo dia, tqm Sonicse
function buscarClienteCredito() {
    let cedula  = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);
    let div     = document.getElementById("datosClienteCredito");
 
    if (cliente !== null) {
        clienteSeleccionado = cliente;

        div.innerHTML = `
            <h3>Datos del Cliente</h3>
            <p><strong>Cédula:</strong> ${cliente.cedula}</p>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Ingresos:</strong> $${cliente.ingresos}</p>
            <p><strong>Egresos:</strong> $${cliente.egresos}</p>
        `;
    } else {
        clienteSeleccionado = null;
        div.innerHTML = "<p>❌ Cliente no encontrado.</p>";
    }
}

function calcularCredito() {
    if (clienteSeleccionado === null) {
        alert("Primero busca un cliente.");
        return;
    }

    montoCalculado = recuperarFloat("montoCredito");
    plazoCalculado = recuperarInt("plazoCredito");
 
    let capacidadPago = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;

    let intereses  = montoCalculado * (tasaInteres / 100) * (plazoCalculado / 12);
    let totalPagar = montoCalculado + intereses;
 
    cuotaCalculada = totalPagar / plazoCalculado;
    creditoAprobado = cuotaCalculada <= capacidadPago;

    let resultadoDiv = document.getElementById("resultadoCredito");
 
    resultadoDiv.innerHTML = `
        Capacidad de pago: $${capacidadPago.toFixed(2)}<br>
        Total a pagar: $${totalPagar.toFixed(2)}<br>
        Cuota mensual: $${cuotaCalculada.toFixed(2)}<br>
        RESULTADO: ${creditoAprobado ? "✅ APROBADO" : "❌ RECHAZADO"}
    `;
    resultadoDiv.className = creditoAprobado ? "aprobado" : "rechazado";

    document.getElementById("btnSolicitarCredito").disabled = !creditoAprobado;
}

function solicitarCredito() {
    if (!creditoAprobado || clienteSeleccionado === null) return;
 
    let nuevoCredito = {
        cedula   : clienteSeleccionado.cedula,
        nombre   : clienteSeleccionado.nombre,
        apellido : clienteSeleccionado.apellido,
        monto    : montoCalculado,
        tasa     : tasaInteres,
        plazo    : plazoCalculado,
        cuota    : cuotaCalculada
    };
 
    creditos.push(nuevoCredito);
    pintarCreditos(creditos);
 
    alert("✅ Crédito registrado exitosamente.");
    document.getElementById("btnSolicitarCredito").disabled = true;
}

function pintarCreditos(lista) {
    let tabla = document.getElementById("tablaCreditos");
    tabla.innerHTML = "";
 
    for (let i = 0; i < lista.length; i++) {
        let cr = lista[i];
        tabla.innerHTML += `
            <tr>
                <td>${cr.cedula}</td>
                <td>${cr.nombre}</td>
                <td>${cr.apellido}</td>
                <td>$${cr.monto}</td>
                <td>${cr.tasa}%</td>
                <td>${cr.plazo} meses</td>
                <td>$${cr.cuota.toFixed(2)}</td>
                <td>
                    <button onclick="eliminarCredito(${i})">Eliminar</button>
                </td>
            </tr>`;
    }
}

function eliminarCredito(indice) {
    creditos.splice(indice, 1);
    pintarCreditos(creditos);
}

function buscarCreditos(cedula) {
    let resultado = [];

    for (let i = 0; i < creditos.length; i++) {
        if (creditos[i].cedula === cedula) {
            resultado.push(creditos[i]);
        }
    }

    return resultado;
}

function buscarCreditosCliente() {
    let cedula    = recuperaraTexto("buscarCedulaListado");
    let resultado = buscarCreditos(cedula);
    pintarCreditos(resultado);
}