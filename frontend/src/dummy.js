import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/blog/blogs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPhotos(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <p>{photo.title}</p>
          {photo.description}
          {photo.author}
        </div>
      ))}
    </div>
  );
};
export default App;
