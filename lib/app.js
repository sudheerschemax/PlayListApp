var path = require('path');
var express = require('express');
var slashes = require('connect-slashes');
var cors = require('cors');
var Songs = require('./songs');
const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');

var STATIC_DIR = path.join(__dirname, '../client/build');

const schema = buildSchema(`
    type Query {
        library(id: Int): Song,
        libraries(search: String): [Song],
        playlist(id: Int!): Playlist,
        playlists: [Playlist]
    }
    type Mutation {
        createPlaylist(name: String!, songs: [Int]): PlaylistResponse,
        editPlaylist(id: Int!, name: String, songs: [Int]): PlaylistResponse,
        deletePlaylist(id: Int!): PlaylistResponse
    }
    type Song {
        id: Int!,
        album: String!,
        duration: Int!,
        title: String!,
        artist: String!
    }
    type Playlist {
        id: Int!,
        name: String!,
        songs: [Song]
    }
    type PlaylistResponse {
        id: Int!
    }
`);


const rootResolver = {
    library: async req => await app.get('/library', function(req, res) {
        var data = library.getLibrary();
        res.json(data);
    }),
    libraries: async req => await app.get('/library', function(req, res) {
        var data = library.getLibrary();
        res.json(data);
    }),
    playlist: async req => await  app.get('/playlist/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = library.getPlaylist(id);

        res.json(data);
    }),
    playlists: async () => await app.get('/playlist', function(req, res) {
        var data = library.getPlaylists(function(err, playlists) {
            res.json(playlists);
        });
    }),
    createPlaylist: async ()  => await app.post('/playlist', function(req, res) {
        var data = req.body;

        console.dir(data)
        console.dir(req.headers);

        var name = data.name
        var songs = data.songs

        library.savePlaylist(null, name, songs, function(err, id) {
            res.json({
                id: id
            });
        });
    })
};
module.exports = function createApp(options) {
    var library = new Songs(path.join(__dirname, '..', 'data'));

    var app = express();
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.static(STATIC_DIR));
    app.use(slashes(false));
 
    app.use(cors());

    app.get('/library', function(req, res) {
        var data = library.getLibrary();
        res.json(data);
    });

    app.get('/library/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = library.getSong(id);

        res.json(data);
    });

    app.get('/playlist', function(req, res) {
        var data = library.getPlaylists(function(err, playlists) {
            res.json(playlists);
        });
    });

    app.post('/playlist', function(req, res) {
        var data = req.body;

        console.dir(data)
        console.dir(req.headers);

        var name = data.name
        var songs = data.songs

        library.savePlaylist(null, name, songs, function(err, id) {
            res.json({
                id: id
            });
        });
    });

    app.get('/playlist/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = library.getPlaylist(id);

        res.json(data);
    });

    app.post('/playlist/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = req.body;

        var name = data.name
        var songs = data.songs 

        library.savePlaylist(id, name, songs, function(err, id) {
            res.json({
                id: id
            });
        });
    });

    app.delete('/playlist/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        var data = library.deletePlaylist(id);
        res.status(200);
        res.json({});
    });

    return app;
};