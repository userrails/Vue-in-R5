import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  var element = document.getElementById("article-nested-form")
  if (document.querySelector("#article-nested-form") != null) {
    var article = JSON.parse(element.dataset.article)
    var discussions_attributes = JSON.parse(element.dataset.discussionsAttributes)
    discussions_attributes.forEach(function(discussion) { discussion._destroy = null })
    article.discussions_attributes = discussions_attributes

    var article_nested_form = new Vue({
      el: element,
      data: {
        article: article,
      },
      methods: {
        addDiscussion: function() {
          this.article.discussions_attributes.push({
            id: null,
            title: "",
            description: "",
            _destroy: null
          })
        },
        removeDiscussion: function(index) {
          this.article.discussions_attributes.splice(index, 1)
        },
        saveArticle: function() {
          this.$http.post('/articles', { article: this.article }).then(response => {
            // either use turbolinks or window.location
            // window.location = `/articles/${response.body.id}`
            Turbolinks.visit(`/articles/${response.body.id}`)

            console.log(response)
          }, response => {
            console.log(response)
          })
        }
      }
    })
  }
})
