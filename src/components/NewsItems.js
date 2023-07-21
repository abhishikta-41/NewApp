// import React, { Component } from "react";
// export class NewsItems extends Component {
//   render() {
//     let { title, description, imageUrl, newsUrl, author, date, source } =
//       this.props;
//     return (
//       <div className="my-3">
//         <div className="card">
//           <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0' }}>
//             <span
//               className="badge rounded-pill bg-danger"
//             >
//               {source}
//             </span>
//           </div>
//           <img
//             src={
//               !imageUrl
//                 ? "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
//                 : imageUrl
//             }
//             className="card-img-top"
//             alt="..."
//           />
//           <div className="card-body">
//             <h5 className="card-title">
//               {title}...
//               <span className="badge badge-secondary bg-secondary">New</span>
//             </h5>
//             <p className="card-text">{description}...</p>
//             <p className="card-text">
//               <small className="text-muted">
//                 By {!author ? "unknown" : author} on{" "}
//                 {new Date(date).toGMTString()}{" "}
//               </small>
//             </p>
//             <a
//               rel="noreferrer"
//               href={newsUrl}
//               target="blank"
//               className="btn btn-sn btn-dark"
//             >
//               Read More
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsItems;



//****using function based */
import React from "react";
const NewsItems=(props)=>{

    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div style={{marginTop: '50px'}}>
				<div className="card my-2" style={{ width: "18rem" }}>
					<div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}><span className="badge rounded-pill bg-success" style={{ left: "90%", zIndex: "1" }}> {source} </span></div>

					<img className="card-img-top" src={!imageUrl ? "No image found" : imageUrl} alt="Image not available" />
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
						<p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small> </p>
						<a href={newsUrl} target="_blank" className="btn btn-sm btn-link">Read more</a>
					</div>
				</div>
			</div>
    );
  
}

export default NewsItems;
