//@flow
import *as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {memo} from "react";
import '../assets/chat.css';


type ISearchContainer={

}

const SearchContainerNode=(props:ISearchContainer)=>{

    return <div className="discussion search">
        <div className="searchbar">
                      <FontAwesomeIcon icon={"search"}/>
            <input type="text" placeholder="ara..."></input>
        </div>
    </div>
}

export const Search=memo(SearchContainerNode)


