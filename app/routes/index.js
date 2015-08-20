import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('post');
  },

  actions: {

    create() {
      var name = 'Post ' + Math.floor(Math.random() * 1000);
      var post = this.store.createRecord('post', {
        title: name,
        body: name
      });

      var comments = post.get('comments');

      var c = [
        `${name} - Comment 1`,
        `${name} - Comment 2`,
        `${name} - Comment 3`
      ];

      var promises = c.map((body) => {
        let comment = this.store.createRecord('comment', {
          body
        });

        comments.addObject(comment);

        return comment.save();
      });

      Ember.RSVP.Promise.all(promises)
        .then(() => {
          post.save();
        })
        .catch(e => console.error(e));

    }

  }
});
