exports.up = function(knex, Promise) {
    return knex.schema.createTable('rank_films', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('director').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rank_films');
  }