import React, { Fragment, useState, useEffect } from "react";
import '../stylesheets/searchpage.css';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const parser = require('fast-xml-parser');

    useEffect(() => {
        if (searchQuery.length > 0) {
            const apiKey = "iVMi7uEi9GrIxbrIYWqSJw";
            const apiUrl = "https://www.goodreads.com/search/index.xml?" + "key=" + apiKey + "&q=" + searchQuery;

            fetch(apiUrl)
                .then(response => response.text())
                .then((response) => {
                    const parsedJson = parser.validate(response);

                    if (parsedJson !== true) console.log(parsedJson.err);
                    const queryResult = parser.parse(response);

                    setQueryResults(queryResult);
                },
            )
        }

    }, [searchQuery]);
    
    const searchBox = () => {
        return (
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search The Chamber of Books!"
                    value={searchQuery}
                    onChange={handleChange}
                />
            </div>
        )
    }

    const searchResults = () => {
        queryResults.GoodreadsResponse.search.results.work.map(item => (
            <div>
                <h2>You're a wizard, Harry:</h2>
                <li key={item}>{item.best_book.title}</li>
            </div>
        ));
    }

    const handleChange = event => {
        setSearchQuery(event.target.value);
    }

    return (
        <Fragment>
            {searchBox()}
        </Fragment>
    )
}

export default SearchPage;