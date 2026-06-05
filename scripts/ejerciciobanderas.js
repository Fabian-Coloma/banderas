let darkBtn = document.querySelector("#darkmode");
let documento = document.querySelector("html");

function alternarModoOscuro() {
  documento.classList.toggle("dark");
}
darkBtn.addEventListener("click", alternarModoOscuro);


let contenedorBanderas = document.querySelector("#contenedor-banderas");
let todosLosPaises = []; 

fetch("./data.json")
  .then(respuesta => respuesta.json())
  .then(data => {
    todosLosPaises = data; 
    mostrarPaises(todosLosPaises);
  })
  .catch(error => {
    console.error("Hubo un error cargando el JSON:", error);
  });


function mostrarPaises(datos) {
  let htmlTarjetas = "";

  for (let i = 0; i < datos.length; i++) {
    let pais = datos[i];
    let capital = pais.capital ? pais.capital : "No tiene";

    htmlTarjetas += `
      <div class="max-w-75 w-full bg-white rounded-md overflow-hidden shadow dark:bg-gray-800 transition-colors">
        <img src="${pais.flags.svg}" alt="Flag of ${pais.name}" class="w-full h-40 object-cover">
        <div class="px-6 py-10">
          <p class="text-xl font-bold mb-4">${pais.name}</p>
          <p><span class="font-semibold">Population: </span>${pais.population.toLocaleString()}</p>
          <p><span class="font-semibold">Region: </span>${pais.region}</p>
          <p><span class="font-semibold">Capital: </span>${capital}</p>
        </div>
      </div>
    `;
  }

  contenedorBanderas.innerHTML = htmlTarjetas;
}

let selectRegion = document.querySelector("#filtro-region");


let filtroInput = document.querySelector("input"); 

function filtrarPaises() {
  let Region = selectRegion.value; 
  let paisesFiltrados = todosLosPaises; 
  let contenidoInput = filtroInput.value.toLowerCase(); 

  
  if (Region !== "todas") {
    paisesFiltrados = paisesFiltrados.filter(pais => pais.region === Region);
  }
  
  paisesFiltrados = paisesFiltrados.filter(pais => pais.name.toLowerCase().includes(contenidoInput));
  
  mostrarPaises(paisesFiltrados);
}

filtroInput.addEventListener("input", filtrarPaises);
selectRegion.addEventListener("change", filtrarPaises);