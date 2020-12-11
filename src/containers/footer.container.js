//@flow
import *as React from "react";
import {memo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type IFooterContainerNode={

}

const FooterContainerNode=(props:IFooterContainerNode):React.Node=>{



    return <div className="footer-chat">
            <div style={{
                backgroundColor:"#f6f6f6",
                border:"12px",
                display:"block",
                position:"relative",
                width:"100%",
                marginLeft:"10px",
                padding:0

            }}>

            <input type="text" className="write-message"  placeholder="Type your message here"/>
            </div>
            <div className={"icon send fa fa-paper-plane-o clickable"}>
                  <FontAwesomeIcon icon={"paper-plane"} style={{fontSize:"23px"}} size={"2x"}/>
            </div>
    </div>

};

export const Footer=memo(FooterContainerNode)
