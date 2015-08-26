import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('project');
  },

  actions: {

    create() {
      var projectName = `Project ${Math.floor(Math.random() * 1000)}`;
      var project = this.store.createRecord('project', {
        name: projectName,
      });

      let user = this.store.createRecord('user', {
        name: `${projectName} user`
      });

      project.set('user', user);

      user.save()
        .then(() => project.save())
        .catch(e => console.error(e));;
    }

  }
});
