exports.up = function(knex, Promise) {
    return knex.schema.createTable('faces', function(table) {
        table.increments();
        table.string('url');
        table.decimal('smile');
        table.string('gender');
        table.decimal('age');
        table.decimal('moustache');
        table.decimal('beard');
        table.decimal('sideburns');
        table.string('glasses');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('faces');
};
