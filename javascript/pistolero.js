document.getElementById('btn-disparar').disabled=true;
let jugadorBalas = 0;
let cpuBalas = 0;
let score=0;
let hi=0;
let cpu_muerto=false
const imagenes=["/imgs/Pistolero/chamber_opp.png","/imgs/Pistolero/gun_opp.png","/imgs/Pistolero/black-shield-md.png"]
const bloqueo_opp= [", el vaguito bloqueó tu disparo", ", safó"],
      bloqueo=[", ¡Safaste de un cuetazo!", ", ¡bien ahí"],
      muerte=["te pasaron a valores", "no la contaste", "QEDP", "pasaste para el otro lado", "la quedaste"],
      tiro_recibido=[", te cabió...", ", sos pollo...", ", te fuiste con un corcho de souvenir..." ],
      tiro_al_blanco=[", ¡es pollo!", ", ¡quedó pillo!", ", ¡lo pasaste a valores!", ", ¡le diste masa!"]
function actualizarBotones() {
  if (jugadorBalas>=6){
    document.getElementById('btn-recargar').disabled=true;

  }else{
    document.getElementById('btn-recargar').disabled=false;
  }
  if (jugadorBalas===0){
    document.getElementById('btn-disparar').disabled=true;
  }else{
    document.getElementById('btn-disparar').disabled=false;
  }
}

function accionCPU() {
  const acciones = ['recargar', 'disparar', 'escudo']; 
  if (cpuBalas==6){
      return acciones[1]
    } 
  if (cpuBalas==0 && jugadorBalas==0){
      return acciones[0];
    }
  if(cpuBalas==0){
      const indice = Math.floor(Math.random() * 2)*2; 
      return acciones[indice];
    }
  if (jugadorBalas==0){
      const indice = Math.floor(Math.random() * 2); 
      return acciones[indice];
    }
  else{
      const indice = Math.floor(Math.random() * 3); 
      return acciones[indice];
    }  
}


async function play(jugadorAccion) {
  actualizarBotones();
  document.getElementById('muerte').textContent="";
  document.getElementsByClassName('sangre')[0].src="";
  let cpuAccion = accionCPU();
  let resultado = `Elegiste ${jugadorAccion} - el enemigo elige ${cpuAccion}`;
  if (cpuAccion==="recargar"){
    cpuBalas++;
  }  
  if (jugadorAccion === 'recargar') {
    jugadorBalas++;
  } else if (jugadorAccion === 'disparar') {
      jugadorBalas--;
      if (cpuAccion === 'recargar') {
        resultado +=tiro_al_blanco[Math.floor(Math.random()*4)];
        jugadorBalas=0;
        cpuBalas=0;
        score++;
        cpu_muerto=true
        document.getElementsByClassName('sangre')[0].src="/imgs/Pistolero/blood-png-1.png";
      } else if (cpuAccion === 'escudo') {
        resultado +=bloqueo_opp[Math.floor(Math.random()*2)];
      } else if (cpuAccion === 'disparar') {
        resultado += ', ambos dispararon pero chocaron las balas...';
      }
  }
if (hi<score){
    hi=score
    }
       
 
if (cpuAccion === 'disparar') {
  cpuBalas--;    
    if (jugadorAccion === 'recargar') {
        resultado +=tiro_recibido[Math.floor(Math.random()*3)];
        cpuBalas=0;
        jugadorBalas=0;
        score=0;
        document.getElementById('muerte').textContent=muerte[Math.floor(Math.random()*5)];
    }else if (jugadorAccion === 'escudo'){
        resultado +=bloqueo[Math.floor(Math.random()*2)];
    }      
    }
if (cpu_muerto){
  document.getElementsByClassName('cpu-selec')[0].src="/imgs/Pistolero/pngtree-red-cross-paint-clipart-transparent-background-vector-png-image_7110618.png"
} else{if (cpuAccion==='recargar'){
  document.getElementsByClassName('cpu-selec')[0].src="/imgs/Pistolero/chamber_opp.png";
}else if (cpuAccion==='disparar'){
  document.getElementsByClassName('cpu-selec')[0].src="/imgs/Pistolero/gun_opp.png";
}else if (cpuAccion==='escudo'){
  document.getElementsByClassName('cpu-selec')[0].src="/imgs/Pistolero/black-shield-md.png";
} }    
    
  document.getElementById('result').textContent = resultado;
  document.getElementById('balas').textContent = `Tus balas: ${jugadorBalas} - Sus balas: ${cpuBalas}`;
  document.getElementById('score').textContent =`Puntaje: ${score}`
  document.getElementById('hi').textContent = `Record: ${hi}`
  actualizarBotones();
  cpu_muerto=false
}