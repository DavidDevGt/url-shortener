<template>
  <div class="url-shortener">
    <h1>URL Acortador</h1>

    <form @submit.prevent="shortenUrl">
      <input type="url" v-model="longUrl" placeholder="Pega la URL que quieres acortar" required />
      <button type="submit">Acortar</button>
    </form>

    <p v-if="shortUrl">URL acortada: {{ shortUrl }}</p>
  </div>
</template>


  <script>
    import axios from 'axios';

    export default {
      data() {
        return {
          longUrl: '',
          shortUrl: ''
        };
      },
      methods: {
        async shortenUrl() {
          const response = await axios.post('http://localhost:3000/shorten', { url: this.longUrl });
          this.shortUrl = response.data.shortUrl;
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
    }

    form {
      display: flex;
      gap: 10px;
    }

    input, button {
      padding: 10px;
    }

    button {
      cursor: pointer;
    }
  </style>