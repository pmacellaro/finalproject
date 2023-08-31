import SquishCard from "./SquishCard"
function SquishList({squish,  setFavoriteSquishes, favoriteSquishes}) {

    const cards = squish.map((squish ) =>
        <SquishCard 
            key={squish.id}
            name={squish.name}
            image ={squish.image}
            bio ={squish.bio}
            toggleFavorite={() => setFavoriteSquishes(prevFavorites => [...prevFavorites, squish.id])}
            favoriteSquishes={favoriteSquishes}
            squish={squish}
/>)
    return (
    <div id="list-container">
        <div id="squish-list">
            {cards}
        </div>
    </div>
    )

}

export default SquishList