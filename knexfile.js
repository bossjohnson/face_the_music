module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost:5432/face_the_music'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }

};
