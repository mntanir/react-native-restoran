import axios from "axios";

export default axios.create({
    baseURL:'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer Km9sE9rj-bgIeN3DCvyhP1KgPedfX9F-ieqLIJ8FHnWc_AxCXHtA6F6iDAddrLmutLTFDXk0dqtV6jCdFlOi6op5a5YS7ZOEFh-30DzLEKMvdk0EIRKvU58_P8TMZXYx'
    }
})