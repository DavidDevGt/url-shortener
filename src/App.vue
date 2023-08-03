<template>
  <div class="url-shortener">
    <h1>Acortador de URL</h1>
    <form @submit.prevent="shortenUrl">
      <input v-model="longUrl" type="text" placeholder="Ingresa tu URL aquí..." />
      <button type="submit">Acortar URL</button>
    </form>
    <p v-if="shortUrl">Tu URL acortada: <a :href="shortUrl" target="_blank">{{ shortUrl }}</a></p>
  </div>
</template>

<script>
import axios from 'axios';

class UrlShortenerService {
    constructor(httpClient = axios) {
        this.httpClient = httpClient;
    }

    async shorten(url) {
        const response = await this.httpClient.post('http://localhost:3000/shorten', { url });
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
                alert("Por favor, ingresa una URL válida para acortar");
                return;
            }

            try {
                this.shortUrl = await this.urlShortenerService.shorten(this.longUrl);
            } catch (error) {
                this.handleError(error);
            }
        },
        isValidUrl(url) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
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
.url-shortener {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

.url-shortener h1 {
  color: #333;
}

form {
  display: flex;
  gap: 10px;
}

input, button {
  padding: 10px;
  border: none;
  border-radius: 5px;
}

input {
  flex-grow: 1;
  border: 1px solid #ddd;
}

button {
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
