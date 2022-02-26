import { useEffect, useRef, useState } from "react";

export const useFetch = ( url ) => {


    //  useRef lo utilizaremos para que mantenga la referencia cuando este hook
    //  está vivo o cuando el componente que lo usa sigue montado.
    const isMounted = useRef(true);

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {

        //  cuerpo del effect

        //  se ejecuta cuando el componente es desmontado
        return () => {

            //  este cambio no disparará la renderización nuevamente de mi componente
            //  solo se mantiene la referencia al mismo
            isMounted.current = false;
        }

    }, []);

    useEffect( () => {

        setState({ loading: true, error: null, data: null });

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {


                if ( isMounted.current ) {

                    setState({
                        loading: false,
                        error: null,
                        data: data
                    });
                }

            })
            .catch( () => {

                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                });

            });


        // const getDataApi = async () => {

        //     const resp = await fetch( url );
        //     const data = await resp.json();
        //     // console.log(data);
        //     // setTimeout(() => {

        //     //     //  si el componente está montado entonces cambio el estado
        //     //     //  caso contrario no hacemos nada, ya que el componente ya ha sido desmontado
        //     //     if ( isMounted.current ) {

        //     //         setState({
        //     //             loading: false,
        //     //             error: null,
        //     //             data: data
        //     //         });
        //     //     } else {
        //     //         console.log('setState no se llamó');
        //     //     }

        //     // }, 4000);

        //     if ( isMounted.current ) {

        //         setState({
        //             loading: false,
        //             error: null,
        //             data: data
        //         });
        //     }
        // }

        //  ejecutamos la funcion
        // getDataApi()

    }, [url]);


    return state;
}
