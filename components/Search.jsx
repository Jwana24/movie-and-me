// modules
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, ActivityIndicator } from 'react-native';

// components
import FilmItem from './FilmItem';
import { getApiMovies } from '../API/TMDBApi';

// jsx
const Search = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    let page = 0 // Compteur pour connaître la page courante
    let totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    let searchText = '';

    const handleChangeText = (text) => {
        searchText = text;
    }

    const isLoading = () => {
        if(loading){
            return(
                <View style={styles.loading_view}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    const loadFilms = () => {
        if(searchText.length > 0){
            setLoading(true);
            getApiMovies(searchText, page)
                .then((data) => {
                    page = data.page
                    totalPages = data.total_pages
                    setMovies([
                        ...movies,
                        ...data.results
                    ])
                    setLoading(false);
                })
        }
    }

    return(
        // Une "View" est en quelque sorte une "div" en React
        <View style={styles.view}>
            <TextInput
                style={styles.textinput}
                placeholder="Movie title"
                onChangeText={handleChangeText}
                // envoi de la requête au click du bouton "retour" (iOS) / "envoyer" (Android)
                onSubmitEditing={loadFilms}
            />
            <Button title="Rechercher" onPress={loadFilms} />
            <FlatList
                // on récupère ici les data
                data={movies}
                // comme sur React, toujours mettre la key
                keyExtractor={ (item) => item.id.toString() }
                // une sorte de .map en React : pour afficher nos éléments de nos data
                renderItem={ ({item}) => <FilmItem movie={item} /> }
                // on défini "onEndReached" à la moitié de l'affichage
                onEndReachedThreshold={0.5}
                // événement se déclenche selon "onEndReachedThreshold"
                onEndReached={() => {
                    if(page < totalPages){
                        loadFilms()
                    }
                }}
            />
            {isLoading()}
        </View>
    )
}

// css
const styles = StyleSheet.create({
    loading_view: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        width: '90%',
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
});

export default Search;