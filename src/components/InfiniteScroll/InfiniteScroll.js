import React, { useEffect, useState, useRef  } from 'react';

const divStyle = {
    color: 'black',
    height: '100vh',
    textAlign: 'center',
    padding: '4rem',
    border: '1px solid black',
    marginTop: '15px'
};


const containerStyle = {
    maxWidth: '100%',
    margin: '0 auto',
}
const InfiniteScroll = () => {
    const [postList, setPostList] = useState({
        list: ["Hello World!"]
    }); 
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
         const observer = new IntersectionObserver(handleObserver, options);
         if (loader.current) {
            observer.observe(loader.current)
         }

    }, []);


    useEffect(() => {
        const newList = postList.list.concat(["Hello World!","Hello World!","Hello World!","Hello World!"]);
        setPostList({
            list: newList
        })
    }, [page])
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
    }


    return (<div className="container" style={containerStyle}>
        <div className="post-list">
            {
                postList.list.map((post, index) => {
                    return (<div key={index} className="post" style={divStyle}>
                        <h1 className="display-1"> {post} </h1>
                    </div>)
                })
            }
            <div className="loading" ref={loader}>
                    <h2>Loading .....</h2>
           </div>
        </div>
    </div>)
}

export default InfiniteScroll;