import {Opinion} from '../models/Opiniones.js';

const guardarOpinion = async (req, res) => {
    // Validar
    const {nombre, correo, mensaje} = req.body;
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacío'});
    }
    if(correo.trim() === '') {
        errores.push({mensaje: 'El correo está vacío'});
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje está vacío'});
    }
    
    if(errores.length > 0) {
        // Consultar opiniones existentes
        const opiniones = await Opinion.findAll();

        // Mostrar la vista con errores
        res.render('opiniones', {
            pagina: 'Opiniones',
            errores,
            nombre,
            correo,
            mensaje,
            opiniones
        })
    } else {
        // Almacenarlo en la DB
        try {
            await Opinion.create({
                nombre, correo, mensaje
            });
            res.redirect('/opiniones');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarOpinion
}