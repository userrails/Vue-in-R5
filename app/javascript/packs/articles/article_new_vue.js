import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  if (document.querySelector("#article-form") != null) {
    var app7 = new Vue({
      el: '#article-form',
      data: {
        form: {
          title: '',
          description: '',
        }
      }
    })
  }
})
