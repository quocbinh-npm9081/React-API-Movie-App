const apiCOnfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '73aee7353dd96eb98e84a66c7c2fcabf',
    originImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`
}

export default apiCOnfig;