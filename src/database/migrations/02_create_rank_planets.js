exports.up = function(knex, Promise) {
    return knex.schema.createTable('rank_planets', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('clima').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rank_planets');
  }