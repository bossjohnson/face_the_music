exports.up = function(knex, Promise) {
    return knex.schema.createTable('faces', function(table) {
        table.increments();
        table.string('url');
        table.decimal('smile', 2);
        table.string('gender');
        table.decimal('age', 3);
        table.decimal('moustache', 2);
        table.decimal('beard', 2);
        table.decimal('sideburns', 2);
        table.string('glasses');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('faces');
};
