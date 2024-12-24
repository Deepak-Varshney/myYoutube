// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import Video from '../pages/Video';
// // const SearchResults = () => {
// //   const { searchQuery } = useParams();
// //   const [videos, setVideos] = useState([]);

// //   useEffect(() => {
// //     const fetchSearchResults = async () => {
// //       try {
// //         const response = await axios.get(`/api/videos/search?q=${searchQuery}`);
// //         setVideos(response.data.videos);
// //       } catch (error) {
// //         console.error('Error fetching search results:', error);
// //       }
// //     };

// //     fetchSearchResults();
// //   }, [searchQuery]);

// //   return (
// //     <div className="mt-20 p-4">
// //       <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {videos.length > 0 ? (
// //           videos.map((video) => (
// //             <Video key={video._id} video={video} />
// //           ))
// //         ) : (
// //           <p>No results found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchResults;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';  // Import useLocation instead of useParams
// import axios from 'axios';
// import Video from '../pages/Video';

// const SearchResults = () => {
//   // useLocation to get query parameters
//   const { search } = useLocation();
//   const [videos, setVideos] = useState([]);
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     const searchParams = new URLSearchParams(search);
//     const q = searchParams.get('q') || '';  // Extract the 'q' parameter from the URL

//     setQuery(q);  // Set the search query to state

//     const fetchSearchResults = async () => {
//       try {
//         const response = await axios.get(`/api/videos/search?q=${q}`);
//         setVideos(response.data.videos);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//       }
//     };

//     if (q) {
//       fetchSearchResults();
//     }
//   }, [search]);  // Rerun the effect when the search query changes

//   return (
//     <div className="mt-20 p-4">
//       <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.length > 0 ? (
//           videos.map((video) => (
//             <Video key={video._id} video={video} />
//           ))
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;


import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Video from '../pages/Video';
import { ThreeDots } from 'react-loader-spinner'; // Import loader component

const SearchResults = () => {
  const { search } = useLocation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  // Get the query from the URL (using useLocation instead of useParams)
  const searchQuery = new URLSearchParams(search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true); // Set loading to true when the request starts
        const response = await axios.get(`/api/videos/search?q=${searchQuery}`);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div className="mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>

      {/* Show loader while fetching data */}
      {loading ? (
        <div className="flex justify-center items-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#FF0000"  // YouTube red color
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.length > 0 ? (
            videos.map((video) => (
              <Video key={video._id} video={video} />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
