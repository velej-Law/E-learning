\# Mare Vitae International - LMS Frontend



Este repositorio contiene el Frontend de la plataforma de e-Learning de Mare Vitae International. Está construido con \*\*Next.js 14 (App Router)\*\* y \*\*Tailwind CSS v4\*\*, siguiendo una arquitectura modular y orientada a componentes.



El proyecto simula actualmente la lógica de negocio con "Mock Data" y estados locales. El objetivo de este documento es guiar al equipo de Backend para realizar la integración con la API real.



\## Tech Stack



\* Framework: Next.js 14.x (App Router)

\* Lenguaje: TypeScript

\* Estilos: Tailwind CSS v4.0 (Configuración CSS-first en `globals.css`)

\* Iconos: Lucide React

\* Gestor de Paquetes: pnpm



\##  Guía de Inicio Rápido



1\.  \*\*Instalar dependencias:\*\*

&nbsp;   ```bash

&nbsp;   pnpm install

&nbsp;   ```



2\.  \*\*Correr servidor de desarrollo:\*\*

&nbsp;   ```bash

&nbsp;   pnpm dev

&nbsp;   ```

&nbsp;   El aplicativo estará disponible en `http://localhost:3000`.



---



\## Arquitectura del Proyecto



El proyecto utiliza \*\*Route Groups\*\* para separar layouts:



\* `app/(main)/`: Contiene todas las rutas autenticadas (Dashboard, Cursos, Perfil). Comparte el `layout.tsx` que incluye el \*\*Header\*\* de navegación.

\* `app/login/`: Ruta pública de autenticación. No tiene Header global.

\* `components/`: Librería de componentes reutilizables.

&nbsp;   \* `dashboard/`: Componentes específicos del inicio (Timeline, Calendar).

&nbsp;   \* `courses/`: Tarjetas y listas de cursos.

&nbsp;   \* `course-player/`: Lógica del aula virtual (Sidebar, Visor de tareas/video).

&nbsp;   \* `layout/`: Header y Footer.



---



\## Guía de Integración Backend (API Contracts)



A continuación se detallan los puntos críticos donde el Frontend espera datos dinámicos. Busquen los comentarios `// 🔴 BACKEND TODO` en el código fuente.



\### 1. Autenticación (Auth)



\* \*\*Login:\*\*

&nbsp;   \* \*\*Archivo:\*\* `app/login/page.tsx`

&nbsp;   \* \*\*Función:\*\* `handleSubmit`

&nbsp;   \* \*\*Acción:\*\* Reemplazar el `setTimeout` por un POST a su endpoint de login.

&nbsp;   \* \*\*Payload Esperado:\*\* `{ email: string, password: string }`

&nbsp;   \* \*\*Respuesta Esperada:\*\* JWT Token (debe guardarse en HttpOnly Cookie o LocalStorage).



\* \*\*Logout:\*\*

&nbsp;   \* \*\*Archivo:\*\* `components/layout/Header.tsx`

&nbsp;   \* \*\*Función:\*\* `handleLogout`

&nbsp;   \* \*\*Acción:\*\* Llamar al endpoint de invalidación de sesión y limpiar almacenamiento local.



\### 2. Dashboard (Área Personal)



\* \*\*Lista de Tareas (Línea de Tiempo):\*\*

&nbsp;   \* \*\*Archivo:\*\* `components/dashboard/TimelineList.tsx`

&nbsp;   \* \*\*Datos:\*\* Reemplazar `mockTasks` con un `fetch` al endpoint de tareas pendientes del usuario.

&nbsp;   \* \*\*Interfaz requerida:\*\*

&nbsp;       ```typescript

&nbsp;       interface Task {

&nbsp;         id: string;

&nbsp;         dateLabel: string; // "Lun. 30 de Mayo" (Formateado o fecha ISO)

&nbsp;         time: string;      // "09:00"

&nbsp;         title: string;

&nbsp;         type: "assignment" | "quiz" | "forum";

&nbsp;         courseName: string;

&nbsp;       }

&nbsp;       ```

&nbsp;   \* \*\*Navegación:\*\* El botón "Agregar entrega" ya está configurado para redirigir al Player con `?lessonId={id}`.



\### 3. Mis Cursos (Catálogo)



\* \*\*Listado:\*\*

&nbsp;   \* \*\*Archivo:\*\* `app/(main)/cursos/page.tsx`

&nbsp;   \* \*\*Datos:\*\* Reemplazar `courses` (array constante) por datos reales.

&nbsp;   \* \*\*Interfaz de Tarjeta (`CourseCard.tsx`):\*\*

&nbsp;       ```typescript

&nbsp;       interface CourseProps {

&nbsp;         id: string;

&nbsp;         title: string;

&nbsp;         instructor: string;

&nbsp;         parallel: string;

&nbsp;         imageSrc: string; // URL de la imagen

&nbsp;         progress: number; // 0 - 100

&nbsp;         slug: string;     // Para la URL amigable

&nbsp;       }

&nbsp;       ```



\### 4. Aula Virtual (Course Player)



Este es el módulo más complejo. Funciona como una SPA (Single Page Application) interna.



\* \*\*Estructura del Curso (Sidebar):\*\*

&nbsp;   \* \*\*Archivo:\*\* `components/course-player/CourseSidebar.tsx`

&nbsp;   \* \*\*Integración:\*\* Necesita recibir el árbol de módulos y lecciones del curso actual.

&nbsp;   \* \*\*Lógica:\*\* Al hacer clic en una lección, el componente padre (`page.tsx`) actualiza el contenido principal.



\* \*\*Subida de Tareas:\*\*

&nbsp;   \* \*\*Archivo:\*\* `components/course-player/AssignmentView.tsx`

&nbsp;   \* \*\*Acción:\*\* Implementar la lógica de Drag \& Drop para enviar archivos (PDF/Video) al endpoint de entregas.



\### 5. Perfil de Usuario



\* \*\*Carga de Avatar:\*\*

&nbsp;   \* \*\*Archivo:\*\* `app/(main)/perfil/page.tsx`

&nbsp;   \* \*\*Función:\*\* `handleFileChange`

&nbsp;   \* \*\*Estado Actual:\*\* Genera una `Blob URL` local para previsualización inmediata.

&nbsp;   \* \*\*Integración:\*\* Dentro de la función, enviar el objeto `File` a un endpoint (ej: S3 presigned URL o endpoint de subida) y recibir la URL final para actualizar el perfil del usuario.



---



\## Variables de Entorno



Crear un archivo `.env.local` en la raíz con las siguientes variables (ejemplo):



```bash

NEXT\_PUBLIC\_API\_URL=\[https://api.marevitae.com/v1](https://api.marevitae.com/v1)

NEXT\_PUBLIC\_CDN\_URL=\[https://cdn.marevitae.com](https://cdn.marevitae.com)

````



\## Notas de Diseño (Tailwind v4)



Este proyecto usa \*\*Tailwind CSS v4\*\*. No existe `tailwind.config.ts`.

Toda la configuración de tema (colores, fuentes, gradientes) se encuentra nativamente en:

`app/globals.css` bajo la directiva `@theme`.



&nbsp; \* \*\*Colores Principales:\*\*

&nbsp;     \* `--color-primary-turquoise`: \\#008B8B

&nbsp;     \* `--color-luxury-gold`: \\#D4AF37

&nbsp;     \* `--color-action-coral`: \\#FF6B6B



-----



\*\*Desarrollado por el equipo de Frontend de NEXORA para Mare Vitae International.\*\*



