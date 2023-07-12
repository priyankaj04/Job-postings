const GetJobs = () => {
    const url = 'https://jsearch.p.rapidapi.com/search?query=Python%20developer%20in%20Texas%2C%20USA&page=1&num_pages=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2a0d554d26msh87bc160abec0f9ep1dc4a9jsn11cd169b16a3',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
    return fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export default GetJobs;