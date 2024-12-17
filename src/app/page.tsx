/**
 * Página inicial do site
 * 
 * Componentes:
 * - HeroSection: Seção principal com logo, título e chamadas para ação
 * - ComparisonSection: Seção de comparação com outros sites
 * - ProcessSection: Seção que mostra o processo de trabalho
 * - StatsSection: Seção de estatísticas com números animados
 * - Footer: Rodapé com links importantes e informações de contato
 * 
 * Layout:
 * - Componentes são empilhados verticalmente
 * - Cada seção ocupa a largura total da viewport
 */

import HeroSection from '@/components/HeroSection';
import ComparisonSection from '@/components/ComparisonSection';
import ProcessSection from '@/components/ProcessSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main>
        {/* Seção principal com apresentação da empresa */}
        <HeroSection />
        <ComparisonSection />
        
        {/* Seção que mostra o processo de trabalho */}
        <ProcessSection />
        
        {/* Seção de estatísticas com números animados */}
        <StatsSection />
      </main>
      
      {/* Rodapé do site */}
      <Footer />
    </>
  );
} 