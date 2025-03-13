'use client';

import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';

// Dados de exemplo de ações para as linhas do ticker (agora com 11 linhas no total)
const stockRows = [
  // Nova linha -2 (adicional superior) - movimento para direita
  [
    { symbol: 'BTC-USD', name: 'Bitcoin', value: 5.32, positive: true },
    { symbol: 'ETH-USD', name: 'Ethereum', value: 3.89, positive: true },
    { symbol: 'SOL-USD', name: 'Solana', value: 8.42, positive: true },
    { symbol: 'DOGE-USD', name: 'Dogecoin', value: 2.17, positive: true },
    { symbol: 'ADA-USD', name: 'Cardano', value: 1.35, positive: true },
    { symbol: 'DOT-USD', name: 'Polkadot', value: 0.93, positive: false },
    { symbol: 'SHIB-USD', name: 'Shiba Inu', value: 3.41, positive: true },
    { symbol: 'AVAX-USD', name: 'Avalanche', value: 6.27, positive: true },
    { symbol: 'XRP-USD', name: 'XRP', value: 2.18, positive: true },
    { symbol: 'MATIC-USD', name: 'Polygon', value: 0.74, positive: false },
    { symbol: 'LINK-USD', name: 'Chainlink', value: 3.62, positive: true },
    { symbol: 'UNI-USD', name: 'Uniswap', value: 1.87, positive: true },
    { symbol: 'ATOM-USD', name: 'Cosmos', value: 4.21, positive: true },
  ],
  // Nova linha -1 (adicional superior) - movimento para esquerda
  [
    { symbol: 'GOLD', name: 'Gold', value: 0.62, positive: true },
    { symbol: 'SILVER', name: 'Silver', value: 1.31, positive: true },
    { symbol: 'OIL', name: 'Crude Oil', value: 2.17, positive: true },
    { symbol: 'NG', name: 'Natural Gas', value: 0.35, positive: false },
    { symbol: 'CPER', name: 'Copper', value: 1.73, positive: true },
    { symbol: 'WHEAT', name: 'Wheat', value: 0.89, positive: false },
    { symbol: 'CORN', name: 'Corn', value: 0.42, positive: false },
    { symbol: 'SOYB', name: 'Soybean', value: 1.15, positive: true },
    { symbol: 'SUGAR', name: 'Sugar', value: 2.37, positive: true },
    { symbol: 'COFFEE', name: 'Coffee', value: 3.12, positive: true },
    { symbol: 'COTTON', name: 'Cotton', value: 0.87, positive: false },
    { symbol: 'LUMBER', name: 'Lumber', value: 1.44, positive: true },
    { symbol: 'RBOB', name: 'Gasoline', value: 1.91, positive: true },
  ],
  // Linha ZERO - movimento para esquerda
  [
    { symbol: 'ACOM', name: 'ACOM Holdings', value: 15.81, positive: true },
    { symbol: 'TSLA', name: 'Tesla', value: 1.27, positive: true },
    { symbol: 'AAPL', name: 'Apple Inc', value: 3.17, positive: true },
    { symbol: 'INTC', name: 'Intel', value: 1.19, positive: false },
    { symbol: 'NVDA', name: 'NVIDIA', value: 10.63, positive: true },
    { symbol: 'AMD', name: 'Advanced Micro Devices', value: 1.79, positive: true },
    { symbol: 'MRVL', name: 'Marvell', value: 0.92, positive: false },
    { symbol: 'MSFT', name: 'Microsoft', value: 0.87, positive: true },
    { symbol: 'IBM', name: 'IBM', value: 2.45, positive: true },
    { symbol: 'ORCL', name: 'Oracle', value: 1.27, positive: true },
    { symbol: 'CRM', name: 'Salesforce', value: 2.65, positive: true },
    { symbol: 'HPQ', name: 'HP Inc', value: 1.38, positive: true },
    { symbol: 'DELL', name: 'Dell', value: 3.41, positive: true },
  ],
  // Primeira linha - movimento para direita
  [
    { symbol: 'AAPL', name: 'Apple Inc.', value: 2.57, positive: true },
    { symbol: 'MSFT', name: 'Microsoft', value: 1.87, positive: true },
    { symbol: 'GOOGL', name: 'Alphabet', value: 3.21, positive: true },
    { symbol: 'AMZN', name: 'Amazon', value: 4.12, positive: true },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', value: 6.06, positive: true },
    { symbol: 'TSLA', name: 'Tesla', value: 1.35, positive: false },
    { symbol: 'META', name: 'Meta Platforms', value: 2.93, positive: true },
    { symbol: 'NFLX', name: 'Netflix', value: 3.17, positive: true },
    { symbol: 'PYPL', name: 'PayPal', value: 0.84, positive: false },
    { symbol: 'INTC', name: 'Intel', value: 1.19, positive: false },
    { symbol: 'AMD', name: 'Advanced Micro Devices', value: 4.33, positive: true },
    { symbol: 'CSCO', name: 'Cisco', value: 1.67, positive: true },
    { symbol: 'ORCL', name: 'Oracle', value: 2.79, positive: true },
  ],
  // Segunda linha - movimento para esquerda
  [
    { symbol: 'RBLX', name: 'Roblox', value: 20.29, positive: true },
    { symbol: 'FNHC', name: 'FedNat Holding', value: 55.77, positive: true },
    { symbol: 'SHOP', name: 'Shopify', value: 2.84, positive: true },
    { symbol: 'CMCSA', name: 'Comcast', value: 2.58, positive: true },
    { symbol: 'WBD', name: 'Warner Bros', value: 0.80, positive: false },
    { symbol: 'PCG', name: 'PG&E Corp', value: 2.46, positive: true },
    { symbol: 'KSS', name: 'Kohl\'s', value: 1.79, positive: true },
    { symbol: 'LVS', name: 'Las Vegas Sands', value: 2.13, positive: true },
    { symbol: 'XOM', name: 'Exxon Mobil', value: 1.52, positive: true },
    { symbol: 'PG', name: 'Procter & Gamble', value: 3.21, positive: true },
    { symbol: 'CVX', name: 'Chevron', value: 1.88, positive: true },
    { symbol: 'DIS', name: 'Disney', value: 2.45, positive: true },
    { symbol: 'JPM', name: 'JPMorgan Chase', value: 1.62, positive: true },
  ],
  // Terceira linha - movimento para direita
  [
    { symbol: 'ASAN', name: 'Asana', value: 0.94, positive: true },
    { symbol: 'DAL', name: 'Delta Air Lines', value: 0.31, positive: false },
    { symbol: 'ABNB', name: 'Airbnb', value: 4.15, positive: true },
    { symbol: 'MRNA', name: 'Moderna', value: 5.33, positive: true },
    { symbol: 'MTCH', name: 'Match Group', value: 6.51, positive: true },
    { symbol: 'ROKU', name: 'Roku', value: 3.42, positive: true },
    { symbol: 'DXLG', name: 'Destination XL', value: 4.15, positive: true },
    { symbol: 'RIOT', name: 'Riot Platforms', value: 4.59, positive: true },
    { symbol: 'MARA', name: 'Marathon Digital', value: 5.77, positive: true },
    { symbol: 'SNAP', name: 'Snap Inc', value: 1.65, positive: false },
    { symbol: 'PINS', name: 'Pinterest', value: 3.22, positive: true },
    { symbol: 'SPOT', name: 'Spotify', value: 2.19, positive: true },
    { symbol: 'UBER', name: 'Uber', value: 1.73, positive: true },
  ],
  // Quarta linha - movimento para esquerda
  [
    { symbol: 'PLTR', name: 'Palantir', value: 3.24, positive: true },
    { symbol: 'SOFI', name: 'SoFi Technologies', value: 1.13, positive: true },
    { symbol: 'LCID', name: 'Lucid Group', value: 0.58, positive: false },
    { symbol: 'NIO', name: 'NIO Inc', value: 0.94, positive: false },
    { symbol: 'F', name: 'Ford Motor', value: 1.03, positive: true },
    { symbol: 'WISH', name: 'ContextLogic', value: 2.59, positive: false },
    { symbol: 'RIVN', name: 'Rivian', value: 3.09, positive: true },
    { symbol: 'TME', name: 'Tencent Music', value: 0.73, positive: true },
    { symbol: 'GRAB', name: 'Grab Holdings', value: 2.35, positive: true },
    { symbol: 'TAL', name: 'TAL Education', value: 7.12, positive: true },
    { symbol: 'U', name: 'Unity Software', value: 4.15, positive: true },
    { symbol: 'SNOW', name: 'Snowflake', value: 3.77, positive: true },
    { symbol: 'CRWD', name: 'CrowdStrike', value: 2.88, positive: true },
  ],
  // Quinta linha - movimento para direita
  [
    { symbol: 'BABA', name: 'Alibaba', value: 1.58, positive: true },
    { symbol: 'JD', name: 'JD.com', value: 6.59, positive: true },
    { symbol: 'TCEHY', name: 'Tencent', value: 3.77, positive: true },
    { symbol: 'XPEV', name: 'XPeng', value: 2.11, positive: false },
    { symbol: 'BIDU', name: 'Baidu', value: 3.89, positive: true },
    { symbol: 'PDD', name: 'PDD Holdings', value: 7.84, positive: true },
    { symbol: 'LI', name: 'Li Auto', value: 4.21, positive: true },
    { symbol: 'WMT', name: 'Walmart', value: 2.08, positive: true },
    { symbol: 'KO', name: 'Coca-Cola', value: 1.15, positive: true },
    { symbol: 'TGT', name: 'Target', value: 3.44, positive: true },
    { symbol: 'MCD', name: 'McDonald\'s', value: 1.92, positive: true },
    { symbol: 'SBUX', name: 'Starbucks', value: 2.03, positive: true },
    { symbol: 'NKE', name: 'Nike', value: 1.67, positive: true },
  ],
  // Sexta linha - movimento para esquerda
  [
    { symbol: 'BRK.A', name: 'Berkshire Hathaway', value: 0.65, positive: true },
    { symbol: 'V', name: 'Visa', value: 1.20, positive: true },
    { symbol: 'MA', name: 'Mastercard', value: 0.87, positive: true },
    { symbol: 'UNH', name: 'UnitedHealth Group', value: 1.53, positive: true },
    { symbol: 'JNJ', name: 'Johnson & Johnson', value: 0.37, positive: false },
    { symbol: 'PFE', name: 'Pfizer', value: 0.13, positive: false },
    { symbol: 'ABBV', name: 'AbbVie', value: 1.89, positive: true },
    { symbol: 'LLY', name: 'Eli Lilly', value: 2.43, positive: true },
    { symbol: 'PEP', name: 'PepsiCo', value: 0.95, positive: true },
    { symbol: 'COST', name: 'Costco', value: 1.86, positive: true },
    { symbol: 'AVGO', name: 'Broadcom', value: 3.55, positive: true },
    { symbol: 'TMO', name: 'Thermo Fisher', value: 1.28, positive: true },
    { symbol: 'CSCO', name: 'Cisco', value: 0.76, positive: false },
  ],
  // Nova linha 7 (adicional inferior) - movimento para direita
  [
    { symbol: 'EURUSD', name: 'Euro/USD', value: 0.42, positive: true },
    { symbol: 'GBPUSD', name: 'Pound/USD', value: 0.31, positive: true },
    { symbol: 'USDJPY', name: 'USD/Yen', value: 0.15, positive: false },
    { symbol: 'AUDUSD', name: 'AUD/USD', value: 0.27, positive: true },
    { symbol: 'USDCAD', name: 'USD/CAD', value: 0.19, positive: false },
    { symbol: 'USDCHF', name: 'USD/CHF', value: 0.23, positive: false },
    { symbol: 'NZDUSD', name: 'NZD/USD', value: 0.35, positive: true },
    { symbol: 'EURGBP', name: 'Euro/Pound', value: 0.12, positive: false },
    { symbol: 'EURJPY', name: 'Euro/Yen', value: 0.29, positive: true },
    { symbol: 'GBPJPY', name: 'Pound/Yen', value: 0.39, positive: true },
    { symbol: 'EURCHF', name: 'Euro/CHF', value: 0.17, positive: false },
    { symbol: 'AUDJPY', name: 'AUD/JPY', value: 0.21, positive: true },
    { symbol: 'USDMXN', name: 'USD/MXN', value: 0.55, positive: true },
  ],
  // Nova linha 8 (adicional inferior) - movimento para esquerda
  [
    { symbol: 'IBOV', name: 'Ibovespa', value: 1.32, positive: true },
    { symbol: 'SPX', name: 'S&P 500', value: 0.87, positive: true },
    { symbol: 'DJIA', name: 'Dow Jones', value: 0.73, positive: true },
    { symbol: 'COMP', name: 'Nasdaq', value: 1.15, positive: true },
    { symbol: 'NDX', name: 'Nasdaq 100', value: 1.24, positive: true },
    { symbol: 'RUT', name: 'Russell 2000', value: 0.68, positive: false },
    { symbol: 'FTSE', name: 'FTSE 100', value: 0.52, positive: true },
    { symbol: 'DAX', name: 'DAX', value: 0.91, positive: true },
    { symbol: 'CAC', name: 'CAC 40', value: 0.85, positive: true },
    { symbol: 'NIKKEI', name: 'Nikkei 225', value: 1.07, positive: true },
    { symbol: 'HSI', name: 'Hang Seng', value: 0.97, positive: false },
    { symbol: 'SSEC', name: 'Shanghai', value: 0.63, positive: false },
    { symbol: 'ASX', name: 'ASX 200', value: 0.79, positive: true },
  ],
];

interface StockItemProps {
  stock: {
    symbol: string;
    name: string;
    value: number;
    positive: boolean;
  };
  index: number;
  isOdd: boolean;
  rowIndex: number;
}

// Componente para um item de ação individual
const StockItem = ({ stock, index, isOdd, rowIndex }: StockItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Determina cores de texto e glow baseadas no valor positivo/negativo
  const textColorClass = stock.positive ? 'text-green-400' : 'text-red-400';
  const valueColorClass = stock.positive ? 'text-green-500' : 'text-red-500';
  
  // Alternar entre textos mais claros e mais escuros para criar efeito de "linhas"
  const isDimmed = index % 2 === (isOdd ? 0 : 1);
  const opacityClass = isDimmed ? 'opacity-75' : 'opacity-90';
  
  // Valores de movimento para efeito spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };
  
  return (
    <motion.div
      ref={itemRef}
      className={`inline-flex items-center justify-center px-2 py-1 relative cursor-pointer ${opacityClass} hover:opacity-100 z-10`}
      style={{ width: '140px' }} // Largura fixa para padronizar o espaçamento
      animate={{
        scale: isHovered ? 1.1 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      transition={{
        scale: { duration: 0.15, type: 'spring', stiffness: 300 },
      }}
    >
      {/* Efeito de glow CSS puro para garantir compatibilidade */}
      <div 
        className={`absolute inset-0 rounded-lg z-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: stock.positive
            ? 'radial-gradient(circle, rgba(74, 222, 128, 0.6) 0%, rgba(0, 0, 0, 0) 70%)'
            : 'radial-gradient(circle, rgba(248, 113, 113, 0.6) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(8px)',
        }}
      />
      
      {/* Efeito de borda brilhante */}
      {isHovered && (
        <div 
          className="absolute -inset-px rounded-lg border z-0"
          style={{
            borderColor: stock.positive ? 'rgba(74, 222, 128, 0.5)' : 'rgba(248, 113, 113, 0.5)',
            boxShadow: stock.positive 
              ? '0 0 10px 1px rgba(74, 222, 128, 0.7), inset 0 0 4px rgba(74, 222, 128, 0.5)' 
              : '0 0 10px 1px rgba(248, 113, 113, 0.7), inset 0 0 4px rgba(248, 113, 113, 0.5)',
          }}
        />
      )}
      
      {/* Conteúdo do ticker - símbolo e variação */}
      <div className="flex items-center font-mono relative z-10">
        <span className={`font-bold ${textColorClass}`}>
          {stock.symbol}
        </span>
        <span 
          className={`ml-1 ${valueColorClass}`}
        >
          {stock.positive ? '+' : '-'}{stock.value}%
        </span>
      </div>
    </motion.div>
  );
};

// Componente para uma linha completa do ticker
const StockTickerRow = ({ stocks, rowIndex }: { stocks: any[]; rowIndex: number }) => {
  const isOdd = rowIndex % 2 === 1;
  const [isRowHovered, setIsRowHovered] = useState(false);
  const [scannerPosition, setScannerPosition] = useState(-100);
  const rowRef = useRef<HTMLDivElement>(null);
  
  // Efeito de scanner para cada linha com velocidades aleatórias
  useEffect(() => {
    // Gerar uma velocidade aleatória para cada scanner baseada no rowIndex
    // Isso garante que cada linha terá uma velocidade diferente, mas consistente
    const baseSpeed = 0.5;
    const randomFactor = Math.sin(rowIndex * 0.7 + 1) * 0.3 + 0.5; // Gera um valor entre 0.2 e 0.8
    const scanSpeed = baseSpeed * randomFactor;
    
    // Offset diferente para cada linha para começarem em posições diferentes
    const offset = (rowIndex * 20) % 100;
    setScannerPosition(-100 + offset);
    
    const interval = setInterval(() => {
      setScannerPosition(prev => {
        if (prev > 200) { // Aumentamos o range para garantir que cubra toda a tela
          return -100;
        }
        return prev + scanSpeed;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [rowIndex]);
  
  // Todas as linhas com inclinação de 15 graus (paralelas)
  const skewAngle = 15;
  
  // Calculamos a largura total mais precisa para garantir que o loop seja contínuo
  // Aumentamos o valor para evitar sobreposições e cobrir totalmente a tela
  const itemWidth = 145; // Largura média ajustada de cada item em pixels
  const totalWidth = stocks.length * itemWidth * 1.2; // Multiplicamos por 1.2 para garantir cobertura completa
  
  // Motion values para efeito spotlight na linha inteira
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleRowMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  return (
    <div 
      ref={rowRef}
      className="relative my-3" // Aumentado o espaçamento vertical com my-3
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
      onMouseMove={handleRowMouseMove}
    >
      {/* Linha separadora com gradiente */}
      <div 
        className="absolute w-full h-px opacity-30" 
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(75,85,99,1) 50%, rgba(0,0,0,0) 100%)',
          top: 0,
          transform: `skewY(${skewAngle}deg)`,
        }}
      />
      
      {/* Efeito de scanner para a linha */}
      <div 
        className="absolute h-full w-20 pointer-events-none z-10 opacity-30"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.3) 50%, rgba(0,0,0,0) 100%)',
          transform: `skewY(${skewAngle}deg) translateX(${scannerPosition}vw)`,
          transition: 'transform 0.1s linear',
        }}
      />
      
      {/* Container da linha do ticker com transformação diagonal de 15 graus */}
      <div 
        className={`relative py-4 overflow-hidden`} // Aumentado padding vertical para mais espaçamento
        style={{
          transform: `skewY(${skewAngle}deg)`,
        }}
      >
        {/* Efeito de highlight quando a linha estiver em hover */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'rgba(30, 41, 59, 0.3)',
            opacity: isRowHovered ? 1 : 0,
          }}
        />
        
        {/* Esta div cria um loop contínuo deslocando duas cópias do conteúdo */}
        <div className="ticker-container flex whitespace-nowrap relative">
          {/* Primeira cópia - animada */}
          <div
            className={`ticker-item absolute top-0 flex whitespace-nowrap ticker-animate-${isOdd ? 'left' : 'right'}`}
            style={{
              animationDuration: `${50 + (rowIndex * 5)}s`,
              width: `${totalWidth}px`,
              left: isOdd ? '0' : 'auto',
              right: isOdd ? 'auto' : '0',
            }}
          >
            {stocks.map((stock, index) => (
              <StockItem 
                key={`${stock.symbol}-1-${index}`} 
                stock={stock} 
                index={index}
                isOdd={isOdd}
                rowIndex={rowIndex}
              />
            ))}
          </div>
          
          {/* Segunda cópia - animada com offset preciso */}
          <div
            className={`ticker-item absolute top-0 flex whitespace-nowrap ticker-animate-${isOdd ? 'left' : 'right'}`}
            style={{
              animationDuration: `${50 + (rowIndex * 5)}s`,
              width: `${totalWidth}px`,
              left: isOdd ? `${totalWidth}px` : 'auto',
              right: isOdd ? 'auto' : `${totalWidth}px`,
              animationDelay: '0s' // Garantir sincronização
            }}
          >
            {stocks.map((stock, index) => (
              <StockItem 
                key={`${stock.symbol}-2-${index}`} 
                stock={stock} 
                index={index}
                isOdd={isOdd}
                rowIndex={rowIndex}
              />
            ))}
          </div>
          
          {/* Terceira cópia para garantir que não haja espaço em telas maiores */}
          <div
            className={`ticker-item absolute top-0 flex whitespace-nowrap ticker-animate-${isOdd ? 'left' : 'right'}`}
            style={{
              animationDuration: `${50 + (rowIndex * 5)}s`,
              width: `${totalWidth}px`,
              left: isOdd ? `${totalWidth * 2}px` : 'auto',
              right: isOdd ? 'auto' : `${totalWidth * 2}px`,
              animationDelay: '0s' // Garantir sincronização
            }}
          >
            {stocks.map((stock, index) => (
              <StockItem 
                key={`${stock.symbol}-3-${index}`} 
                stock={stock} 
                index={index}
                isOdd={isOdd}
                rowIndex={rowIndex}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Linha separadora com gradiente (inferior) */}
      <div 
        className="absolute w-full h-px opacity-30"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(75,85,99,1) 50%, rgba(0,0,0,0) 100%)',
          bottom: 0,
          transform: `skewY(${skewAngle}deg)`,
        }}
      />
    </div>
  );
};

// Componente de rastro do mouse
const MouseTrail = ({ position }: { position: { x: number; y: number } }) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);
  
  useEffect(() => {
    // Adicionar nova posição ao trail
    if (position.x > 0 && position.y > 0) {
      setTrail(prev => {
        const newTrail = [...prev, { 
          x: position.x, 
          y: position.y, 
          size: 15,
          opacity: 0.7
        }];
        
        // Manter apenas os últimos 10 pontos
        if (newTrail.length > 10) {
          return newTrail.slice(newTrail.length - 10);
        }
        return newTrail;
      });
    }
    
    // Animação para diminuir o tamanho e opacidade
    const interval = setInterval(() => {
      setTrail(prev => prev.map(point => ({
        ...point,
        size: point.size > 0.5 ? point.size - 0.5 : 0,
        opacity: point.opacity > 0.05 ? point.opacity - 0.05 : 0
      })).filter(point => point.size > 0));
    }, 50);
    
    return () => clearInterval(interval);
  }, [position]);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: `${point.size}px`,
            height: `${point.size}px`,
            opacity: point.opacity,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.7) 0%, rgba(14, 165, 233, 0) 70%)',
            filter: 'blur(2px)'
          }}
        />
      ))}
    </div>
  );
};

// Componente principal do ticker
export default function StockTicker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isGlowing, setIsGlowing] = useState(false);
  
  // Handler para movimento do mouse
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setGlowPosition({ x: e.clientX, y: e.clientY });
    setIsGlowing(true);
    setIsMoving(true);
    
    // Resetar o timer quando o mouse se move
    const moveTimeout = setTimeout(() => {
      setIsMoving(false);
    }, 300);
    
    // Desativar o glow se o mouse ficar parado
    const glowTimeout = setTimeout(() => {
      setIsGlowing(false);
    }, 2000);
    
    return () => {
      clearTimeout(moveTimeout);
      clearTimeout(glowTimeout);
    };
  };
  
  return (
    <div 
      className="absolute inset-0 overflow-hidden opacity-90"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-black bg-opacity-95"></div>
      
      {/* Efeito de glow global que segue o mouse */}
      <div 
        className="pointer-events-none absolute z-0 transition-opacity duration-300"
        style={{
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 116, 139, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          transform: `translate(-50%, -50%)`,
          left: glowPosition.x,
          top: glowPosition.y,
          opacity: isGlowing ? 1 : 0,
        }}
      />
      
      {/* Efeito de linhas de grade digital */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(75,85,99,0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(75,85,99,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'skewY(15deg)',
          }}
        />
      </div>
      
      {/* CSS para animações e efeitos de glow */}
      <style jsx global>{`
        @keyframes tickerLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes tickerRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .ticker-animate-left {
          animation: tickerLeft linear infinite;
        }
        
        .ticker-animate-right {
          animation: tickerRight linear infinite;
        }
        
        .ticker-container {
          height: 40px; /* Aumentado para melhor espaçamento */
          position: relative;
          overflow: hidden;
        }
        
        .ticker-item {
          display: flex;
          justify-content: space-between;
        }
        
        /* Efeito de highlight para os itens em hover */
        .highlight-pulse {
          animation: highlightPulse 2s infinite alternate;
        }
        
        @keyframes highlightPulse {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.8;
          }
        }
        
        /* Efeito de pulsação para o botão de login */
        @keyframes buttonPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(14, 165, 233, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(14, 165, 233, 0);
          }
        }
        
        .pulse-button {
          animation: buttonPulse 2s infinite;
          position: relative;
          overflow: hidden;
        }
        
        /* Efeito de brilho que atravessa o botão */
        .pulse-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          animation: shimmer 4s infinite;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(30deg);
          }
          100% {
            transform: translateX(100%) rotate(30deg);
          }
        }
      `}</style>
      
      {/* Grid para linhas diagonais de fundo - agora com ângulo de 15 graus */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              15deg, /* Alterado para combinar com o ângulo das linhas */
              rgba(75,85,99,0.2),
              rgba(75,85,99,0.2) 1px,
              transparent 1px,
              transparent 15px
            )`,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Segunda camada de linhas diagonais */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              105deg, /* Perpendicular to 15deg */
              rgba(75,85,99,0.2),
              rgba(75,85,99,0.2) 1px,
              transparent 1px,
              transparent 20px
            )`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Ticker content */}
      <div className="relative h-full flex flex-col justify-between py-6"> {/* Aumentado padding vertical */}
        {stockRows.map((stocks, index) => (
          <StockTickerRow 
            key={index} 
            stocks={stocks} 
            rowIndex={index} 
          />
        ))}
      </div>
      
      {/* Efeito de vinheta nas bordas da tela */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      />
    </div>
  );
} 