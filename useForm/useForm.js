import { useState } from "react"

export const useForm = ( initialState = {} ) => {

    //  los custom hook tienen gran poder para ayudarnos a centralizar la lógica de nuestra aplicacion

    const [values, setValues] = useState(initialState);

    //  reset formulario
    const reset = () => {
        setValues(initialState);
    }

    //  desestructuramos el target del e - Evento
    //  utilizamos propiedades computadas para asignar nombre propiedad
    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }


    //  enviamos el retorno de nuestro custom hook en un arreglo
    //  enviamos los valores y la funcion handleInputChange
    return [ values, handleInputChange, reset ];
}
