import { 
  Users, 
  Briefcase, 
  Scale, 
  Shield, 
  FolderKanban, 
  MoreHorizontal, 
  FileText, 
  HeartPulse, 
  Laptop, 
  BadgeCheck, 
  FilePlus2,
  Database,
  BarChart3,
  ShieldCheck,
  Activity,
  Bot
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RequestItem {
  title: string;
  type: 'request' | 'info';
  link?: string;
  icon?: LucideIcon;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  directLink?: string;
  requests?: RequestItem[];
}

export const mockDepartments: Department[] = [
  {
    id: "vacaciones",
    name: "Gestión de Vacaciones",
    description: "Solicita tu descanso y consulta el saldo de días disponibles.",
    category: "Capital Humano",
    icon: FileText,
    directLink: "https://script.google.com/a/macros/banescoseguros.com/s/AKfycbyLxxr9NCgE30NDposZWTFcRf4Ny0xqRD1WFH3tPwnT0EV4LFgmBbLtNJnzbd5SNnfb/exec"
  },
  {
    id: "hcm-consulta",
    name: "Soporte HCM",
    description: "Canal directo para dudas de cobertura y red de atención médica.",
    category: "Capital Humano",
    icon: HeartPulse,
    directLink: "/hcm"
  },
  {
    id: "pmo",
    name: "Oficina de Proyectos (PMO)",
    description: "Impulso y seguimiento de iniciativas estratégicas institucionales.",
    category: "Proyectos",
    icon: FolderKanban,
    requests: [
      {
        title: "Registro de Nueva Iniciativa",
        type: "request",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSezxTbTDmrxKJxhqLcrSp90Ynh1kmIjksiiF7d0KmpEBlnznQ/viewform",
        icon: FilePlus2
      },
      {
        title: "Metodología de Gestión",
        type: "info",
        icon: Database
      },
      {
        title: "Estatus de Proyectos",
        type: "info",
        icon: BarChart3
      }
    ]
  },
  {
    id: "robotizacion",
    name: "Robotización",
    description: "Optimización y automatización de procesos mediante soluciones RPA.",
    category: "Proyectos",
    icon: Bot,
    directLink: "https://sites.google.com/banescoseguros.com/rpabanescosegurosvenezuela/inicio"
  },
  {
    id: "intel-comercial",
    name: "Inteligencia Comercial",
    description: "Dashboards estratégicos y análisis de datos de mercado.",
    category: "Comercial",
    icon: Laptop,
    directLink: "https://sites.google.com/banescoseguros.com/desarollocomercial-bsv/inteligencia-comercial"
  },
  {
    id: "sistematica",
    name: "Sistemática Comercial",
    description: "Guías de gestión y seguimiento de objetivos de ventas.",
    category: "Comercial",
    icon: BadgeCheck,
    directLink: "https://sites.google.com/banescoseguros.com/sistematica-comercial-ve"
  },
  {
    id: "legal-val",
    name: "Requerimientos a Consultoría Jurídica",
    description: "Canal oficial para solicitudes de revisión legal, contratos y asesoría técnica normativa.",
    category: "Legal",
    icon: Scale,
    directLink: "https://docs.google.com/forms/d/e/1FAIpQLSfC5Tbf3qespf0FeLx9BXGZwN8tIEENUz6Ri1I9ohszJH0yuA/viewform"
  },
  {
    id: "infra-seg",
    name: "Seguridad de la Información",
    description: "Gestión de accesos lógicos, identidades y políticas de protección de datos.",
    category: "Seguridad",
    icon: ShieldCheck,
    directLink: "https://docs.google.com/forms/d/e/1FAIpQLSdTEwWNzyiOE6GUsM4xkZnumDJ673-w8atYEBw6o3oH4lVRFA/viewform"
  },
  {
    id: "control",
    name: "Control",
    description: "Herramientas institucionales para la gestión de riesgos corporativos.",
    category: "Otros",
    icon: Activity,
    requests: [
      {
        title: "Site de Riesgo",
        type: "info",
        link: "https://sites.google.com/banescoseguros.com/sitederiesgo/inicio",
        icon: BarChart3
      },
      {
        title: "GRC-SIRO",
        type: "request",
        link: "https://adfs.banesco.com/adfs/ls?SAMLRequest=lZHLbsIwEEV%2FxZp9nkACFgmiIFQkqiISuuimcswEIiU29Tion9%2FwVLup1J0fc%2BfOnDuefDU1O6GhSqsEAtcHhkrqXaX2CWzzhTOESTom0dThkU9be1Ab%2FGyRLOuEivj1J4HWKK4FVcSVaJC4lTybvqx46Pr8aLTVUtfApkRobGc104raBk2G5lRJ3G5WCRysPRL3vEIoJKkJ9yd0qTLaaciVuvHOZy%2FrDKezDNi8G6JSwl4Gv2vFriT31uCiOT94NQFbaCPxskACpagJgS3nCXwU8S4syqKMo8jHojfox30ph3IXR6NggGVU%2BrEQYdlxWRK1uFRkhbIJhH44cILQCaI86PNgxAcjd9gbvgNb39Z9qtQV419simsR8ec8Xzvr1ywH9naPoyuAB%2FyLvfkHdnGHDWmXQOg2REdRqTOWsferafq4%2F0w4%2FQY%3D&RelayState=%2Fsiro%2F",
        icon: Database
      }
    ]
  }
];
