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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState('');

    const handleChangeText = (text) => {
        setPage(1);
        setMovies([]);
        setSearchText(text);
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
                    setTotalPages(data.total_pages);
                    setMovies([
                        ...movies,
                        ...data.results
                    ])
                    setLoading(false);
                })
        }
    }

    const searchFilms = () => {
        setMovies([]);
        setPage(1);
        loadFilms();
    }

    useEffect(() => {
        if(page < totalPages){
            loadFilms();
        }
    }, [page]);

    return(
        // Une "View" est en quelque sorte une "div" en React
        <View style={styles.view}>
            <TextInput
                style={styles.textinput}
                placeholder="Movie title"
                onChangeText={handleChangeText}
                // envoi de la requête au click du bouton "retour" (iOS) / "envoyer" (Android)
                onSubmitEditing={searchFilms}
            />
            <Button
                style={styles.buttonSearch}
                title="Rechercher"
                onPress={searchFilms}
            />
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
                    setPage(page + 1)
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
        alignItems: 'center',
        marginTop: 30
    },
    textinput: {
        width: '90%',
        padding: 15,
        borderRadius: 50,
        borderColor: '#b2bec3',
        borderWidth: 1,
    },
    buttonSearch: {
        color: '#2d3436',
    }
});

export default Search;