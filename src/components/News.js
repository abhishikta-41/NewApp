// import React, { Component } from "react";
// import NewsItems from "./NewsItems";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 8,
//     category: "general",
//   };
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       totalResults: 0,
//     };
//     document.title = `${this.capitalizeFirstLetter(
//       props.category
//     )} - NewsMonkey`;
//   }

//   async updateNews() {
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     props.setProgress(70);
//     console.log(parsedData);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });
//     props.setProgress(100);
//   }

//   async componentDidMount() {
//     this.updateNews();
//   }

//   // handlePrevClick = async () => {
//   //   this.setState({ page: page - 1 });
//   //   this.updateNews();
//   // };
//   // handleNextClick = async () => {
//   //   this.setState({ page: page + 1 });
//   //   this.updateNews();
//   // };

//   fetchMoreData = async () => {
//     this.setState({ page: page + 1 });
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       articles: articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//     });
//   };

//   render() {
//     return (
//       <>
//         <h1 className="text-center" style={{ margin: "35px 0px" }}>
//           NewsMonkey - Top {this.capitalizeFirstLetter(props.category)}{" "}
//           Headlines
//         </h1>
//         {loading && <Spinner />}
//         <InfiniteScroll
//           dataLength={articles.length}
//           next={this.fetchMoreData}
//           hasMore={articles.length !== totalResults}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row">
//               {
//                 /*!loading &&*/ articles?.map(
//                   (element,index) => {
//                     return (
//                       <div className="col-md-4" key={index}>
//                         <NewsItems
//                           title={
//                             element.title ? element.title.slice(0, 45) : ""
//                           }
//                           description={
//                             element.description
//                               ? element.description.slice(0, 88)
//                               : ""
//                           }
//                           imageUrl={element.urlToImage}
//                           newsUrl={element.url}
//                           author={element.author}
//                           date={element.publishedAt}
//                           source={element.source.name}
//                         />
//                       </div>
//                     );
//                   }
//                 )
//               }
//             </div>
//           </div>
//         </InfiniteScroll>

//         {/* <div className="container d-flex justify-content-between">
//           <button
//             disabled={page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePrevClick}
//           >
//             &larr; Previous
//           </button>
//           <button
//             disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextClick}
//           >
//             Next &rarr;
//           </button>
//         </div> */}
//       </>
//     );
//   }
// }

// export default News;

//*****using function based */
import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
		props.setProgress(10);
		var options = {
			method: 'GET',
			url: 'https://api.newscatcherapi.com/v2/search',
			params: { q: `${props.category}`, lang: 'en', sort_by: 'relevancy', page: `${page + 1}` },
			headers: {
				'x-api-key': `${props.apiKey}`
			}
		};

		axios.request(options).then(function (response) {
			let data = response.data;
			props.setProgress(30);
			setArticles(data.articles)
			setTotalResults(data.totalResults)
			setLoading(false)
			props.setProgress(70);
			console.log(data)
			props.setProgress(100);
		}).catch(function (error) {
			console.error(error);
		});
	}
	useEffect(() => {
		updateNews();
		document.title = `${capitalizeFirstLetter(props.category)}-NewsApp`
	}, [props.category,updateNews])

	const fetchMoreData = async () => {
		var options = {
			method: 'GET',
			url: 'https://api.newscatcherapi.com/v2/search',
			params: { q: `${props.category}`, lang: 'en', sort_by: 'relevancy', page: `${page + 1}` },
			headers: {
				'x-api-key': `${props.apiKey}`
			}
		};

		axios.request(options).then(function (response) {
			let data = response.data;
			setArticles(articles.concat(data.articles))
			setTotalResults(data.totalResults)
			setPage(page + 1)
		}).catch(function (error) {
			console.error(error);
		});
	}

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {
              /*!loading &&*/ articles?.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.media}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.published_date}
                      sourse={element.rights}
                    
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
