import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  var element = document.getElementById("article-nested-form")

  if (document.querySelector("#article-nested-form") != null) {

    var id = element.dataset.id
    var article = JSON.parse(element.dataset.article)
    var discussions_attributes = JSON.parse(element.dataset.discussionsAttributes)
    discussions_attributes.forEach(function(discussion) { discussion._destroy = null })
    article.discussions_attributes = discussions_attributes

    var article_nested_form = new Vue({
      el: element,
      data: {
        id: id,
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
          // if discussion is removed, then set _destroy flag to "1" so that it is removed while updating the record
          // otherwise keep as is
          var discussion = this.article.discussions_attributes[index]

          if (discussion.id == null) {
            this.article.discussions_attributes.splice(index, 1)
          } else {
              this.article.discussions_attributes[index]._destroy = "1"
          }
        },

        undoRemove: function(index) {
          this.article.discussions_attributes[index]._destroy = null
        },

        saveArticle: function() {
          // if article.id == null then it is new article elase we need to update
          if (this.id == null) { // add new article
            this.$http.post('/articles', { article: this.article }).then(response => {
              // either use turbolinks or window.location
              // window.location = `/articles/${response.body.id}`
              Turbolinks.visit(`/articles/${response.body.id}`)

              console.log(response)
            }, response => {
              console.log(response)
            })
          } else { // edit an article
            this.$http.put(`/articles/${this.id}`, { article: this.article }).then(response => {
              // either use turbolinks or window.location
              // window.location = `/articles/${response.body.id}`
              Turbolinks.visit(`/articles/${response.body.id}`)

              console.log(response)
            }, response => {
              console.log(response)
            })
          }

        }
      }
    })
  }
})
