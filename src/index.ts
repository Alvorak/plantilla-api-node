import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

console.clear();

type CastT = {
    name: string;
    role: string;
    age: number;
    nationality: string;
    roles: string[];
};

type FilmType = {
    id: string;
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
    rating: number;
    recordingFormat: string[];
    cast: CastT[];
};



const pelicula: FilmType = {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    genre: "Science Fiction",
    rating: 8.8,
    recordingFormat: ["IMAX"],
    cast: [
        {
            name: "Leonardo DiCaprio",
            role: "Dom Cobb",
            age: 45,
            nationality: "American",
            roles: ["Actor", "Producer"]
        },
        {
            name: "Joseph Gordon-Levitt",
            role: "Arthur",
            age: 39,
            nationality: "American",
            roles: ["Actor"]
        },
        {
            name: "Ellen Page",
            role: "Ariadne",
            age: 33,
            nationality: "Canadian",
            roles: ["Actor"]
        }
    ]
};


const typoDefs = `#graphql
type Pelicula {
    id: ID!
    title: String!
    director: String!
    releaseYear: Int!
    genre: String!
    rating: Float!
    recordingFormat: [String!]!
    cast: [Cast!]!
}

type Cast {
    name: String!
    role: String!
    age: Int!
    nationality: String!
    roles: [String!]!
}

type Query {
    getPeliculas: [Pelicula!]!
    getPelicula(id: ID!): Pelicula
}
`;

export { typoDefs, pelicula };

const resolvers = {
    Query: {
        getPeliculas: () => {
            // Aquí puedes implementar la lógica para obtener todas las películas
            // Por ejemplo, podrías buscar en una base de datos o en un arreglo de películas
            return [pelicula];
        },
        getPelicula: (_: any, { id }: { id: string }) => {
            // Aquí puedes implementar la lógica para obtener la película por ID
            // Por ejemplo, podrías buscar en una base de datos o en un arreglo de películas
            if (id === "1") {
                return pelicula;
            }
            return null;
        }
    }
};

const server = new ApolloServer({
    typeDefs: typoDefs,
    resolvers: resolvers
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    });
    console.log(`Servidor GraphQL iniciado en ${url}`);
};


startServer();


console.log("Pelicula:", resolvers.Query.getPelicula(null, { id: "1" })); 

console.log("Peliculas:", resolvers.Query.getPeliculas());  
