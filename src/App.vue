<template>
  <div class="url-shortener">
    <h1>Min.URL</h1>
    <form @submit.prevent="shortenUrl">
      <input v-model="longUrl" type="text" placeholder="Ingresa tu URL aquí..." />
      <button type="submit">Acortar URL</button>
    </form>
    <div v-if="shortUrl" class="short-url-container">
      <p>Enlace acortado:</p>
      <a :href="shortUrl" target="_blank" class="short-url">{{ shortUrl }}</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

class UrlShortenerService {
    constructor(httpClient = axios) {
        this.httpClient = httpClient;
        this.apiUrl = 'http://localhost:3000';
    }

    async shorten(url) {
        const response = await this.httpClient.post(`${this.apiUrl}/shorten`, { url });
        return response.data.shortUrl;
    }
}

export default {
    data() {
        return {
            longUrl: '',
            shortUrl: '',
            urlShortenerService: new UrlShortenerService(),
        };
    },
    methods: {
        async shortenUrl() {
            if (!this.isValidUrl(this.longUrl)) {
                alert("Ingresa una URL válida para acortar");
                return;
            }

            try {
                this.shortUrl = await this.urlShortenerService.shorten(this.longUrl);
            } catch (error) {
                this.handleError(error);
            }
        },
        isValidUrl(url) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ 
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
                '(\\#[-a-z\\d_]*)?$','i'); 
            return !!pattern.test(url);
        },
        handleError(error) {
            console.error(error);
            alert("Ocurrió un error: " + error.message);
        }
    }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

/* Restablecer estilos y usar fuente moderna */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
  background-color: #f8f9fa; /* Fondo más claro para contraste */
}

/* Contenedor principal */
.url-shortener {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ocupar pantalla completa */
  text-align: center;
  background-color: #ffffff; /* Fondo claro para el contenedor principal */
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Sombra más suave */
  padding: 40px 20px;
  margin: 20px; /* Asegurarse de que haya espacio alrededor */
}

/* Título con estilo más moderno */
.url-shortener h1 {
  color: #333; /* Color más oscuro para mejor lectura */
  font-weight: 600; /* Fuente más gruesa */
  margin-bottom: 24px;
}

/* Estilo del formulario */
form {
  display: flex;
  gap: 12px; /* Espacio entre elementos */
  width: 90%; /* Ancho adaptativo */
  max-width: 500px; /* Máximo ancho */
  background-color: #e9ecef; /* Fondo sutil para el formulario */
  border-radius: 25px; /* Bordes más redondeados */
  padding: 15px; /* Más espacio interior */
}

input, button {
  padding: 12px; /* Más espacio interior */
  border: none;
  border-radius: 25px; /* Bordes redondeados */
  font-size: 1rem; /* Tamaño de fuente estándar */
}

/* Estilo de los inputs */
input {
  flex-grow: 1; /* Ocupar espacio disponible */
  background-color: #fff; /* Fondo blanco */
}

/* Estilos de los botones */
button {
  background-color: #007bff; /* Color primario más vibrante */
  color: #fff; /* Texto blanco para contraste */
  font-weight: 500; /* Fuente semi-negrita */
  cursor: pointer;
  transition: background-color 0.3s; /* Transición suave */
}

button:hover {
  background-color: #0056b3; /* Color más oscuro al pasar el ratón */
}

/* Contenedor del enlace acortado */
.short-url-container {
  margin-top: 20px; /* Más espacio arriba */
  background-color: #e9ecef; /* Fondo sutil */
  padding: 15px; /* Más espacio interior */
  border-radius: 15px; /* Bordes redondeados */
  width: 90%; /* Ancho adaptativo */
  max-width: 500px; /* Máximo ancho */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Sombra más suave */
}

/* Estilo del enlace acortado */
.short-url {
  color: #007bff; /* Color primario */
  text-decoration: none; /* Sin subrayado */
  display: inline-block; /* Alineación correcta */
  word-break: break-all; /* Ajustar palabras correctamente */
}
</style>
