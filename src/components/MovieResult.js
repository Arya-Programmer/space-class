
const MovieResult = ({ movies }) => {
    console.log(movies)
    console.log(`The movies are in the MovieResult component: ${movies}`);
    return (
        <div>
            {
                movies.map(movie =>
                    <div>
                        {movie.label}
                    </div>
                )
            }
        </div>
    );
}


export default MovieResult;

