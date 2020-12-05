exports.up = function(knex, Promise) {
    return knex.schema.createTable('rank_people', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('tipo').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rank_people');
  }