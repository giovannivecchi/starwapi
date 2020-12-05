exports.up = function(knex, Promise) {
    return knex.schema.createTable('rank_routes', function(table) {
      table.increments('id').primary();
      table.string('url').notNullable();
      table.string('router').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rank_routes');
  }