// Update with your config settings.

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost:5432/face_the_music'
    },

    production: {
        client: 'pg',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        }
    }

};
