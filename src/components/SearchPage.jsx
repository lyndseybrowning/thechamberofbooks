import React, { Fragment, useState, useEffect } from "react";
import parser from "fast-xml-parser";
import "../stylesheets/searchpage.css";

const { REACT_APP_API_KEY } = process.env;

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const apiUrl = `https://www.goodreads.com/search/index.xml?key=${REACT_APP_API_KEY}&q=${searchQuery}`;

            fetch(apiUrl)
                .then((response) => response.text())
                .then((response) => {
                    const parsedJson = parser.validate(response);

                    if (parsedJson !== true) console.log(parsedJson.err);
                    const queryResult = parser.parse(response);

                    // TODO: validate returned object
                    setQueryResults(
                        queryResult.GoodreadsResponse.search.results.work,
                    );
                });
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
        );
    };

    const searchResults = () => {
        if (queryResults.length === 0) {
            return <p>No results found.</p>;
        }

        return (
            <ul>
                {queryResults.map((item) => (
                    <li key={item}>{item.best_book.title}</li>
                ))}
            </ul>
        );
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Fragment>
            {searchBox()}
            {searchResults()}
        </Fragment>
    );
};

export default SearchPage;
