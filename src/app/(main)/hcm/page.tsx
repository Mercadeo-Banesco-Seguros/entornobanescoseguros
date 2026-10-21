'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  HelpCircle,
  Pill,
  MapPin,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const hcmActions = [
    {
        title: "Solicitar Medicinas",
        description: "Solicita el envío de tus medicamentos a domicilio o farmacia.",
        icon: Pill,
        href: "https://www.banescoseguros.com/salud-integral/",
    },
    {
        title: "Buscar Proveedores",
        description: "Encuentra médicos y clínicas en nuestra red de afiliados.",
        icon: MapPin,
        href: "https://www.banescoseguros.com/personas-aliados-vitales-para-tu-salud/",
    },
    {
        title: "Consultar Cobertura",
        description: "Revisa los detalles y beneficios de tu póliza de salud.",
        icon: ShieldCheck,
        href: "https://www.banescosegurosonline.com/ibProfile/authentication/loginPage",
    },
    {
        title: "Calculadora de Excesos",
        description: "Calcula los montos excedentes de tus gastos médicos.",
        icon: Calculator,
        href: "https://www.banescosegurosonline.com/ibProfile/authentication/loginPage",
    }
];

const faqItems = [
    {
        value: "item-1",
        question: "¿Qué debo hacer en caso de una emergencia médica?",
        answer: "En una emergencia, dirígete a la clínica afiliada más cercana y presenta tu cédula de identidad. Luego, contacta a nuestro centro de atención telefónica al 0500-7258300 o vía WhatsApp al 0424-2668446 para solicitar la clave de emergencia."
    },
    {
        value: "item-2",
        question: "¿Cómo solicito un reembolso por gastos médicos?",
        answer: "Puedes solicitar un reembolso a través de nuestro portal en línea. Accede a la sección 'Gestionar Reembolsos', completa el formulario y adjunta los informes médicos y facturas correspondientes. El tiempo de procesamiento es de aproximadamente 15 a 20 días hábiles."
    },
    {
        value: "item-3",
        question: "¿Puedo atenderme en una clínica que no está en la red?",
        answer: "Sí, puedes atenderte en una clínica no afiliada, pero deberás pagar los gastos y luego solicitar un reembolso. Ten en cuenta que el monto del reembolso se ajustará al baremo (lista de precios) establecido en tu póliza."
    },
     {
        value: "item-4",
        question: "¿Qué documentos necesito para solicitar una carta aval?",
        answer: "Para una carta aval, generalmente necesitarás: informe médico detallado, presupuesto de la clínica, resultados de exámenes previos, y tu cédula de identidad. Puedes gestionar la solicitud a través del portal de autogestión."
    }
];

const contactMethods = [
    {
        icon: Phone,
        title: "Central Telefónica",
        details: "0500-7258300",
        href: "tel:05007258300"
    },
    {
        icon: MessageSquare,
        title: "WhatsApp",
        details: "0424-2668446",
        href: "https://wa.me/584242668446"
    },
    {
        icon: Mail,
        title: "Correo Electrónico",
        details: "servicios@banescoseguros.com",
        href: "mailto:servicios@banescoseguros.com"
    }
];

const allCoverageItems = [
  { amount: "USD 3000", service: "Hospitalización y Cirugía" },
  { amount: "USD 2000", service: "Maternidad" },
  { amount: "USD 1000", service: "Atención Primaria Salud", note: "(12 Órdenes Anuales o 3 Órdenes Mensuales No Acumulativas)" },
  { amount: "USD 1000", service: "Retiro Medicamentos", note: "(12 Órdenes Anuales o 2 Órdenes Mensuales No Acumulativas)" },
  { amount: "Por evento", service: "Servicios Odontológicos" },
  { amount: "Por evento", service: "Retiro Medicamentos" },
  { amount: "USD 1000", service: "Servicios Funerarios" },
  { amount: "Ilimitado", service: "Telemedicina" },
  { amount: "Ilimitado", service: "Atención Domiciliaria" },
];

const dentalCoverageItems = [
    { category: "Consultas y Diagnóstico", items: [
        { amount: '1 evento', service: 'Consulta Diagnóstica (Odontología General)' },
        { amount: '4 eventos', service: 'Radiografía Coronal y/o Periapical', note: '(2 Diagnósticos / 2 en el Alta)' },
    ]},
    { category: "Prevención y Sellantes (Límite de 1 evento en total)", items: [
        { amount: 'Incluido', service: 'Tartrectomía y Profilaxis' },
        { amount: 'Incluido', service: 'Flúor Aplicación Tópica', note: '(hasta los 12 años)' },
        { amount: 'Incluido', service: 'Sellantes de Fosas y Fisuras', note: '(hasta los 12 años)' },
    ]},
    { category: "Emergencias", items: [
        { amount: 'Ilimitados', service: 'Emergencia Endodóntica' },
        { amount: 'Ilimitados', service: 'Emergencia Periodontal' },
        { amount: 'Ilimitados', service: 'Emergencia Protésica' },
    ]},
    { category: "Restauraciones y Cirugía (Límite compartido de 3 eventos)", items: [
        { amount: 'Incluido', service: 'Restauración en Resina y/o Amalgama en Dientes Posteriores Clase I y II' },
        { amount: 'Incluido', service: 'Restauración en Resina y/o Amalgama en Dientes Posteriores Clase Mod (VI)' },
        { amount: 'Incluido', service: 'Restauración en Resinas en Dientes Anteriores Clase III y IV' },
        { amount: 'Incluido', service: 'Restauración Clase V en Resinas y/o Vidrios Ionómeros' },
        { amount: 'Incluido', service: 'Exodoncia Simple' },
        { amount: 'Incluido', service: 'Extracción de 3eros. Molares Simples (Erupcionadas)' },
    ]},
    { category: "Tratamientos de Conducto / Endodoncias (Límite compartido de 1 evento)", items: [
        { amount: 'Incluido', service: 'Tratamiento de Conducto o Endodoncia Monorradicular' },
        { amount: 'Incluido', service: 'Tratamiento de Conducto o Endodoncia Birradicular' },
        { amount: 'Incluido', service: 'Tratamiento de Conducto o Endodoncia Multiarticular' },
    ]},
    { category: "Odontopediatría", items: [
        { amount: 'Cubierto', service: 'Endodoncia y Pulpotomía - Curas Formocresoladas en Dientes Temporales' },
    ]},
];

const coveredPathologies = [
    { category: "Cardiovasculares y Respiratorias", items: ["Infarto", "Crisis hipertensiva", "Dolor torácico", "Crisis asmática", "EPOC / EBOC (Descompensado)", "Arritmias cardíacas / Trastornos del ritmo cardíaco"] },
    { category: "Traumatismos y Lesiones", items: ["Politraumatismos", "Traumatismo de tórax", "Fracturas cerradas o simples", "Fracturas abiertas", "Fracturas desplazadas", "Luxaciones", "Quemaduras", "Heridas (no incluyen las ocasionadas por armas de fuego)", "Traumatismos y/o lesiones oculares (por sustancias químicas o cuerpos extraños)", "Traumatismos (general)", "Amputaciones por accidentes o enfermedad"] },
    { category: "Abdominales y Gastrointestinales", items: ["Apendicitis", "Peritonitis", "Obstrucción intestinal", "Litiasis renal / Cólicos nefríticos", "Litiasis vesicular / Cálculos biliares (episodio agudo)", "Colitis ulcerosa", "Infecciones intestinales", "Hemorragia digestiva inferior o superior", "Síndromes diarreicos en menores hasta 12 años y adultos a partir de 60 años", "Intolerancia a la vía oral - Deshidratación moderada a severa"] },
    { category: "Gineco-Obstétricas", items: ["Embarazo ectópico roto", "Sangrados genitales", "Abortos espontáneos"] },
    { category: "Neurológicas y Sistémicas", items: ["ACV / ECV", "Meningitis", "Síncopes / Desmayos / Pérdida del conocimiento / Confusiones / Convulsiones", "Síndromes febriles en menores hasta doce años", "Síndromes metabólicos / Diabetes descompensada"] },
    { category: "Otras Patologías y Urgencias", items: ["Otitis en menores hasta doce años", "Intoxicaciones alimentarias que dificulten la respiración", "Envenenamientos", "Obstrucción de la vía aérea por cuerpo extraño / Dificultad para respirar / Asfixia", "Trombosis venosa profunda / Lesiones vasculares (arteriales y/o venosas)", "Celulitis periorbitaria", "COVID-19 (2do y 3er nivel)", "Hernias atascadas (umbilicales, inguinales y crurales)", "Retención aguda de orina", "Infecciones urinarias en menores de 12 años y en adultos mayores de 60 años"] },
];

const dentalProtocolSteps = [
    {
        step: "01",
        title: "Contacta por WhatsApp",
        color: "text-blue-600",
        description: <>Escribe al <span className="font-bold">0424-127.14.22</span>, marca la opción 2 "Solicitud de Cita" y luego "Odontología".</>
    },
    {
        step: "02",
        title: "Elige y Llama",
        color: "text-purple-600",
        description: <>Recibirás un listado de centros. <span className="font-bold">Selecciona el de tu preferencia</span> y <span className="font-bold">llama directamente</span> para agendar.</>
    },
    {
        step: "03",
        title: "Genera tu Orden",
        color: "text-sky-500",
        description: <>Vuelve al WhatsApp, marca la <span className="font-bold">opción 3 "Generar Orden"</span>, completa los datos de tu cita y listo, recibirás la orden de atención.</>
    }
];

const medicineRequestSteps = [
    {
        step: "01",
        title: "Inicia Sesión",
        color: "text-blue-600",
        description: <>Ingresa al portal de Telemedi, selecciona en el menú <span className="font-bold">“Medicamentos Póliza”</span> y haz clic en <span className="font-bold">“Nueva Solicitud”</span>.</>
    },
    {
        step: "02",
        title: "Carga Documentos",
        color: "text-purple-600",
        description: (
            <>
                Completa los datos y carga los documentos requeridos en formato PDF:
                <ul className="list-disc pl-5 mt-2 text-xs">
                    <li>Cédula de identidad</li>
                    <li>Informe médico y récipe</li>
                    <li>Partida de nacimiento (si es menor de edad)</li>
                </ul>
            </>
        )
    },
    {
        step: "03",
        title: "Guarda y Valida",
        color: "text-sky-500",
        description: <>Haz clic en <span className="font-bold">“Guardar”</span>. Podrás ver el estatus de tu solicitud en la página de inicio de la sección “Medicamentos póliza”.</>
    },
    {
        step: "04",
        title: "Recibe tus Medicamentos",
        color: "text-indigo-600",
        description: <>Una vez aprobada, serás contactado para coordinar la entrega o el retiro en farmacia.</>
    },
];

const avalRequestSteps = [
    {
        step: "01",
        color: "text-blue-600",
        title: "Notificar Siniestro",
        description: <>Presiona la opción <span className="font-bold">"Notificación Siniestros"</span>, selecciona <span className="font-bold">"Personas"</span>, y luego <span className="font-bold">"Carta Aval"</span>.</>
    },
    {
        step: "02",
        color: "text-purple-600",
        title: "Seleccionar Beneficiario",
        description: <>Selecciona el beneficiario al que corresponda el siniestro y pulsa <span className="font-bold">"Siguiente"</span>.</>
    },
    {
        step: "03",
        color: "text-sky-500",
        title: "Completar Información",
        description: <>Complete los campos con la información solicitada (detalles del siniestro, datos de medico tratante, etc.).</>
    },
    {
        step: "04",
        color: "text-indigo-600",
        title: "Cargar Documentos",
        description: <>Carga los archivos solicitados, verifica la información registrada y presiona <span className="font-bold">"Notificar"</span>.</>
    },
    {
        step: "05",
        color: "text-teal-600",
        title: "Confirmar",
        description: <>Verifica el número del siniestro y para finalizar presiona <span className="font-bold">"Aceptar"</span>.</>
    }
];

const reimbursementRequestSteps = [
    {
        step: "01",
        color: "text-blue-800",
        title: "Notificar Siniestro",
        description: <>Presiona la opción <span className="font-bold">"Notificación Siniestros"</span>, selecciona la opción <span className="font-bold">"Personas"</span>, y luego <span className="font-bold">"Reembolso"</span>.</>
    },
    {
        step: "02",
        color: "text-purple-600",
        title: "Seleccionar Beneficiario",
        description: <>Selecciona el beneficiario al que corresponda el siniestro y pulsa <span className="font-bold">"Siguiente"</span>.</>
    },
    {
        step: "03",
        color: "text-sky-500",
        title: "Completar Información",
        description: <>Complete los campos con la información solicitada (detalles del siniestro, datos del médico tratante, etc.).</>
    },
    {
        step: "04",
        color: "text-indigo-600",
        title: "Domiciliación",
        description: <>Selecciona la cuenta domiciliada o registra una nueva. Presiona <span className="font-bold">"Siguiente"</span> para continuar.</>
    },
    {
        step: "05",
        color: "text-teal-600",
        title: "Cargar Documentos",
        description: <>Carga los archivos solicitados, verifica la información registrada y presiona <span className="font-bold">"Notificar"</span>.</>
    },
    {
        step: "06",
        color: "text-blue-800",
        title: "Confirmar",
        description: <>Verifica el número del siniestro. Para finalizar presiona <span className="font-bold">"Aceptar"</span>.</>
    }
];

const StepCard = ({ step, title, color, description }: { step: string; title: string; color: string; description: React.ReactNode }) => (
    <div className="relative pl-12 pb-8">
        <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-muted border">
            <span className={cn("text-sm font-bold", color)}>{step}</span>
        </div>
        <div className="absolute left-4 top-10 bottom-0 w-px bg-border -translate-x-1/2"></div>
        <h4 className="font-semibold text-foreground text-base">{title}</h4>
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
    </div>
);

export default function HcmPage() {
    const oftalmologicaCoverageItems = [
      { amount: '100%', service: 'Consulta Oftalmológica' },
      { amount: '100%', service: 'Consulta Subespecialista' },
      { amount: '100%', service: 'Consulta Oftalmológica Sucesiva' },
      { amount: '100%', service: 'Emergencia general' },
      { amount: '100%', service: 'Emergencia con procedimiento' },
      { amount: '100%', service: 'Emergencia causada a terceros' },
      { amount: '100%', service: 'Emergencia con procedimiento causado a terceros' },
      { amount: 'USD 40', service: 'Lentes Correctivos', note: '(Cristales o Cristales y Montura)' },
    ];

    return (
        <div className="bg-background">
            {/* Header con fondo azul oscuro sólido y sin carrusel */}
            <header className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 h-[500px] text-white overflow-hidden bg-[#003B73]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full grid md:grid-cols-2 items-center">
                    <div className="md:order-1 -translate-y-12">
                        <h1 className="text-3xl md:text-4xl font-normal tracking-tighter leading-none">
                            ¡Conoce Nuestra <br /> Póliza de Salud!
                        </h1>
                    </div>
                    <div className="relative h-full w-full hidden md:flex items-center justify-center md:order-2 -translate-y-8">
                         <div className="relative w-[400px] h-[400px]">
                             <Image
                                src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(60).png?raw=true"
                                alt="health shield"
                                fill
                                className="object-contain"
                                unoptimized
                                priority
                            />
                         </div>
                    </div>
                </div>
            </header>
            
            <div className="max-w-[1600px] mx-auto py-16 px-6 md:px-12 space-y-24">
                
                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hcmActions.map((action) => (
                            <Link href={action.href} key={action.title} target="_blank" rel="noopener noreferrer" className="block group">
                                <Card className="h-full rounded-[2.5rem] border-none bg-[#003B73] text-white transition-all duration-500 hover:scale-[1.02] shadow-xl overflow-hidden relative">
                                    <div className="absolute inset-0 pointer-events-none opacity-10">
                                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white blur-2xl" />
                                    </div>
                                    <CardContent className="p-10 flex flex-col items-center text-center gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 border border-white/10">
                                            <action.icon className="w-8 h-8 text-white stroke-[1.5]" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-lg tracking-tighter uppercase">{action.title}</h3>
                                            <p className="text-[10px] leading-relaxed text-white/60 font-light max-w-[180px] mx-auto tracking-tight">{action.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Cobertura de la <br /> Póliza Básica
                            </h2>
                            <p className="text-muted-foreground mt-4 text-xs font-light">Resumen de los principales beneficios de salud.</p>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 lg:pl-16">
                            {allCoverageItems.map((item, index) => (
                                <div key={`coverage-${index}`}>
                                    <p className="text-3xl font-extrabold tracking-tighter text-foreground">{item.amount}</p>
                                    <p className="text-sm text-muted-foreground">{item.service}</p>
                                    {item.note && <p className="text-xs text-muted-foreground/80 mt-1">{item.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Cobertura Odontológica
                            </h2>
                            <p className="text-muted-foreground mt-4 text-xs font-light tracking-tight">Detalle de la cobertura para servicios odontológicos.</p>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 lg:pl-16">
                            {dentalCoverageItems.flatMap(category => category.items).map((item, index) => (
                                <div key={`dental-coverage-${index}`}>
                                    <p className="text-3xl font-extrabold tracking-tighter text-foreground">{item.amount}</p>
                                    <p className="text-sm text-muted-foreground">{item.service}</p>
                                    {item.note && <p className="text-xs text-muted-foreground/80 mt-1">{item.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Cobertura Oftalmológica
                            </h2>
                            <p className="text-muted-foreground mt-4 text-xs font-light tracking-tight">Toda la cobertura de consultas y emergencias mencionada a continuación es al 100%.</p>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 lg:pl-16">
                            {oftalmologicaCoverageItems.map((item, index) => (
                                <div key={`oftalmologica-coverage-${index}`}>
                                    <p className="text-3xl font-extrabold tracking-tighter text-foreground">{item.amount}</p>
                                    <p className="text-sm text-muted-foreground">{item.service}</p>
                                    {item.note && <p className="text-xs text-muted-foreground/80 mt-1">{item.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Protocolos y <br /> Procedimientos
                            </h2>
                            <p className="text-muted-foreground mt-4 text-xs font-light tracking-tight">Sigue estos sencillos pasos para realizar tus gestiones.</p>
                        </div>
                        <div className="lg:col-span-2 lg:pl-16">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="aval" className="border-slate-100">
                                    <AccordionTrigger className="text-lg font-semibold tracking-tight hover:no-underline">Solicitud de Carta Aval</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pt-4">
                                            {avalRequestSteps.map((step) => <StepCard key={step.step} {...step} />)}
                                        </div>
                                    </AccordionContent>                                </AccordionItem>
                                <AccordionItem value="reembolso" className="border-slate-100">
                                    <AccordionTrigger className="text-lg font-semibold tracking-tight hover:no-underline">Solicitud de Reembolso</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pt-4">
                                            {reimbursementRequestSteps.map((step) => <StepCard key={step.step} {...step} />)}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="odontologica" className="border-slate-100">
                                    <AccordionTrigger className="text-lg font-semibold tracking-tight hover:no-underline">Atención Odontológica</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pt-4">
                                            {dentalProtocolSteps.map((step) => <StepCard key={step.step} {...step} />)}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="medicinas" className="border-slate-100">
                                    <AccordionTrigger className="text-lg font-semibold tracking-tight hover:no-underline">Solicitud de Medicinas</AccordionTrigger>
                                    <AccordionContent>
                                       <div className="pt-4">
                                            {medicineRequestSteps.map((step) => <StepCard key={step.step} {...step} />)}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </section>
                
                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Patologías de Emergencias Cubiertas
                            </h2>
                            <p className="text-muted-foreground mt-4 text-xs font-light tracking-tight">Lista de patologías cubiertas por la Póliza de urgencias y emergencias médicas.</p>
                        </div>
                        <div className="lg:col-span-2 lg:pl-16">
                            <Card className="rounded-[2rem] shadow-sm bg-slate-50 border-none overflow-hidden">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader className="bg-slate-100/50">
                                            <TableRow className="border-slate-100 hover:bg-transparent">
                                                <TableHead className="w-[250px] p-8 text-[#003B73] font-bold uppercase text-[10px] tracking-widest">Categoría</TableHead>
                                                <TableHead className="p-8 text-[#003B73] font-bold uppercase text-[10px] tracking-widest">Patologías Cubiertas</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {coveredPathologies.map((category) => (
                                                <TableRow key={category.category} className="border-slate-100/50 last:border-b-0 hover:bg-white/50 transition-colors">
                                                    <TableCell className="font-bold text-slate-700 align-top p-8 text-xs">{category.category}</TableCell>
                                                    <TableCell className="p-8">
                                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-disc pl-5 text-[11px] text-slate-500 font-light">
                                                            {category.items.map((item) => (
                                                                <li key={item}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-12 items-start pt-12">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                           <div className="p-3 bg-blue-50 rounded-2xl w-fit">
                               <HelpCircle className="h-5 w-5 text-primary" />
                           </div>
                           <h2 className="text-3xl font-bold tracking-tighter">Preguntas Frecuentes</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="item-1">
                            {faqItems.map(item => (
                                <AccordionItem key={item.value} value={item.value} className="bg-slate-50/50 rounded-2xl border-none px-6">
                                    <AccordionTrigger className="text-[13px] font-medium hover:no-underline text-slate-700 py-5">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-[11px] text-slate-500 font-light leading-relaxed pb-5">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <Card className="bg-[#003B73] text-white p-10 rounded-[3rem] border-none shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-5">
                          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl translate-y-1/2 translate-x-1/2" />
                        </div>
                        <CardHeader className="p-0 mb-8 relative z-10">
                            <CardTitle className="text-3xl font-bold tracking-tighter">Contacto de Emergencia</CardTitle>
                            <CardDescription className="text-white/60 text-xs font-light">Guarda estos números. Estamos para ayudarte 24/7.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4 relative z-10">
                           {contactMethods.map((method) => {
                             const Icon = method.icon;
                             return (
                                <a href={method.href} target="_blank" rel="noopener noreferrer" key={method.title} className="flex items-center gap-5 p-5 rounded-3xl bg-white/10 hover:bg-white/20 transition-all border border-white/5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                      <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm tracking-tight">{method.title}</p>
                                        <p className="text-xs text-white/60 font-light mt-0.5">{method.details}</p>
                                    </div>
                                </a>
                             )
                           })}
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            {/* Footer Padding */}
            <div className="py-20" />
        </div>
    );
}
