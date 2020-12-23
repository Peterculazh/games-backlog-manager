const dev = process.env.NODE_ENV === 'dev';

const config = {
    jwtSecret: "test",
    dev,
    port: dev ? 3000 : 8000,
    db: {

        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "root",
        database: "test",
        entities: [
            __dirname + '/entity/*.ts'
        ],
        synchronize: true,
        logging: true
    }
}

export default config;