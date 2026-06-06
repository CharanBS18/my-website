import { useEffect, useRef, useState, type ElementType, type MouseEvent } from 'react';
import {
  ArrowRight,
  Bot,
  Brain,
  Database,
  Eye,
  Link,
  Rocket,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: 'RAG Core',
    date: '2025',
    content: 'Retrieval-augmented generation for domain-aware Q&A and plant health diagnosis.',
    category: 'retrieval',
    icon: Database,
    relatedIds: [2, 4],
    status: 'completed',
    energy: 92,
  },
  {
    id: 2,
    title: 'NLP Layer',
    date: '2025',
    content: 'Intent parsing, summarization, and prompt routing for assistant workflows.',
    category: 'language',
    icon: Brain,
    relatedIds: [1, 3],
    status: 'completed',
    energy: 88,
  },
  {
    id: 3,
    title: 'Vision',
    date: '2026',
    content: 'Multimodal inputs and image-aware reasoning for richer product surfaces.',
    category: 'vision',
    icon: Eye,
    relatedIds: [2, 5],
    status: 'in-progress',
    energy: 74,
  },
  {
    id: 4,
    title: 'Data Pipe',
    date: '2025',
    content: 'Embedding pipelines, vector stores, and clean ingestion for AI apps.',
    category: 'data',
    icon: Sparkles,
    relatedIds: [1, 6],
    status: 'completed',
    energy: 85,
  },
  {
    id: 5,
    title: 'Fine-tune',
    date: '2026',
    content: 'Task-specific adapter training for sharper responses and behavior control.',
    category: 'training',
    icon: Bot,
    relatedIds: [3, 6],
    status: 'pending',
    energy: 61,
  },
  {
    id: 6,
    title: 'API Deploy',
    date: '2026',
    content: 'Streamlit and API surfaces that turn models into usable products.',
    category: 'deploy',
    icon: Rocket,
    relatedIds: [4, 5],
    status: 'in-progress',
    energy: 79,
  },
];

export default function PretrainedBotOrbital() {
  const timelineData = TIMELINE_DATA;
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 118;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem['status']): string => {
    switch (status) {
      case 'completed':
        return 'text-white bg-black border-white';
      case 'in-progress':
        return 'text-black bg-white border-black';
      case 'pending':
        return 'text-white bg-black/40 border-white/50';
      default:
        return 'text-white bg-black/40 border-white/50';
    }
  };

  return (
    <div
      className="relative w-full h-[440px] flex flex-col items-center justify-center bg-[#1e2a36] overflow-visible rounded-[2rem]"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="absolute top-4 left-5 z-20 text-left">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45 mb-1">
          Pretrained Bot
        </p>
        <p className="text-sm font-semibold text-white/85">Orbital capability map</p>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: '1000px',
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#D62828] via-[#D62828] to-[#D62828] animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-[4.5rem] h-[4.5rem] rounded-full border border-white/20 animate-ping opacity-70" />
            <div
              className="absolute w-[5.5rem] h-[5.5rem] rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: '0.5s' }}
            />
            <Bot size={22} className="text-white/90 relative z-10" />
          </div>

          <div className="absolute w-60 h-60 rounded-full border border-white/10" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? 'animate-pulse duration-1000' : ''}`}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    width: `${item.energy * 0.35 + 34}px`,
                    height: `${item.energy * 0.35 + 34}px`,
                    left: `-${(item.energy * 0.35 + 34 - 40) / 2}px`,
                    top: `-${(item.energy * 0.35 + 34 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform
                    ${isExpanded ? 'bg-white text-black border-white shadow-lg shadow-white/30 scale-150' : ''}
                    ${!isExpanded && isRelated ? 'bg-white/50 text-black border-white animate-pulse' : ''}
                    ${!isExpanded && !isRelated ? 'bg-black text-white border-white/40' : ''}
                  `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? 'text-white scale-125' : 'text-white/70'
                  }`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-56 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === 'completed'
                            ? 'COMPLETE'
                            : item.status === 'in-progress'
                              ? 'IN PROGRESS'
                              : 'PENDING'}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-white/80">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono text-white/70">{item.energy}%</span>
                        </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D62828] to-[#D62828]"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
