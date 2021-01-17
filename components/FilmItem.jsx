// modules
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

// components
import { getPosterApi } from '../API/TMDBApi';

const FilmItem = ({ movie }) => {
    return(
        <View style={styles.main_view}>
            {/* <Text style={styles.title_movie}></Text> */}
            <Image
                style={styles.image_movie}
                source={{ uri: getPosterApi(movie.poster_path) }}
            />
            <View style={styles.content_view}>
                <View style={styles.title_view}>
                    <Text style={styles.title_movie}>{movie.title}</Text>
                    <Text style={styles.vote_movie}>{movie.vote_average}</Text>
                </View>
                <View style={styles.description_view}>
                    <Text
                        style={styles.description_movie}
                        // La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne
                        numberOfLines={6}
                    >
                        {movie.overview}
                    </Text>
                </View>
                <View style={styles.sorti_view}>
                    <Text style={styles.sorti_movie}>Sorti le {movie.release_date}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_view: {
        flexDirection: 'row',
        height: 190,
        borderWidth: 1,
    },
    image_movie: {
        width: 120,
        height: 180,
        margin: 5,
    },
    content_view: {
        margin: 5,
        width: 350,
    },
    title_view: {
        flex: 1,
        flexDirection: 'row',
    },
    title_movie: {
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    vote_movie: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'grey',
    },
    description_view: {
        flex: 7,
    },
    description_movie: {
        fontStyle: 'italic',
        color: 'grey',
    },
    sorti_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});

export default FilmItem;