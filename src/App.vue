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
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/* Declarar fuente y reiniciar estilos */
* {
    font-family: 'Courier Prime', monospace;
}
body {
  margin: 0;
  padding: 0;
}

/* Contenedor central */
.url-shortener {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 26rem;
  text-align: center;
  margin: 4rem;
  padding: 20px;
  background: linear-gradient(to bottom right, #004c9c, #1572d6);
  color: rgb(0, 0, 0);
  border-radius: 50px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
}

/* título */
.url-shortener h1 {
  color: #fff;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

/* formulario */
form {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

input, button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
}

/* inputs */
input {
  flex-grow: 1;
  border: 1px solid #ddd;
}

/* botones */
button {
  background-color: #fff;
  color: #007BFF;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ddd;
}

/* contenedor del enlace acortado */
.short-url-container {
  margin-top: 1.5rem;
  background: white;
  padding: 5px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

/* enlace acortado */
.short-url {
  color: #007BFF;
  text-decoration: none;
  display: inline-block;
  word-break: break-all;
  padding-bottom: 20px;
}
</style>