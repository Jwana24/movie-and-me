// modules
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

// components
import { getPosterApi } from '../API/TMDBApi';

const FilmItem = ({ movie }) => {
    return(
        <View style={styles.main_view}>
            <Image
                style={styles.image_movie}
                source={{ uri: getPosterApi(movie.poster_path) }}
            />
            <View style={styles.content_view}>
                <View style={styles.title_view}>
                    <Text style={styles.title_movie}>{movie.title}</Text>
                    <Text style={styles.vote_movie}>{movie.vote_average}</Text>
                </View>
                <Text
                    style={styles.description_movie}
                    // La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne
                    numberOfLines={6}
                >
                    {movie.overview}
                </Text>
                <Text style={styles.sorti_movie}>Sorti le {movie.release_date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        flexDirection: 'row',
        width: 350,
        marginBottom: 30,
    },
    image_movie: {
        flex: 1,
        height: 180,
        margin: 5,
    },
    content_view: {
        flex: 2,
        margin: 5,
    },
    title_view: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    title_movie: {
        flex: 4,
        paddingRight: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    vote_movie: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'right',
        color: 'grey',
    },
    description_movie: {
        flex: 1,
        paddingRight: 10,
        fontStyle: 'italic',
        color: 'grey',
    },
    sorti_movie: {
        textAlign: 'right'
    }
});

export default FilmItem;