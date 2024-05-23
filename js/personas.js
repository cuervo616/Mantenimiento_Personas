// const archivoJSON = "./personas.json";
const btn_eliminar = document.getElementById("btndelete_user");
const btn_aceptar = document.getElementById("btnAdd_new_user");
const input_eliminar = document.getElementById("input_delete");
const input_id = document.getElementById("id_user");
const input_nombre = document.getElementById("nom_user");
const input_apellido = document.getElementById("ape_user");
const input_pais = document.getElementById("pais_user");
const input_ciudad = document.getElementById("ciudad_user");

// const personas_registradas = async () => {
//     // Envia los datos del archivo JSON al localStorage
//     const res = await fetch(archivoJSON);
//     const data = await res.json();
//     data.forEach(d => {
//         localStorage.setItem(d.id, JSON.stringify(d));
//     });
//     cargar_personas();
// };

function cargar_personas() {
    // Obtener datos de localStorage
    let data = [];
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const persona = JSON.parse(localStorage.getItem(key));

            if (persona && persona.id) {
                data.push(persona);
            }
        }
    }

    // Verificar si hay datos y cargar la tabla
    if (data.length > 0) {
        const tbody = document.querySelector('#local tbody');
        tbody.innerHTML = '';

        data.forEach(persona => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.ciudad}</td>
                <td>${persona.pais}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        console.log('No hay datos en localStorage');
    }
}
function cargar_personas_session() {
    // Obtener datos de localStorage
    let data = [];
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const persona = JSON.parse(sessionStorage.getItem(key));

            if (persona && persona.id) {
                data.push(persona);
            }
        }
    }

    // Verificar si hay datos y cargar la tabla
    if (data.length > 0) {
        const tbody = document.querySelector('#session tbody');
        tbody.innerHTML = '';
        
        data.forEach(persona => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.ciudad}</td>
                <td>${persona.pais}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        console.log('No hay datos en localStorage');
    }
}

function eliminar_persona(){
    const id_eliminar = input_eliminar.value; 
    if (id_eliminar) {
        localStorage.removeItem(id_eliminar);
        sessionStorage.removeItem(id_eliminar);
        input_eliminar.value = '';
        cargar_personas();
        cargar_personas_session();
    } else {
        console.log("Ingresar id");
    }
}

function registar_persona(){
    let add_id = input_id.value;
    let add_nombre= input_nombre.value;
    let add_apellido = input_apellido.value;
    let add_pais = input_pais.options[input_pais.selectedIndex].text;
    let add_ciudad = input_ciudad.options[input_ciudad.selectedIndex].text;
    const nueva_persona = JSON.stringify({id:add_id,nombre:add_nombre,apellido:add_apellido,pais:add_pais,ciudad:add_ciudad,});
    localStorage.setItem(add_id,nueva_persona);
    sessionStorage.setItem(add_id,nueva_persona);
    cargar_personas();
    cargar_personas_session();
}

function editar_persona(edit_id){
    let edit_nombre= input_nombre.value;
    let edit_apellido = input_apellido.value;
    let edit_pais = input_pais.options[input_pais.selectedIndex].text;
    let edit_ciudad = input_ciudad.options[input_ciudad.selectedIndex].text;
    let persona = JSON.parse(localStorage.getItem(edit_id));
    persona.id = edit_id;
    persona.nombre = edit_nombre;
    persona.apellido = edit_apellido;
    persona.ciudad = edit_ciudad;
    persona.pais = edit_pais;
    localStorage.setItem(edit_id,JSON.stringify(persona));
    sessionStorage.setItem(edit_id,JSON.stringify(persona));
    cargar_personas();
    cargar_personas_session();
} 
function limpiarFormulario() {
    document.getElementById('id_user').value = '';
    document.getElementById('nom_user').value = '';
    document.getElementById('ape_user').value = '';
    document.getElementById('pais_user').selectedIndex = 0;
    document.getElementById('ciudad_user').innerHTML = '<option value="0">Seleccionar Ciudad</option>';
}

// personas_registradas();
cargar_personas();
cargar_personas_session();
limpiarFormulario();
/*Eventos*/
btn_eliminar.addEventListener('click', eliminar_persona);
btn_aceptar.addEventListener('click', () => {
    id = input_id.value;
    if(id){
        if(localStorage.getItem(id)){
            editar_persona(id);
        }else{
            registar_persona();
        }
    }else{
        console.log("No hay id");
    }
});
document.getElementById('btnlimpiar_datos').addEventListener('click', limpiarFormulario);

