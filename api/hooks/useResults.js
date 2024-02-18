import { useEffect, useState } from "react";
import yelp from "../yelp";

export default () => {
    
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState('')

    const searchApi = async(searchTerm) => {
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'İstanbul'
                }
            });
            setResults(response.data.businesses);
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Bağlantı Hatası');
        }

    }
    
    useEffect(() => {
        searchApi('pide');
    },[]);

    return [searchApi, results, errorMsg];
}