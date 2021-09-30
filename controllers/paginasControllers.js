import {Viaje} from '../models/Viaje.js';
import { Opinion } from '../models/Opiniones.js';

const paginaInicio = async (req, res) => { // req(lo que enviamos o pedimos) res(lo que express nos responde)
    // Consultar 3 viajes del modelo viaje
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Opinion.findAll({limit: 3}));

    try {
        const resultado = await Promise.all(promiseDB);
        
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            opiniones: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }    
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    // Consultar DB
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaOpiniones = async (req, res) => {
    try {
        const opiniones = await Opinion.findAll();

        res.render('opiniones', {
            pagina: 'Opiniones',
            opiniones
        });
    } catch (error) {
        console.log(error);
    }    
}

// Mostrar un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where: {slug}});

        res.render('viaje', {
            pagina: 'Información del Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio, paginaNosotros, paginaViajes, paginaOpiniones, paginaDetalleViaje
}