const DisplayFilm = ({ x }) => {
  return (
    <div key={x.id}>
      <h1 className="text-2xl font-bold">{x.title}</h1>
      <img
        src={x.alternate || "No image available"}
        alt={`Image of ${x.title}`}
        className="mt-2 rounded-md"
      />
      <div className="mt-2">
        <h1 className="text-lg font-bold">Description</h1>
        <p>{x.description ? x.description : "No description found"}</p>
      </div>
      <div className="mt-2">
        <a href={x.trailer} className="text-blue-500 hover:underline">
          Trailer for {x.title}
        </a>
      </div>
      <div>
        <p>{x.rating}</p>
      </div>
    </div>
  );
};

export default DisplayFilm;
