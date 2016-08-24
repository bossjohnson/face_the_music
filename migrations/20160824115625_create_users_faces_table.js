exports.up = function(knex, Promise) {
    return knex.schema.createTable('users_faces', function(table) {
        table.integer('users_id').references('users.id');
        table.integer('faces_id').references('faces.id');
        table.primary(['users_id', 'faces_id']);
    });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_faces');
};
