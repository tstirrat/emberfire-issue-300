import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  projects: DS.hasMany('project', { async: true }),
});
