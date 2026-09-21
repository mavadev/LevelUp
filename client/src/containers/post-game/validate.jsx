export const validate = input => {
  const error = {}

  if (!input.name) {
    error.name = 'Un juego sin nombre? Dale uno!'
  } else if (Number(input.name)) {
    error.name = 'El nombre no puede ser un número'
  } else if (Number(input.name[0])) {
    error.name = 'El nombre no puede comenzar con un número'
  } else error.name = ''

  if (!input.image) {
    error.image = 'Ingresa la url de una imagen.'
  } else if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(input.image)) {
    error.image = 'Tiene que ser una url válida'
  } else error.image = ''

  if (!input.description) {
    error.description = 'Contanos la histaria de tu juego'
  } else error.description = ''

  if (!input.released) {
    error.released = 'Nos angustia sabes cuando saldra, haznoslo saber!'
  } else error.released = ''

  if (!input.rating) {
    error.rating = 'Cuanto esperas que tenga tu juego?'
  } else if (input.rating > 5.0) {
    error.rating = 'No te pases, el maximo es 5'
  } else if (input.rating < 0.0) {
    error.rating = 'Ni que fuera tan malo tu juego'
  } else error.rating = ''

  if (!input.genres.length) {
    error.genres = 'Debes seleccionar al menos un genero'
  } else error.genres = ''

  if (!input.platforms.length) {
    error.platforms = 'Debes seleccionar al menos una plataforma'
  } else error.platforms = ''

  if (!input.tags.length) {
    error.tags = 'Debes seleccionar al menos un tag'
  } else error.tags = ''

  return error
}
