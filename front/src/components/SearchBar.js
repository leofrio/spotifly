import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ placeholder, data,addsongs,playlistId}) {
    const [dataFiltrada, setdataFiltrada] = useState([]);
    const searchInput=React.createRef()
    const handleFilter = (event) => {
        const buscarPalavra = searchInput.current.value
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(buscarPalavra.toLowerCase());
        });

        if (buscarPalavra === "") {
            setdataFiltrada([]);
        } else {
            setdataFiltrada(newFilter);
        }
    };
    if(addsongs) { 
        return (
            <div className="search">
                <div className="searchInputs">
                    <input
                        ref={searchInput}
                        type="text"
                        placeholder={placeholder}
                        onChange={handleFilter}
                    />
    
                </div>
                {dataFiltrada.length != 0 && (
                    <div className="dataResult">
                        {dataFiltrada.map((value, key) => {
                            return (
                                <Link className="dataItem" to={`/SearchResults/${value.title}/${playlistId}`}>
                                    <p>{value.title} </p>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    } 
    else { 
        return (
            <div className="search">
                <div className="searchInputs">
                    <input
                        ref={searchInput}
                        type="text"
                        placeholder={placeholder}
                        onChange={handleFilter}
                    />
    
                </div>
                {dataFiltrada.length != 0 && (
                    <div className="dataResult">
                        {dataFiltrada.map((value, key) => {
                            return (
                                <Link className="dataItem" to={`/SearchResults/${value.title}`}>
                                    <p>{value.title} </p>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

export default SearchBar;