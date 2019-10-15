import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux'


const withErrorHandler = (ErrorHandler, axios) => {

    return props => {

        const [errorState, setErrorState] = useState(null);

        
            const req = axios.interceptors.request.use(req => {
                setErrorState(null)
                return req;
            })

            const res = axios.interceptors.response.use(res => res, error => {
                setErrorState(error)
            }) 
        


        useEffect(() =>{
            return () => {
                axios.interceptors.request.eject(req)
                axios.interceptors.response.eject(res)
            }
        }, [req, res])

        const closeErrorHandler = () => {
            setErrorState(null)
        }

       
            return (
                <Aux>
                    <Modal
                    show={errorState}
                     modalClosed={closeErrorHandler}>
                        {errorState ? errorState.message : null}
                    </Modal>
                    <ErrorHandler {...props}/>
                </Aux>
            )
        
    }
}


export default withErrorHandler;

