const GetJobs = () => {
    const url = 'https://jsearch.p.rapidapi.com/search?query=Python%20developer%20in%20Texas%2C%20USA&page=1&num_pages=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0a83db6b8fmsh7ba7ea08a0d83e4p1fa8bajsn9f10a557064a',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
    return fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export default GetJobs;