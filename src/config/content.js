// Textos visibles centralizados. Reemplazar con la información real de Oldemar.
export const brand = {
  name: 'Oldemar',
  tagline: 'Instrucción de tiro',
  yearsExperience: 10,
  instagram: 'https://www.instagram.com/',
  phone: '+506 0000-0000',
  email: 'info@ejemplo.com',
  location: 'Costa Rica',
};

export const courses = [
  {
    id: 'pistola-9mm',
    title: 'Pistola 9 mm',
    level: 'Básico → Avanzado',
    description: 'Manejo seguro, fundamentos de puntería, control del gatillo, recarga y solución de fallas.',
  },
  {
    id: 'carabina',
    title: 'Carabina',
    level: 'Intermedio',
    description: 'Posiciones, uso de miras, tiro a distancia y transiciones con arma larga.',
  },
  {
    id: 'preparacion-examen',
    title: 'Preparación para examen',
    level: 'Para obtener permiso',
    description: 'Preparación teórica y práctica para la prueba de idoneidad en el manejo de armas.',
  },
  {
    id: 'defensa-personal',
    title: 'Tiro defensivo',
    level: 'Con permiso vigente',
    description: 'Tiro bajo presión, desenfunde seguro, toma de decisiones y escenarios.',
  },
];

export const steps = [
  { n: '01', title: 'Inscripción', text: 'Llenas el formulario con tus datos y tu situación de permisos.' },
  { n: '02', title: 'Revisión', text: 'Validamos tus documentos y te contactamos para coordinar.' },
  { n: '03', title: 'Seguridad', text: 'Charla obligatoria de normas de seguridad antes de disparar.' },
  { n: '04', title: 'Práctica', text: 'Entrenamiento guiado en línea de tiro con el instructor.' },
];

// Galería: coloca los archivos en /public/media y escribe aquí su nombre.
// type: 'image' | 'video'. Mientras src sea null se muestra un espacio reservado.
export const gallery = [
  { id: 'g1', type: 'video', src: null, poster: null, caption: 'Línea de tiro · 9 mm', size: 'tall' },
  { id: 'g2', type: 'image', src: null, caption: 'Clase de fundamentos', size: 'wide' },
  { id: 'g3', type: 'image', src: null, caption: 'Carabina a 50 m', size: 'normal' },
  { id: 'g4', type: 'image', src: null, caption: 'Charla de seguridad', size: 'normal' },
  { id: 'g5', type: 'video', src: null, poster: null, caption: 'Recarga y solución de fallas', size: 'wide' },
  { id: 'g6', type: 'image', src: null, caption: 'Grupo de graduados', size: 'normal' },
];

export const heroVideo = { src: null, poster: null }; // p. ej. { src: '/media/hero.mp4', poster: '/media/hero.jpg' }

export const requirements = [
  { title: 'Identificación', text: 'Cédula, DIMEX o pasaporte vigente. Mayor de 18 años.' },
  { title: 'Permiso de portación', text: 'Si ya lo tienes, trae el carné. Si no, te preparamos para obtenerlo.' },
  { title: 'Exámenes', text: 'Psicológico y teórico-práctico de idoneidad: te decimos en qué paso estás.' },
  { title: 'Equipo de protección', text: 'Protección auditiva y visual obligatoria. Te prestamos si no tienes.' },
];
