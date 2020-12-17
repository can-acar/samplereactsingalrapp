//@flow
import * as React from "react";
import {memo, useState, useCallback} from "react";
import {useDispatch} from "react-redux";
import {onGirisAction} from "../actions/giri.action";
import {useSelectState} from "../commons/useSelectState";
import {uuid} from "../commons/uuid";
import {giris_redux} from "../store/giri.redux";

import "../assets/giris.css"


type IGirisContainer = {}


const GirisContainerNode = (props: IGirisContainer): React.Node => {

    const [form: { name: string }, updateForm: void] = useState({name: undefined})

    const giris = useSelectState({key: 'giris', reducer: giris_redux})

    const dispatch = useDispatch()

    const onFormUpdate = useCallback((event) => {
        event.preventDefault()

        const {name, value} = event.target

        updateForm({[name]: value})

    }, [updateForm])

    const onFormSubmit = useCallback((event) => {
        event.preventDefault()

        dispatch(onGirisAction({
            ...form,
            clientId: uuid()
        }))

    }, [giris, form, dispatch, onGirisAction, uuid])


    return <div className="wrapper">
                <form className="form-signin" onSubmit={onFormSubmit} onChange={onFormUpdate}>
                    <h2 className="form-signin-heading">React Signalr Sample Chat App</h2>
                    <input id="username" type="text" className="form-control" name="username" placeholder="Kullanıcı Adı" required="" autoFocus=""/>
                    <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">Giriş</button>
                </form>
            </div>
}


export const Giris = memo(GirisContainerNode)
