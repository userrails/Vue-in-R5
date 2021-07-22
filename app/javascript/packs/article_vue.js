import Vue from 'vue/dist/vue.esm'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  var app7 = new Vue({
    el: '#article-form',
    data: {
      form: {
        title: '',
        description: '',
      }
    }
  })

  var article_list = new Vue({
    el: '#article-list',
    data: {
      articles: [],
      keyword: '',
    },
    created() {
      console.log('created')
    },
    mounted() {
      axios.get('/articles.json')
        .then(result => this.articles = result.data)
        .catch(error => console.log(error))
    },
    methods: {
      search() {
        axios.get(`/articles.json?keyword=${this.keyword}`)
          .then(result => this.articles = result.data)
          .catch(error => console.log(error))
      }
    }
  })

})
