import { StyleSheet, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import useResults from '../api/hooks/useResults'
import ResultsList from '../components/ResultsList';


export default function SearchScreen() {

    const [searchApi, results, errorMsg] = useResults();

    const [term, setTerm] = useState('');

    const filterResultsByPrice = (price) => {
        return results.filter((result) => {
            return result.price === price;
        })
    }

    const handleSelectItem = (item) => {
        searchApi(item);
      };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={() => searchApi(term)}     
            onSelectItem={handleSelectItem}       
        />
          {errorMsg ? <Text>{errorMsg}</Text> : null}
          {results.length === 0 ? (
              <Text style={{ marginLeft: 15 }}>Arama sonuçları bulunamadı.</Text>
          ) : (
              <>
                  {results.filter(result => result.price === "₺").length > 0 ? (
                      <ResultsList
                          title='Ucuz Restoranlar'
                          results={filterResultsByPrice("₺")}
                      />
                  ) : (
                      null
                  )}
                  {results.filter(result => result.price === "₺₺").length > 0 ? (
                      <ResultsList
                          title='Uygun Restoranlar'
                          results={filterResultsByPrice("₺₺")}
                      />
                  ) : (
                      null
                  )}
                  {results.filter(result => result.price === "₺₺₺").length > 0 ? (
                      <ResultsList
                          title='Pahalı Restoranlar'
                          results={filterResultsByPrice("₺₺₺")}
                      />
                  ) : (
                      null
                  )}
              </>
          )}
      </ScrollView>
  )
} 

const styles = StyleSheet.create({})