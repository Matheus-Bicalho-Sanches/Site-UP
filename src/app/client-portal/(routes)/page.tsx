import { Metadata } from 'next'
import ClientPortalContent from './components/ClientPortalContent'

// Marcar a página como dinâmica
export const dynamic = 'force-dynamic'

// Opcional: Desabilitar pré-renderização estática
export const generateStaticParams = () => {
  return []
}

// Metadados da página
export const metadata: Metadata = {
  title: 'Portal do Cliente',
  description: 'Portal do cliente UP Gestão',
}

export default function ClientPortalPage() {
  return <ClientPortalContent />
} 