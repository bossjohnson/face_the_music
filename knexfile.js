// Update with your config settings.

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost:5432/face_the_music'
    },

    production: {
        client: 'pg',
        connection: {
            database: process.env.RDS_DB_NAME
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            host: process.env.RDS_HOSTNAME,
            port: process.env.RDS_PORT
        }
    }

};
