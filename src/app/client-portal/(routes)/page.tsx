import ClientPortalContent from './components/ClientPortalContent'

// Marcar a página como dinâmica
export const dynamic = 'force-dynamic'

// Opcional: Desabilitar pré-renderização estática
export const generateStaticParams = () => {
  return []
}

export default function ClientPortalPage() {
  return <ClientPortalContent />
} 